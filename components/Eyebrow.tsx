import type { ReactNode } from 'react';

export function Eyebrow({ children, as: As = 'p' }: { children: ReactNode; as?: 'p' | 'span' | 'div' }) {
  return <As className="eyebrow">{children}</As>;
}
