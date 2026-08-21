import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  html: string;
};

export type BlogPostSummary = BlogFrontmatter & {
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function readAllFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
}

function parseFile(file: string): BlogPost {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date:
      typeof fm.date === 'string'
        ? fm.date
        : new Date(fm.date as unknown as string).toISOString().slice(0, 10),
    author: fm.author,
    html,
  };
}

export function getAllPosts(): BlogPostSummary[] {
  return readAllFiles()
    .map(parseFile)
    .map(({ html: _html, ...rest }) => rest)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return undefined;
  return parseFile(file);
}

export function getPostSlugs(): string[] {
  return readAllFiles().map((f) => f.replace(/\.md$/, ''));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
