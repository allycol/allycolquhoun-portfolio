import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getProject, pad, projects, toSections, type Img } from '@/lib/work';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const intro = p.blocks.find((b) => b.type === 'text');
  return {
    title: p.name,
    description: p.summary ?? (intro && 'text' in intro ? intro.text.slice(0, 160) : `${p.name} — ${p.tags.join(', ')}`),
    openGraph: { images: [p.cover.src] },
  };
}

function Pic({ img, alt, priority }: { img: Img; alt: string; priority?: boolean }) {
  return <Image src={img.src} alt={alt} width={img.width} height={img.height} priority={priority} sizes="100vw" />;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const sections = toSections(p.blocks);
  const next = projects[p.index % projects.length];
  let n = 0;
  let firstText = true;

  return (
    <article className="case">
      <header className="case-hero">
        <Link href="/#work" className="back mono">← All work</Link>
        <p className="case-count mono">
          Case {pad(p.index)} <span>/ {pad(projects.length)}</span>
        </p>
        <h1 className="case-title">{p.name}</h1>
      </header>

      <div className="case-lead">
        <dl className="case-meta">
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          <div><dt>Discipline</dt><dd>{p.tags.join(', ')}</dd></div>
          {p.summary && <div className="case-overview"><dt>Overview</dt><dd>{p.summary}</dd></div>}
        </dl>
        <figure className="case-cover">
          <Pic img={p.cover} alt={`${p.name} — cover`} priority />
        </figure>
      </div>

      <div className="case-body">
        {sections.map((s, i) => {
          if (s.kind === 'text') {
            const lede = firstText;
            firstText = false;
            if (s.heading) n++;
            return (
              <Reveal as="section" key={i} className={`case-section ${lede ? 'is-lede' : ''}`}>
                <div className="case-section-head">
                  {s.heading && (
                    <>
                      <span className="mono">{pad(n)}</span>
                      <h2>{s.heading}</h2>
                    </>
                  )}
                </div>
                <div className="case-section-text">
                  {s.paras.map((t, j) => <p key={j}>{t}</p>)}
                </div>
              </Reveal>
            );
          }
          const b = s.block;
          if (b.type === 'image') {
            return (
              <Reveal as="figure" key={i} className="case-media">
                <Pic img={b} alt={`${p.name} project image`} />
              </Reveal>
            );
          }
          if (b.type === 'gallery') {
            return (
              <div key={i} className={`case-gallery ${b.images.length % 2 ? 'is-odd' : ''}`}>
                {b.images.map((img, j) => (
                  <Reveal as="figure" key={img.src} delay={(j % 2) * 90}>
                    <Pic img={img} alt={`${p.name} project image`} />
                  </Reveal>
                ))}
              </div>
            );
          }
          return (
            <Reveal as="figure" key={i} className="case-media case-embed">
              <iframe src={b.src} title={`${p.name} video`} allow="fullscreen; autoplay" loading="lazy" />
            </Reveal>
          );
        })}
      </div>

      <Link href={`/work/${next.slug}`} className="next">
        <span className="mono">Next case — {pad(next.index)}</span>
        <span className="next-title">
          {next.name}
          <span className="arrow" aria-hidden>→</span>
        </span>
        <span className="next-img" aria-hidden>
          <Image src={next.cover.src} alt="" width={next.cover.width} height={next.cover.height} />
        </span>
      </Link>
    </article>
  );
}
