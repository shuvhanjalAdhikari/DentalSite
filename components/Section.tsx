import type { ReactNode } from 'react';

type Surface = 'mist' | 'enamel' | 'petrol';

const surfaceClasses: Record<Surface, string> = {
  mist: 'bg-mist text-ink',
  enamel: 'bg-enamel text-ink',
  petrol: 'bg-petrol-deep text-white',
};

export function Section({
  children,
  surface = 'mist',
  as: As = 'section',
  id,
  className = '',
  padded = true,
}: {
  children: ReactNode;
  surface?: Surface;
  as?: 'section' | 'div' | 'header' | 'footer' | 'main';
  id?: string;
  className?: string;
  padded?: boolean;
}) {
  const pad = padded ? 'py-24 md:py-32' : '';
  return (
    <As id={id} className={`${surfaceClasses[surface]} ${pad} ${className}`.trim()}>
      <div className="container-x">{children}</div>
    </As>
  );
}
