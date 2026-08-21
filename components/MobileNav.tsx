'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/site.config';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Treatments' },
  { href: '/team/', label: 'Team' },
  { href: '/blog/', label: 'Articles' },
  { href: '/contact/', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    firstLinkRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label="Open menu"
        className="md:hidden inline-flex items-center justify-center w-11 h-11 text-ink"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Site menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white shadow-md p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="eyebrow">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-11 h-11 text-ink"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {links.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl py-2 text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-line">
              <Link
                href="/book/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-full min-h-[44px] px-6 py-3 rounded-md bg-petrol text-white font-medium"
              >
                Book a visit
              </Link>
              {siteConfig.phone && (
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block text-center mt-4 text-muted">
                  {siteConfig.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
