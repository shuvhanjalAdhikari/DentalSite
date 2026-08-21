import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import { CTABand } from '@/components/CTABand';
import { getAllPosts } from '@/lib/blog';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Practical answers to the things patients ask most, written by the clinicians here.',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Articles', url: '/blog/' },
          ]),
        )}
      />
      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Articles' }]} />
        <div className="mt-6">
          <Eyebrow>Articles</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">Reading, not marketing.</h1>
          <p className="mt-6 text-lg text-muted max-w-prose">
            Practical answers to the questions patients ask most. Nothing here is a sales pitch.
          </p>
        </div>
      </Section>

      <Section surface="mist" padded={false} className="pb-24 md:pb-32">
        {posts.length === 0 ? (
          <p className="text-muted">Articles are on the way — the first will be published soon.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <ArticleCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CTABand />
    </>
  );
}
