import { siteConfig } from '@/site.config';
import { openingHoursSpecification } from './hours';

export function dentistSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteConfig.name || siteConfig.legalName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postal,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: openingHoursSpecification(),
    priceRange: siteConfig.currency,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    author: { '@type': 'Person', name: input.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name || siteConfig.legalName,
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${input.slug}/`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}
