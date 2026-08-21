import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';
import { services } from '@/content/services';
import { team } from '@/content/team';
import { getPostSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();
  const staticRoutes = ['/', '/about/', '/services/', '/team/', '/blog/', '/contact/', '/book/'];
  const serviceRoutes = services.map((s) => `/services/${s.slug}/`);
  const teamRoutes = team.map((c) => `/team/${c.slug}/`);
  const postRoutes = getPostSlugs().map((s) => `/blog/${s}/`);

  return [...staticRoutes, ...serviceRoutes, ...teamRoutes, ...postRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
