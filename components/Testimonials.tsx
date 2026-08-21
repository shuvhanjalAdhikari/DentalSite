import { testimonials } from '@/content/testimonials';

export function Testimonials({ limit = 2 }: { limit?: number }) {
  const items = testimonials.slice(0, limit);
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
      {items.map((t, i) => (
        <li key={i}>
          <blockquote>
            <p className="font-display text-lg md:text-xl text-ink leading-snug">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-muted">
              — {t.name}, {t.treatment}
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
