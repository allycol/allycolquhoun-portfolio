import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="contact">
      <header className="contact-hero">
        <p className="label">404</p>
        <h1 className="contact-title">Lost <em>the plot.</em></h1>
        <p className="contact-sub">That page doesn&rsquo;t exist. <Link href="/">Back to the work →</Link></p>
      </header>
    </div>
  );
}
