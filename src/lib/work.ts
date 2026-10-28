import raw from '@/content/projects.json';
import { META } from '@/content/meta';

export type Img = { src: string; width: number; height: number };
export type Block =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | ({ type: 'image' } & Img)
  | { type: 'gallery'; images: Img[] }
  | { type: 'embed'; src: string };

export type Project = {
  slug: string;
  name: string;
  tags: string[];
  year: string | null;
  cover: Img;
  blocks: Block[];
  index: number;
};

export const projects: Project[] = (raw as unknown as Omit<Project, 'name' | 'tags' | 'index'>[])
  .map((p, i) => ({
    ...p,
    name: META[p.slug]?.name ?? p.slug,
    tags: META[p.slug]?.tags ?? [],
    index: i + 1,
  }));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const pad = (n: number) => String(n).padStart(2, '0');

/** Groups a project's flat block list into text sections and media rows. */
export type Section =
  | { kind: 'text'; heading?: string; paras: string[] }
  | { kind: 'media'; block: Extract<Block, { type: 'image' | 'gallery' | 'embed' }> };

export function toSections(blocks: Block[]): Section[] {
  const out: Section[] = [];
  let cur: Extract<Section, { kind: 'text' }> | null = null;
  for (const b of blocks) {
    if (b.type === 'heading') {
      cur = { kind: 'text', heading: b.text, paras: [] };
      out.push(cur);
    } else if (b.type === 'text') {
      if (!cur) {
        cur = { kind: 'text', paras: [] };
        out.push(cur);
      }
      cur.paras.push(b.text);
    } else {
      out.push({ kind: 'media', block: b });
      cur = null;
    }
  }
  return out;
}
