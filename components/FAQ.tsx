import type { Faq } from '@/content/faqs';

export function FAQ({ items }: { items: Faq[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item, i) => (
        <li key={i} className="border-b border-line">
          <details className="group">
            <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none">
              <span className="font-display text-lg text-ink">{item.q}</span>
              <span
                aria-hidden="true"
                className="text-petrol transition-transform duration-150 group-open:rotate-45"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </summary>
            <div className="pb-6 text-muted max-w-prose">
              <p>{item.a}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
