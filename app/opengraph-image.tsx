import { ImageResponse } from 'next/og';
import { siteConfig } from '@/site.config';

export const alt = 'A calm place for careful dentistry.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  const name = siteConfig.name || 'Dental practice';
  const tagline = siteConfig.tagline || 'Calm, careful dentistry.';
  const cityLine = [siteConfig.address.city, siteConfig.address.country]
    .filter(Boolean)
    .join(', ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#123039',
          color: '#FAF6F1',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 96px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#C0717E',
            fontFamily: 'sans-serif',
            fontWeight: 600,
          }}
        >
          {cityLine || 'Dental practice'}
        </div>

        <div
          style={{
            marginTop: 'auto',
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 900,
          }}
        >
          {name}
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            lineHeight: 1.35,
            color: 'rgba(250, 246, 241, 0.8)',
            fontFamily: 'sans-serif',
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>

        <div
          style={{
            marginTop: 40,
            height: 2,
            width: 96,
            background: '#C0717E',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
