import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { CTABand } from '@/components/CTABand';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: '/services/', label: 'Treatments and prices' },
  { href: '/team/', label: 'The team' },
  { href: '/about/', label: 'About the practice' },
  { href: '/blog/', label: 'Articles' },
  { href: '/contact/', label: 'Visit us' },
  { href: '/book/', label: 'Book a visit' },
];

export default function NotFound() {
  return (
    <>
      <Section surface="mist">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>404</Eyebrow>
            <h1 className="mt-3 font-display text-4xl">
              We could not find that page.
            </h1>
            <p className="mt-6 text-lg text-muted max-w-prose">
              The link may be old, or the page may have moved. If you were trying to reach us in an urgent situation, please call the practice directly.
            </p>
            {siteConfig.phone && (
              <p className="mt-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-link text-petrol font-display text-xl"
                >
                  {siteConfig.phone}
                </a>
              </p>
            )}
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-petrol text-white font-medium hover:bg-petrol-deep transition-colors duration-150"
              >
                Back to home
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-6">
            <p className="eyebrow mb-4">Try one of these</p>
            <ul className="border-t border-line">
              {suggestions.map((s) => (
                <li key={s.href} className="border-b border-line">
                  <Link
                    href={s.href}
                    className="flex items-center justify-between gap-4 py-4 text-ink hover:text-petrol transition-colors"
                  >
                    <span className="font-display text-lg">{s.label}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <CTABand headline="Or just come and see us." intro="We are open six days a week." />
    </>
  );
}
