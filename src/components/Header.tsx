'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Say hi' },
];

function KiamaTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-AU', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Australia/Sydney',
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock">Kiama, NSW {t && <b>{t}</b>}</span>;
}

export default function Header() {
  const path = usePathname();
  const active = (href: string) => (href === '/' ? path === '/' || path.startsWith('/work') : path.startsWith(href));
  return (
    <header className="site-header">
      <Link href="/" className="mark" aria-label="Ally Colquhoun — home">
        <span className="mark-dot" />
        Ally Colquhoun
      </Link>
      <KiamaTime />
      <nav aria-label="Main">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={active(n.href) ? 'is-active' : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
