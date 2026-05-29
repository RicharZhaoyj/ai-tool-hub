import { Metadata } from 'next';
import Link from 'next/link';
import { reviews, getFeaturedReviews } from '@/data/reviews';
import { getToolBySlug } from '@/data/tools';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '深度评测 — AI工具专业评测与对比分析 | AI Tool Hub',
  description: 'AI Tool Hub编辑部深度评测，真实使用体验+数据对比。ChatGPT vs Claude vs Gemini、Cursor vs Copilot、Midjourney vs Flux等热门AI工具全面横评。',
  keywords: ['AI评测', 'AI工具对比', 'ChatGPT对比', 'AI编程工具评测', 'AI绘画对比', 'AI视频生成评测'],
  openGraph: {
    title: '深度评测 — AI工具专业评测与对比分析 | AI Tool Hub',
    description: '真实使用体验+数据对比，帮你找到最适合的AI工具',
    type: 'website',
  },
};

export default function ReviewsPage() {
  const featured = getFeaturedReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <Breadcrumb
          items={[{ name: '深度评测', url: '/reviews' }]}
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          深度评测
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
          不只罗列参数，更提供真实的跨平台使用体验。每篇评测都经过100+真实任务验证，
          帮你在选择AI工具时少走弯路。
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-violet-600">{reviews.length}</span>
            <span className="text-sm text-gray-500">篇评测</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-violet-600">{reviews.reduce((acc, r) => acc + r.tools.length, 0)}</span>
            <span className="text-sm text-gray-500">款覆盖工具</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-violet-600">{Math.round(reviews.reduce((acc, r) => acc + r.readingTime, 0))}</span>
            <span className="text-sm text-gray-500">分钟阅读总量</span>
          </div>
        </div>
      </div>

      {/* Featured Reviews */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            精选评测
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map(review => (
              <Link
                key={review.id}
                href={`/review/${review.slug}`}
                className="group block bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-violet-300 dark:hover:border-violet-600 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full">
                      深度评测
                    </span>
                    <span className="text-xs text-gray-400">{review.readingTime} 分钟</span>
                    <span className="text-xs text-gray-400">{review.publishedAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors mb-2 line-clamp-2">
                    {review.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {review.subtitle}
                  </p>

                  {/* Tools mentioned */}
                  <div className="flex flex-wrap gap-2">
                    {review.tools.slice(0, 4).map(toolSlug => {
                      const tool = getToolBySlug(toolSlug);
                      return tool ? (
                        <Link key={toolSlug} href={`/tool/${tool.slug}`} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-violet-600 dark:text-violet-400 rounded-md hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors">
                          {tool.name}
                        </Link>
                      ) : (
                        <span key={toolSlug} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                          {toolSlug}
                        </span>
                      );
                    })}
                    {review.tools.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-md">
                        +{review.tools.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          全部评测
        </h2>
        <div className="space-y-4">
          {reviews.map(review => (
            <Link
              key={review.id}
              href={`/review/${review.slug}`}
              className="group block bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-violet-300 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {review.featured && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                        精选
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{review.readingTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors mb-1">
                    {review.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {review.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {review.tools.slice(0, 3).map(t => {
                    const tool = getToolBySlug(t);
                    return tool ? (
                      <Link key={t} href={`/tool/${tool.slug}`} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-violet-600 dark:text-violet-400 rounded hover:bg-violet-100 transition-colors">
                        {tool.name}
                      </Link>
                    ) : (
                      <span key={t} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 rounded">{t}</span>
                    );
                  })}
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-violet-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 text-center bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-violet-200 dark:border-violet-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          想看某个工具的评测？
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          我们持续更新评测内容，也欢迎在评论区留言你想看的工具对比
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-medium"
        >
          浏览全部 AI 工具 →
        </Link>
      </div>

      {/* Affiliate Disclosure */}
      <div className="mt-6">
        <AffiliateDisclosure variant="page-top" note="页面中的工具链接可能包含联盟链接。" />
      </div>
    </div>
  );
}
