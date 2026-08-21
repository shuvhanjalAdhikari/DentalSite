import { siteConfig } from '@/site.config';
import { team } from '@/content/team';

export function StatRow() {
  const stats = [
    { value: '18', label: 'Years open at this address' },
    { value: String(team.length), label: 'Clinicians in the practice' },
    {
      value: siteConfig.languages.length ? String(siteConfig.languages.length) : '3',
      label:
        siteConfig.languages.length
          ? `Languages spoken (${siteConfig.languages.join(', ')})`
          : 'Languages spoken by the team',
    },
    { value: '2', label: 'Same-day emergency slots kept free daily' },
  ];
  return (
    <section className="bg-mist border-y border-line" aria-label="At a glance">
      <div className="container-x">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((s) => (
            <li key={s.label} className="py-8 md:py-10 px-0 md:px-6 first:pl-0 last:pr-0 text-center md:text-left">
              <p className="font-display text-3xl text-ink">{s.value}</p>
              <p className="text-sm text-muted mt-2 max-w-[24ch] mx-auto md:mx-0">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
