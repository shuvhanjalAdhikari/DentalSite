import type { ReactNode } from 'react';

export function Prose({
  children,
  html,
  className = '',
}: {
  children?: ReactNode;
  html?: string;
  className?: string;
}) {
  const cls = `prose-body ${className}`.trim();
  if (html) {
    return <div className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <div className={cls}>{children}</div>;
}
