import { Eyebrow } from './Eyebrow';
import { Button } from './Button';
import { HoursCard } from './HoursCard';
import { ResponsiveImage } from './ResponsiveImage';
import { todayStatus } from '@/lib/hours';
import { siteConfig } from '@/site.config';

export const HERO_WIDTHS = [640, 960];
export const HERO_SIZES = '(min-width: 1200px) 480px, (min-width: 1024px) 40vw, 100vw';

export function Hero() {
  const status = todayStatus();
  return (
    <section className="bg-mist pt-12 pb-24 md:pt-16 md:pb-32" aria-labelledby="hero-heading">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>A calm place for precise dentistry</Eyebrow>
            <h1 id="hero-heading" className="mt-4 text-4xl font-display text-ink">
              Dentistry without the sales pressure.
            </h1>
            <p className="mt-6 text-lg text-muted max-w-prose">
              A single-chair practice{siteConfig.address.city ? ` in ${siteConfig.address.city}` : ''}. We publish our prices, we take the time to explain what we see, and we give you a written estimate before any work begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/book/" variant="solid">
                Book a visit
              </Button>
              <Button href="/services/" variant="ghost">
                See treatments &amp; prices
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted flex items-center gap-2" aria-live="polite">
              <span
                aria-hidden="true"
                className={`inline-block w-2 h-2 rounded-sm ${status.isOpen ? 'bg-success' : 'bg-muted'}`}
              />
              {status.label}
              {siteConfig.phone && (
                <>
                  <span aria-hidden="true" className="text-line">·</span>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-link">
                    {siteConfig.phone}
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <ResponsiveImage
                dir="hero"
                base="hero"
                widths={HERO_WIDTHS}
                sizes={HERO_SIZES}
                alt="The treatment room at the practice, lit by afternoon light through the window."
                aspect="3 / 4"
                intrinsicWidth={960}
                intrinsicHeight={1280}
                priority
              />
              <div className="hidden md:block absolute -left-4 lg:-left-10 -bottom-8">
                <HoursCard />
              </div>
              <div className="md:hidden mt-6">
                <HoursCard variant="block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
