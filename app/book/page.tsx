import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookingForm } from '@/components/BookingForm';
import { VisitTimeline } from '@/components/VisitTimeline';
import { siteConfig } from '@/site.config';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Book a visit',
  description:
    'Request an appointment. We confirm the time by phone or email within one working day.',
  alternates: { canonical: '/book/' },
};

export default function BookPage() {
  const provider = siteConfig.bookingProvider;
  const useEmbed = provider.type !== 'form' && !!provider.url;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Book', url: '/book/' },
          ]),
        )}
      />
      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Book a visit' }]} />
        <div className="mt-6 max-w-2xl">
          <Eyebrow>Book a visit</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">Request an appointment.</h1>
          <p className="mt-6 text-lg text-muted">
            This form sends us a request. We confirm the time by phone or email — usually the same day, always within one working day.
          </p>
          {siteConfig.phone && (
            <p className="mt-3 text-muted">
              Prefer to call?{' '}
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-link">
                {siteConfig.phone}
              </a>
            </p>
          )}
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {useEmbed ? (
              <div className="rounded-md overflow-hidden border border-line bg-white">
                <iframe
                  src={provider.url}
                  title="Booking calendar"
                  loading="lazy"
                  className="w-full h-[720px] border-0"
                />
              </div>
            ) : (
              <BookingForm />
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="bg-white border border-line rounded-md p-6">
              <p className="eyebrow mb-3">What happens next</p>
              <ol className="text-sm text-ink space-y-3 list-decimal pl-4">
                <li>Your request lands in our inbox.</li>
                <li>Someone from the practice replies with a specific time.</li>
                <li>You confirm and we&rsquo;re booked.</li>
              </ol>
              <p className="mt-6 text-xs text-muted">
                Booking online sends a request — it is not a confirmed appointment until we reply.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section surface="enamel">
        <div className="max-w-2xl">
          <Eyebrow>What to expect</Eyebrow>
          <h2 id="timeline-heading" className="mt-3 font-display text-3xl">
            First visits are about fifty minutes.
          </h2>
        </div>
        <div className="mt-12">
          <VisitTimeline />
        </div>
      </Section>
    </>
  );
}
