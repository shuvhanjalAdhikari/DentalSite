import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'solid' | 'ghost' | 'text';
type Size = 'sm' | 'md';

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-150 whitespace-nowrap min-h-[44px]';

const variantClasses: Record<Variant, string> = {
  solid:
    'bg-petrol text-white hover:bg-petrol-deep active:bg-petrol-deep focus-visible:bg-petrol-deep',
  ghost:
    'bg-transparent text-petrol border border-petrol hover:bg-petrol-tint',
  text: 'bg-transparent text-petrol underline-offset-4 hover:underline px-0',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-sm',
  md: 'text-base px-6 py-3 rounded-md',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<'button'>, 'children' | 'className'>;
type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = 'solid', size = 'md', className = '', children } = props;
  const cls = `${baseClasses} ${variantClasses[variant]} ${variant !== 'text' ? sizeClasses[size] : ''} ${className}`.trim();

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as ButtonAsButton & { href?: undefined };
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
