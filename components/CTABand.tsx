import Link from 'next/link';
import { siteConfig } from '@/site.config';

export function CTABand({
  headline = 'Ready when you are.',
  intro = 'Book a visit online or call the practice — whichever suits.',
}: {
  headline?: string;
  intro?: string;
}) {
  return (
    <section className="bg-petrol-deep text-white pt-16 pb-10 md:pt-20 md:pb-12">
      <div className="container-x flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-rose">{headline}</h2>
          <p className="mt-4 text-white/80 max-w-prose">{intro}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {siteConfig.phone && (
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="text-white font-display text-xl"
            >
              {siteConfig.phone}
            </a>
          )}
          <Link
            href="/book/"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-white text-petrol-deep font-medium hover:bg-enamel transition-colors duration-150"
          >
            Book a visit
          </Link>
        </div>
      </div>
    </section>
  );
}
