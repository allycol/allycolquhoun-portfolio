'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/work';

type Item = Pick<Project, 'slug' | 'name' | 'tags' | 'year' | 'cover' | 'index'>;

const pad = (n: number) => String(n).padStart(2, '0');

export default function WorkIndex({ items }: { items: Item[] }) {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  // Cursor-following preview, eased so it trails the pointer slightly.
  useEffect(() => {
    if (view !== 'list') return;
    const el = preview.current;
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${(tx - x) * 0.04}deg)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, [view]);

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work-head">
        <h2 id="work-title" className="label">
          Selected work <sup>{items.length}</sup>
        </h2>
        <div className="toggle" role="group" aria-label="View">
          <button aria-pressed={view === 'list'} onClick={() => setView('list')}>Index</button>
          <button aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</button>
        </div>
      </div>

      {view === 'list' ? (
        <>
          <ol className="index" onPointerLeave={() => setHover(null)} data-hovering={hover !== null || undefined}>
            {items.map((p, i) => (
              <li key={p.slug} className={hover === i ? 'is-hover' : undefined} onPointerEnter={() => setHover(i)}>
                <Link href={`/work/${p.slug}`} className="row">
                  <span className="row-no">{pad(p.index)}</span>
                  <span className="row-title">{p.name}</span>
                  <span className="row-tags">{p.tags.join(' · ')}</span>
                  <span className="row-year">{p.year}</span>
                  <Image className="row-thumb" src={p.cover.src} alt="" width={p.cover.width} height={p.cover.height} />
                </Link>
              </li>
            ))}
          </ol>
          <div ref={preview} className={`preview ${hover !== null ? 'is-on' : ''}`} aria-hidden>
            {items.map((p, i) => (
              <Image
                key={p.slug}
                src={p.cover.src}
                alt=""
                width={p.cover.width}
                height={p.cover.height}
                className={hover === i ? 'is-current' : undefined}
              />
            ))}
          </div>
        </>
      ) : (
        <ul className="grid">
          {items.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="card">
                <div className="card-img">
                  <Image src={p.cover.src} alt="" width={p.cover.width} height={p.cover.height} />
                </div>
                <div className="card-meta">
                  <span className="card-title">{p.name}</span>
                  <span className="mono">{p.tags.join(' · ')} — {p.year}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
