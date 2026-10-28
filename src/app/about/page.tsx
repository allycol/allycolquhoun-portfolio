import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import about from '@/content/about.json';
import { pad, toSections, type Block } from '@/lib/work';

export const metadata: Metadata = {
  title: 'About',
  description: 'British born, Kiama based. Designer, front end developer and creative lead.',
};

const PATH = [
  { where: 'Galilee Solicitors & The Law Store', what: 'Creative Lead & UI/UX Designer' },
  { where: 'Selz · Fame & Partners · Qantas · Vodafone', what: 'In-house UI/UX roles' },
  { where: 'Sydney & Melbourne digital agencies', what: 'Freelance' },
  { where: 'The Dubs, Sydney', what: 'Senior Designer & Front End Developer' },
  { where: 'Associated New Media, London', what: 'Daily Mail, Evening Standard & Metro' },
  { where: 'Manchester Metropolitan University', what: 'Graphic Design' },
];

export default function About() {
  const sections = toSections(about as Block[]);
  return (
    <div className="about">
      <header className="about-hero">
        <p className="label">About me</p>
        <h1 className="about-title">
          Designer, developer <em>&amp;</em> son of a&nbsp;<em>printer.</em>
        </h1>
      </header>

      <div className="case-body">
        {sections.map((s, i) =>
          s.kind === 'text' ? (
            <Reveal as="section" key={i} className={`case-section ${i === 0 ? 'is-lede' : ''}`}>
              <div className="case-section-head">
                <span className="mono">{pad(i + 1)}</span>
                <h2>{s.heading}</h2>
              </div>
              <div className="case-section-text">
                {s.paras.map((t, j) => <p key={j}>{t}</p>)}
              </div>
            </Reveal>
          ) : null,
        )}
      </div>

      <section className="path" aria-labelledby="path-title">
        <h2 id="path-title" className="label">The path so far</h2>
        <ol>
          {PATH.map((r, i) => (
            <Reveal as="li" key={r.where} delay={i * 60} className="path-row">
              <span className="mono">{pad(PATH.length - i)}</span>
              <span className="path-where">{r.where}</span>
              <span className="path-what">{r.what}</span>
            </Reveal>
          ))}
        </ol>
      </section>
    </div>
  );
}
