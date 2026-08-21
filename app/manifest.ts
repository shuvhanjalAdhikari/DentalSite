import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export default function manifest(): MetadataRoute.Manifest {
  const name = siteConfig.name || 'Dental practice';
  return {
    name,
    short_name: name.length > 12 ? name.split(/\s+/)[0] : name,
    description:
      siteConfig.tagline ||
      'Calm, careful dentistry — published prices, named clinicians, written estimates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F6F6',
    theme_color: '#123039',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
