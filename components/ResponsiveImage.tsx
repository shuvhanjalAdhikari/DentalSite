import type { CSSProperties } from 'react';

type Props = {
  dir: string;
  base: string;
  widths: number[];
  sizes: string;
  alt: string;
  aspect: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  priority?: boolean;
  className?: string;
  imgStyle?: CSSProperties;
};

export function ResponsiveImage({
  dir,
  base,
  widths,
  sizes,
  alt,
  aspect,
  intrinsicWidth,
  intrinsicHeight,
  priority = false,
  className = '',
  imgStyle,
}: Props) {
  const srcset = (ext: string) =>
    widths.map((w) => `/images/${dir}/${base}-${w}.${ext} ${w}w`).join(', ');
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/images/${dir}/${base}-${largest}.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`w-full h-auto rounded-md bg-petrol-tint ${className}`.trim()}
        style={{ aspectRatio: aspect, objectFit: 'cover', ...imgStyle }}
      />
    </picture>
  );
}
