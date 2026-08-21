import Link from 'next/link';
import { services } from '@/content/services';
import { formatPrice } from '@/lib/format';

export function TreatmentMenu({ compact = false }: { compact?: boolean }) {
  const items = compact ? services : services;
  return (
    <ul className="border-t border-line">
      {items.map((s, i) => (
        <li key={s.slug} className="border-b border-line">
          <Link
            href={`/services/${s.slug}/`}
            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 py-6 md:py-8 px-4 -mx-4 transition-colors duration-150 hover:bg-enamel focus-visible:bg-enamel"
          >
            <span className="font-sans text-sm text-muted tabular-nums w-8">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl md:text-2xl text-ink">
                {s.name}
              </span>
              <span className="block text-sm text-muted mt-1 max-w-prose">{s.summary}</span>
            </span>
            <span className="flex items-center gap-4 whitespace-nowrap">
              <span className="hidden md:inline text-sm text-muted">{formatPrice(s.priceFrom)}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-petrol transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </span>
          </Link>
          <p className="md:hidden text-sm text-muted pb-6 -mt-2 pl-16">
            {formatPrice(s.priceFrom)}
          </p>
        </li>
      ))}
    </ul>
  );
}
