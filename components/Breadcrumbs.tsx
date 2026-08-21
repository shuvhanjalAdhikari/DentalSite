import Link from 'next/link';

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-ink">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="text-ink">
                  {item.name}
                </span>
              )}
              {!last && <span aria-hidden="true" className="text-line">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
