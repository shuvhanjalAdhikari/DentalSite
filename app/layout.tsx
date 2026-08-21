import type { Metadata, Viewport } from 'next';
import { Newsreader, Public_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/site.config';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const name = siteConfig.name || '[Practice name]';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${name} — ${siteConfig.tagline || 'Calm, careful dentistry'}`,
    template: `%s · ${name}`,
  },
  description:
    siteConfig.tagline ||
    'A single-location dental practice. Published prices, named clinicians, written estimates before any work begins.',
  openGraph: {
    type: 'website',
    siteName: name,
    locale: siteConfig.locale.replace('-', '_'),
  },
  robots: { index: true, follow: true },
  other: {
    google: 'notranslate',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F6F6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.locale.split('-')[0]}
      translate="no"
      className={`notranslate ${newsreader.variable} ${publicSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
