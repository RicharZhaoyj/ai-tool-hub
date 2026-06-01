import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'AI 资讯',
  description: 'AI 工具行业最新动态、模型发布、产品更新和深度分析。紧跟 AI 世界的变化。',
  openGraph: {
    title: 'AI 资讯 | AI Tool Hub',
    description: 'AI 工具行业最新动态、模型发布、产品更新和深度分析。',
  },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ name: '首页', url: '/' }, { name: 'AI 资讯', url: '/blog' }]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">📰 AI 资讯</h1>
        <p className="text-gray-500 dark:text-gray-400">
          AI 工具行业最新动态、模型发布、产品更新和深度分析
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-800 transition-all"
          >
            {/* Header gradient */}
            <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {post.featured && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full">
                    置顶
                  </span>
                )}
                <time className="text-xs text-gray-400">{post.publishedAt}</time>
                <span className="text-xs text-gray-400">{post.readingTime} min</span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
