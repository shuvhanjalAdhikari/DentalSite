import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTABand } from '@/components/CTABand';
import { Prose } from '@/components/Prose';
import { getPost, getPostSlugs, formatDate } from '@/lib/blog';
import { articleSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleSchema({
            title: post.title,
            description: post.description,
            date: post.date,
            author: post.author,
            slug: post.slug,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Articles', url: '/blog/' },
            { name: post.title, url: `/blog/${post.slug}/` },
          ]),
        )}
      />

      <Section surface="mist" padded={false} className="pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Articles', href: '/blog/' },
            { name: post.title },
          ]}
        />
        <article className="mt-6 max-w-2xl">
          <Eyebrow>Article</Eyebrow>
          <h1 className="mt-3 font-display text-4xl">{post.title}</h1>
          <p className="mt-6 text-sm text-muted">
            {formatDate(post.date)} · {post.author}
          </p>
          <div className="mt-10">
            <Prose html={post.html} />
          </div>
          <div className="mt-12 pt-6 border-t border-line">
            <Link href="/blog/" className="text-link text-sm text-petrol">
              ← All articles
            </Link>
          </div>
        </article>
      </Section>

      <CTABand />
    </>
  );
}
