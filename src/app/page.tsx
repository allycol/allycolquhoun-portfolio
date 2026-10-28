import Link from 'next/link';
import WorkIndex from '@/components/WorkIndex';
import { projects } from '@/lib/work';

const CLIENTS = [
  'Qantas', 'Vodafone', 'Telstra', 'Kmart', 'Channel 10', 'ING Direct', 'BHP', 'Daily Mail',
  'Evening Standard', 'Metro', 'Fame & Partners', 'Selz', 'Frollo', 'Galilee Solicitors', 'The Law Store',
];

export default function Home() {
  const items = projects.map(({ slug, name, tags, year, cover, index }) => ({ slug, name, tags, year, cover, index }));
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden />
        <p className="hero-eyebrow mono">
          <span>Portfolio</span>
          <span>Available for senior &amp; lead roles</span>
        </p>
        <h1 className="hero-title" aria-label="Ally Colquhoun">
          <span className="line"><span>Ally</span></span>
          <span className="line"><span>Colquhoun<i className="star" aria-hidden>✺</i></span></span>
        </h1>
        <div className="hero-foot">
          <p className="hero-role">
            Senior <em>UI/UX</em> &amp; <em>Brand</em> Designer
          </p>
          <p className="hero-intro">
            Good design connects what the business needs, what the technology allows and what people actually want to do.
          </p>
          <Link href="#work" className="hero-scroll mono">
            <span aria-hidden>↓</span> Scroll to work
          </Link>
        </div>
      </section>

      <div className="marquee" aria-label="Clients and teams I've designed for">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1 || undefined}>
              {CLIENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <WorkIndex items={items} />
    </>
  );
}
