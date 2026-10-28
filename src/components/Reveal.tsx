'use client';

import { useEffect, useRef } from 'react';

/** Fades/slides its children in the first time they scroll into view. */
export default function Reveal({
  children, as: Tag = 'div', className = '', delay = 0,
}: { children: React.ReactNode; as?: 'div' | 'section' | 'figure' | 'li'; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error — polymorphic ref is fine for these block elements
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
