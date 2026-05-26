import { Metadata } from 'next';
import Link from 'next/link';
import { reviews, getReviewBySlug } from '@/data/reviews';
import { getToolBySlug } from '@/data/tools';
import { notFound } from 'next/navigation';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  const toolNamesStr = review.tools
    .slice(0, 3)
    .map(t => t)
    .join(' vs ');

  return {
    title: `${review.title} | AI Tool Hub 深度评测`,
    description: review.description,
    keywords: [...review.tags, 'AI工具评测', 'AI对比', 'AI工具推荐', toolNamesStr],
    openGraph: {
      title: review.title,
      description: review.subtitle,
      type: 'article',
      publishedTime: review.publishedAt,
      modifiedTime: review.updatedAt,
      authors: [review.author],
      tags: review.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: review.title,
      description: review.subtitle,
    },
  };
}

// 评测内容渲染组件
function ReviewContent({ sections }: { sections: import('@/lib/types').ReviewSection[] }) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading': {
            const level = section.level || 2;
            const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3';
            const headingClass = level === 1
              ? 'text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700'
              : section.level === 2
              ? 'text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3'
              : 'text-lg font-medium text-gray-800 dark:text-gray-200 mt-6 mb-2';
            return (
              <HeadingTag key={index} className={headingClass}>
                {section.title}
              </HeadingTag>
            );
          }

          case 'text':
            return (
              <div key={index} className="mb-5 leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {renderMarkdown(section.content || '')}
              </div>
            );

          case 'comparison-table':
            return (
              <div key={index} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-violet-50 dark:bg-violet-950/30">
                      {(section.headers || []).map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-tl-xl">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(section.rows || []).map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800/50' : 'bg-gray-50 dark:bg-gray-800/30'}>
                        <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                          {row.tool}
                        </td>
                        {row.values.map((value, valueIndex) => (
                          <td key={valueIndex} className="px-4 py-2.5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {Array.isArray(value) ? value.join(' / ') : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'pros-cons':
            return (
              <div key={index} className="my-6 grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {section.toolName} — 优点
                  </h4>
                  <ul className="space-y-2">
                    {(section.pros || []).map((pro, i) => (
                      <li key={i} className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                        <span className="mt-1 shrink-0">•</span>{pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {section.toolName} — 缺点
                  </h4>
                  <ul className="space-y-2">
                    {(section.cons || []).map((con, i) => (
                      <li key={i} className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
                        <span className="mt-1 shrink-0">•</span>{con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );

          case 'verdict':
            return (
              <div key={index} className="my-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl p-6 border border-violet-200 dark:border-violet-800">
                <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100 mb-5">
                  选购决策：你应该选哪个？
                </h3>
                <div className="space-y-4">
                  {(section.verdicts || []).map((v, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800/60 rounded-xl p-4 border border-violet-100 dark:border-violet-800">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <span className="font-semibold text-violet-700 dark:text-violet-300 text-sm bg-violet-100 dark:bg-violet-900/40 px-3 py-1 rounded-full">
                          {v.persona}
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">{v.recommendation}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{v.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'callout':
            const calloutStyles = {
              tip: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
              warning: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
              info: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
            };
            const calloutIcons = {
              tip: '💡',
              warning: '⚠️',
              info: '📌',
            };
            const style = calloutStyles[section.calloutType as keyof typeof calloutStyles] || calloutStyles.info;
            const icon = calloutIcons[section.calloutType as keyof typeof calloutIcons] || '📌';
            return (
              <div key={index} className={`my-6 rounded-xl p-4 border ${style}`}>
                <p className="text-sm flex items-start gap-2">
                  <span className="shrink-0">{icon}</span>
                  {section.content}
                </p>
              </div>
            );

          case 'pricing-table':
            return (
              <div key={index} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-emerald-50 dark:bg-emerald-950/30">
                      {(section.headers || []).map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-tl-xl">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(section.rows || []).map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800/50' : 'bg-gray-50 dark:bg-gray-800/30'}>
                        <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                          {row.tool}
                        </td>
                        {row.values.map((value, valueIndex) => (
                          <td key={valueIndex} className="px-4 py-2.5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {Array.isArray(value) ? value.join(' / ') : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// 简易Markdown渲染（只处理加粗和换行）
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // 处理换行但保留段落结构
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

export default async function ReviewDetailPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  // 获取涉及的工具详情
  const toolDetails = review.tools
    .map(slug => getToolBySlug(slug))
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-violet-600 transition-colors">首页</Link>
        <span>/</span>
        <Link href="/reviews" className="hover:text-violet-600 transition-colors">深度评测</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">
          {review.title.slice(0, 30)}...
        </span>
      </nav>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full">
              深度评测
            </span>
            <span className="text-sm text-gray-400">
              {review.readingTime} 分钟阅读
            </span>
            <span className="text-sm text-gray-400">
              {review.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
            {review.title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
            {review.subtitle}
          </p>

          {/* Tools being reviewed */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {toolDetails.map(tool => (
              <Link
                key={tool!.id}
                href={`/tool/${tool!.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 transition-colors"
              >
                {tool!.logoUrl && (
                  <img src={tool!.logoUrl} alt={tool!.name} className="w-5 h-5 object-contain" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool!.name}</span>
                <span className="text-xs text-gray-400">→ 详情</span>
              </Link>
            ))}
          </div>

          {/* Author info */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</p>
              <p className="text-xs text-gray-400">发布于 {review.publishedAt} · 更新于 {review.updatedAt}</p>
            </div>
          </div>
        </header>

        {/* Affiliate Disclosure */}
        <AffiliateDisclosure variant="page-top" />

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ReviewContent sections={review.content} />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">相关标签</h3>
              <div className="flex flex-wrap gap-2">
                {review.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - TOC + CTA */}
          <aside className="space-y-6">
            {/* Table of Contents (auto-generated from headings) */}
            <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">目录</h3>
              <nav>
                <ol className="space-y-2 text-sm">
                  {review.content
                    .filter(s => s.type === 'heading' && s.level !== 3)
                    .map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className={`block text-gray-500 hover:text-violet-600 transition-colors ${
                            section.level === 1 ? 'font-medium text-gray-700' : 'pl-3'
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                </ol>
              </nav>
            </div>

            {/* Quick CTA Card */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">觉得有用？</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                分享给需要的朋友，或者看看这些工具的详细介绍：
              </p>
              <div className="space-y-2">
                {toolDetails.map(tool => (
                  <a
                    key={tool!.id}
                    href={`/tool/${tool!.slug}`}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-violet-600 bg-white dark:bg-gray-800 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                  >
                    {tool!.logoUrl && <img src={tool!.logoUrl} alt="" className="w-4 h-4 object-contain" />}
                    查看 {tool!.name} 详细信息 →
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
