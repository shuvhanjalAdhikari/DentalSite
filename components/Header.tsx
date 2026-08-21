'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/site.config';
import { todayStatus } from '@/lib/hours';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Treatments' },
  { href: '/team/', label: 'Team' },
  { href: '/blog/', label: 'Articles' },
  { href: '/contact/', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(() => todayStatus());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    setStatus(todayStatus());
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-mist/95 backdrop-blur-sm">
      <div
        className={`hidden md:block border-b border-line text-sm ${scrolled ? 'hidden' : ''}`}
      >
        <div className="container-x flex items-center justify-between py-2 gap-6 text-muted">
          <div className="flex items-center gap-6">
            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-ink">
                {siteConfig.phone}
              </a>
            )}
            {siteConfig.emergencyPhone && (
              <span>
                Emergency line{' '}
                <a
                  href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                  className="text-ink hover:text-petrol"
                >
                  {siteConfig.emergencyPhone}
                </a>
              </span>
            )}
          </div>
          <span aria-live="polite">
            <span
              aria-hidden="true"
              className={`inline-block w-2 h-2 rounded-sm mr-2 align-middle ${status.isOpen ? 'bg-success' : 'bg-muted'}`}
            />
            {status.label}
          </span>
        </div>
      </div>

      <div
        className={`border-b transition-shadow duration-200 ${scrolled ? 'border-line shadow-sm bg-mist/95' : 'border-transparent'}`}
      >
        <div className="container-x flex items-center justify-between py-4 gap-6">
          <Link href="/" className="font-display text-xl text-ink">
            {siteConfig.name || 'Lakshya Dental Home'}
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm py-2 relative ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {l.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-rose"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/book/"
              className="hidden md:inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-md bg-petrol text-white text-sm font-medium hover:bg-petrol-deep transition-colors duration-150"
            >
              Book a visit
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
