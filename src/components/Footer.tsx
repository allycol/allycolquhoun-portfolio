import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/contact" className="footer-cta">
        <span className="mono">Got a role or a project?</span>
        <span className="footer-big">
          Let&rsquo;s <em>talk</em>
          <span className="arrow" aria-hidden>→</span>
        </span>
      </Link>
      <div className="footer-row">
        <span>© {new Date().getFullYear()} Ally Colquhoun</span>
        <span className="footer-links">
          <a href="https://www.linkedin.com/in/allycolquhoun/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.facebook.com/allycolquhoun" target="_blank" rel="noreferrer">Facebook ↗</a>
        </span>
        <span>Thanks for visiting!</span>
      </div>
    </footer>
  );
}
