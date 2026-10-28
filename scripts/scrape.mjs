// One-off importer: pulls every project from the old Adobe Portfolio site,
// keeps the text blocks in order, and downloads each image as an optimised
// WebP into public/work/<slug>/ so the new site has no dependency on
// Adobe's CDN. Re-run with `npm run scrape` (needs devDependencies).
import * as cheerio from 'cheerio';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://allycolquhoun.myportfolio.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const MAX_W = 1800;

const get = async (p) => (await fetch(BASE + p)).text();

function largest($img) {
  const set = $img.attr('data-srcset') || $img.attr('srcset') || '';
  const urls = set.split(',').map((s) => s.trim().split(' ')[0]).filter(Boolean);
  return urls.pop() || $img.attr('data-src') || $img.attr('src');
}

function textBlocks($, el) {
  const blocks = [];
  $(el).find('div').each((_, d) => {
    const $d = $(d);
    const isHeading = $d.text().trim().length <= 80 && $d.is('.title, .sub-title') && !$d.find('.title, .sub-title').length;
    if (isHeading) {
      const t = $d.text().replace(/\s+/g, ' ').trim();
      if (t) blocks.push({ type: 'heading', text: t });
      return;
    }
    if ($d.find('div').length) return;
    if ($d.parents('.title, .sub-title').filter((_, p) => !$(p).find('.title, .sub-title').length).length) return;
    const t = $d.text().replace(/​/g, '').replace(/\s+/g, ' ').trim();
    if (t) blocks.push({ type: 'text', text: t });
  });
  // Text that sits directly in .rich-text without wrapping divs
  if (!blocks.length) {
    const t = $(el).text().replace(/​/g, '').replace(/\s+/g, ' ').trim();
    if (t) blocks.push({ type: 'text', text: t });
  }
  return blocks;
}

async function saveImage(url, slug, i) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const img = sharp(buf).resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 80 });
  const { data, info } = await img.toBuffer({ resolveWithObject: true });
  const rel = `/work/${slug}/${String(i).padStart(2, '0')}.webp`;
  await mkdir(path.join(ROOT, 'public/work', slug), { recursive: true });
  await writeFile(path.join(ROOT, 'public', rel), data);
  return { src: rel, width: info.width, height: info.height };
}

const home = cheerio.load(await get('/'));
const covers = home('a:has(img)').toArray().map((a) => ({
  slug: home(a).attr('href').split('/').pop(),
  title: home(a).text().replace(/\s+/g, ' ').trim(),
  cover: largest(home(a).find('img')),
}));

// Years only appear in the "You may also like" strips, so collect them there.
const years = {};
const projects = [];

for (const [order, c] of covers.entries()) {
  const $ = cheerio.load(await get('/' + c.slug));
  $('.project-covers a, .other-projects a, a.project-cover').each((_, a) => {
    const t = $(a).find('.title').text().trim();
    const y = $(a).find('.date').text().trim();
    if (t && y) years[t.toLowerCase()] = y;
  });

  const slug = c.slug === 'copy-of-zettle' ? 'galilee' : c.slug;
  let n = 0;
  const blocks = [];
  for (const m of $('#project-modules .project-module, .project-modules .project-module').toArray()) {
    const $m = $(m);
    if ($m.hasClass('project-module-text')) {
      blocks.push(...textBlocks($, $m.find('.rich-text')));
    } else if ($m.find('iframe').length) {
      blocks.push({ type: 'embed', src: $m.find('iframe').attr('src') || $m.find('iframe').attr('data-src') });
    } else {
      // Single images and grids; grids hide their <img> tags inside <noscript>
      let imgs = $m.find('img[data-src], img[data-srcset]').toArray().map((i) => largest($(i)));
      $m.find('noscript').each((_, ns) => {
        const $$ = cheerio.load($(ns).text());
        imgs.push(...$$('img').toArray().map((i) => largest($$(i))));
      });
      imgs = [...new Set(imgs.filter((u) => u && u.startsWith('http')))];
      const saved = [];
      for (const u of imgs) saved.push(await saveImage(u, slug, ++n));
      if (saved.length === 1) blocks.push({ type: 'image', ...saved[0] });
      else if (saved.length) blocks.push({ type: 'gallery', images: saved });
    }
  }
  const cover = await saveImage(c.cover, slug, 0);
  projects.push({ slug, title: c.title, order, cover, blocks });
  console.log(slug, blocks.length, 'blocks', n, 'images');
}

for (const p of projects) {
  p.year = years[p.title.toLowerCase()] ?? years[p.title.toLowerCase().replace(/&/g, 'and')] ?? null;
}

const $about = cheerio.load(await get('/agencies'));
const about = textBlocks($about, $about('.project-module-text .rich-text, .page-content .rich-text'));

await mkdir(path.join(ROOT, 'src/content'), { recursive: true });
await writeFile(path.join(ROOT, 'src/content/projects.json'), JSON.stringify(projects, null, 2));
await writeFile(path.join(ROOT, 'src/content/about.json'), JSON.stringify(about, null, 2));
console.log('years', years);
