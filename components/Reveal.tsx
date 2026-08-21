'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function Reveal({
  children,
  as: As = 'div',
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  as?: 'div' | 'section' | 'article' | 'li';
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay) {
              window.setTimeout(() => el.classList.add('is-visible'), delay);
            } else {
              el.classList.add('is-visible');
            }
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <As ref={ref as never} className={`reveal ${className}`.trim()}>
      {children}
    </As>
  );
}
