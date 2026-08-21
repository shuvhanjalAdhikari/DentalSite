import Link from 'next/link';
import type { BlogPostSummary } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

export function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block bg-white border border-line rounded-md p-6 h-full transition-colors hover:border-petrol"
    >
      <p className="text-xs text-muted uppercase tracking-wider">{formatDate(post.date)}</p>
      <h3 className="mt-3 font-display text-xl text-ink group-hover:text-petrol transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted mt-3">{post.description}</p>
      <span className="mt-4 inline-block text-sm text-petrol text-link">Read the article</span>
    </Link>
  );
}
