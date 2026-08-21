import Link from 'next/link';
import { siteConfig } from '@/site.config';
import { formatTime12, orderedHours } from '@/lib/hours';

const navLinks = [
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Treatments' },
  { href: '/team/', label: 'Team' },
  { href: '/blog/', label: 'Articles' },
  { href: '/contact/', label: 'Contact' },
  { href: '/book/', label: 'Book a visit' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hours = orderedHours();
  const name = siteConfig.name || '[Practice name]';

  return (
    <footer className="bg-petrol-deep text-white/90 pt-10 pb-8 md:pt-12 md:pb-10 border-t border-white/10">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl text-white">{name}</p>
            {siteConfig.tagline && (
              <p className="mt-2 text-sm text-white/70 max-w-sm">{siteConfig.tagline}</p>
            )}
            <address className="not-italic text-sm text-white/80 leading-snug mt-6">
              {siteConfig.address.street && <div>{siteConfig.address.street}</div>}
              {(siteConfig.address.city || siteConfig.address.postal) && (
                <div>
                  {siteConfig.address.city}
                  {siteConfig.address.postal ? ` ${siteConfig.address.postal}` : ''}
                </div>
              )}
              {siteConfig.address.country && <div>{siteConfig.address.country}</div>}
            </address>

            <ul className="mt-4 text-sm text-white/80 space-y-1">
              {siteConfig.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="hover:text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              {siteConfig.emergencyPhone && (
                <li className="text-white/60">
                  Emergency{' '}
                  <a
                    href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                    className="text-white/80 hover:text-white"
                  >
                    {siteConfig.emergencyPhone}
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow text-rose mb-4">Hours</p>
            <ul className="text-sm text-white/80 space-y-1">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6 max-w-[16rem]">
                  <span>{h.day.slice(0, 3)}</span>
                  <span className="tabular-nums text-white/70">
                    {h.closed ? 'Closed' : `${formatTime12(h.open)} – ${formatTime12(h.close)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="eyebrow text-rose mb-4">Site</p>
            <ul className="text-sm text-white/80 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/60">
          <p>
            © {year} {siteConfig.legalName || name}. All rights reserved.
          </p>
          <p>Booking online sends a request — we confirm by phone or email.</p>
        </div>
      </div>
    </footer>
  );
}
