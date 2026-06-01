import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary.slice(0, 160),
    openGraph: {
      title: `${post.title} | AI Tool Hub`,
      description: post.summary,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { name: '首页', url: '/' },
          { name: 'AI 资讯', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <time className="text-sm text-gray-400">{post.publishedAt}</time>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-400">{post.readingTime} min read</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-400">{post.author}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {post.summary}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/?q=${encodeURIComponent(tag)}`}
                className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-gray dark:prose-invert max-w-none leading-relaxed text-gray-600 dark:text-gray-300
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2:where(.dark_*)]:text-white [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3:where(.dark_*)]:text-white [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4
            [&_li]:mb-1.5
            [&_strong]:text-gray-900 [&_strong:where(.dark_*)]:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            返回资讯列表
          </Link>
        </div>
      </article>
    </div>
  );
}
