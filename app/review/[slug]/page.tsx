import { Metadata } from 'next';
import Link from 'next/link';
import { reviews, getReviewBySlug, getRelatedReviews } from '@/data/reviews';
import { getToolBySlug } from '@/data/tools';
import { notFound } from 'next/navigation';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import Breadcrumb from '@/components/Breadcrumb';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { hasValidAffiliateUrl } from '@/lib/affiliate';

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

const seoOverrides: Record<string, { title: string; description: string }> = {
  'deepseek-vs-qwen-vs-kimi-2026': {
    title: 'DeepSeek vs Qwen vs Kimi：2026 哪个更值得选？',
    description: 'DeepSeek、通义千问 Qwen 与 Kimi 三款国产大模型对比：编程、中文理解、推理、API 价格与 Agent 生态。按开发者、团队和企业场景给出选型结论。',
  },
  'suno-vs-udio-ai-music-battle-2026': {
    title: 'Suno vs Udio：2026 AI 音乐生成哪个好？',
    description: 'Suno 与 Udio AI 音乐生成对比，覆盖音乐质量、风格控制、Prompt 使用、价格与使用场景，并给出创作者的选型建议。',
  },
  'deepseek-vs-kimi-vs-gpt4o-2026': {
    title: 'DeepSeek vs Kimi vs GPT-4o：2026 大模型怎么选？',
    description: 'DeepSeek、Kimi 与 GPT-4o 对比，聚焦编程、推理、中文能力、API 价格和生态，帮助开发者与企业按使用场景选择模型。',
  },
};

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
  const canonical = `https://tools.link.cn/review/${review.slug}`;
  const seo = seoOverrides[slug];
  const title = seo?.title ?? `${review.title}：深度评测`;
  const description = seo?.description ?? review.description;
  const socialDescription = seo?.description ?? review.subtitle;

  return {
    title,
    description,
    keywords: [...review.tags, 'AI工具评测', 'AI对比', 'AI工具推荐', toolNamesStr],
    alternates: { canonical },
    openGraph: {
      title,
      description: socialDescription,
      url: canonical,
      type: 'article',
      publishedTime: review.publishedAt,
      modifiedTime: review.updatedAt,
      authors: [review.author],
      tags: review.tags,
      images: [],
    },
    twitter: {
      card: 'summary_large_image',
      title: review.title,
      description: review.subtitle,
      images: [],
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
              <HeadingTag key={index} id={`section-${index}`} className={headingClass}>
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
  const hasAffiliateLinks = toolDetails.some(tool => Boolean(tool && hasValidAffiliateUrl(tool)));

  // 获取相关评测
  const relatedReviews = getRelatedReviews(slug, 4);
  const verdictSection = review.content.find(section => section.type === 'verdict');
  const quickVerdicts = verdictSection?.verdicts?.slice(0, 3) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ArticleJsonLd
        title={review.title}
        description={review.description}
        url={`https://tools.link.cn/review/${review.slug}`}
        author={review.author}
        publishedAt={review.publishedAt}
        updatedAt={review.updatedAt}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'AI工具评测', url: 'https://tools.link.cn/reviews' },
          { name: review.title, url: `https://tools.link.cn/review/${review.slug}` },
        ]}
      />
      <Breadcrumb
        items={[
          { name: '深度评测', url: '/reviews' },
          { name: review.title.slice(0, 30) + (review.title.length > 30 ? '...' : ''), url: `/review/${review.slug}` },
        ]}
      />

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

          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800 dark:bg-emerald-950/20 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">已经选好模型？直接拿现成模板开始</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">按写作、编程、营销和设计场景浏览可复制 Prompt。</p>
            </div>
            <a
              href="https://prompts.link.cn/?utm_source=aitoolhub&utm_medium=review&utm_campaign=prompt_funnel&utm_content=review_header_prompt_cta"
              target="_blank"
              rel="noopener noreferrer"
              data-growth-placement="review_header_prompt_cta"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              浏览 Prompt 模板 →
            </a>
          </div>

          {/* Tools being reviewed */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {toolDetails.map(tool => (
              <Link
                key={tool!.id}
                href={`/tool/${tool!.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 transition-colors"
              >
                {tool!.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
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
        {hasAffiliateLinks && <AffiliateDisclosure variant="page-top" />}

        {/* Search-intent answer: keep comparison visitors engaged before the monetization path */}
        {(review.recommendationReason || quickVerdicts.length > 0) && (
          <section className="mt-5 mb-8 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 p-5 dark:border-violet-800 dark:from-violet-950/30 dark:via-gray-900 dark:to-fuchsia-950/20 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">先看结论</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">按你的使用场景，优先考虑哪一个？</h2>
              </div>
              <a href="#section-0" className="shrink-0 text-sm font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200">查看完整评测 ↓</a>
            </div>
            {review.recommendationReason && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{review.recommendationReason}</p>
            )}
            {quickVerdicts.length > 0 && (
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {quickVerdicts.map((verdict, index) => (
                  <div key={verdict.persona + '-' + index} className="rounded-xl border border-violet-100 bg-white/80 p-4 dark:border-violet-900 dark:bg-gray-900/70">
                    <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">{verdict.persona}</p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">{verdict.recommendation}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{verdict.reason}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800 dark:bg-emerald-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">已经选好模型？直接拿现成模板开始</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">按写作、编程、营销和设计场景浏览可复制 Prompt。</p>
              </div>
              <a
                href="https://prompts.link.cn/?utm_source=aitoolhub&utm_medium=review&utm_campaign=prompt_funnel&utm_content=review_quick_decision_prompt_cta"
                target="_blank"
                rel="noopener noreferrer"
                data-growth-placement="review_quick_decision_prompt_cta"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                浏览 Prompt 模板 →
              </a>
            </div>
          </section>
        )}

        {/* Above-the-fold monetization path */}
        <div className="mt-5 mb-8 flex flex-col gap-4 rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 dark:border-cyan-800 dark:from-cyan-950/30 dark:via-gray-900 dark:to-blue-950/30 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">省下长期订阅费</p>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">评测之外，先看看可买断的 AI 工具方案</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">按写作、设计、视频和营销场景筛选 Lifetime Deal，先试用再决定。</p>
          </div>
          <a
            href="https://tool.link.cn/?utm_source=aitoolhub&utm_medium=review&utm_campaign=ltd_funnel_top&utm_content=review_top_cta"
            target="_blank"
            rel="noopener noreferrer"
            data-growth-placement="review_top_cta"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            查看可买断方案 →
          </a>
        </div>

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ReviewContent sections={review.content} />

            {/* Contextual prompt funnel */}
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 dark:border-emerald-800 dark:from-emerald-950/30 dark:to-teal-950/30">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">从评测到实战</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">用现成提示词把结论落到工作流里</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                如果你已经选好了模型，可以直接浏览按写作、编程、营销和设计场景整理的 Prompt 模板，减少从零试错。
              </p>
              <a
                href="https://prompts.link.cn/?utm_source=aitoolhub&utm_medium=review&utm_campaign=prompt_funnel&utm_content=review_prompt_cta"
                target="_blank"
                rel="noopener noreferrer"
                data-growth-placement="review_prompt_cta"
                className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                浏览 Prompt 模板 →
              </a>
            </div>

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
                    {tool!.logoUrl && // eslint-disable-next-line @next/next/no-img-element
                    <img src={tool!.logoUrl} alt="" className="w-4 h-4 object-contain" />}
                    查看 {tool!.name} 详细信息 →
                  </a>
                ))}
              </div>
            </div>

            {/* High-intent LTD path */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-6">
              <p className="text-xs font-semibold tracking-wide text-cyan-700 dark:text-cyan-300 uppercase mb-2">想长期使用？</p>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">看看买断制 AI 工具方案</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                如果你更在意一次购买、长期使用，可以继续查看独立开发者和团队常用的 LTD 方案。
              </p>
              <a
                href="https://tool.link.cn/?utm_source=aitoolhub&utm_medium=review&utm_campaign=ltd_funnel&utm_content=review_sidebar_cta"
                target="_blank"
                rel="noopener noreferrer"
                data-growth-placement="review_sidebar_cta"
                className="flex items-center justify-center w-full px-3 py-2.5 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                查看 LTD 方案 →
              </a>
            </div>
          </aside>
        </div>

        {/* Related Reviews Section */}
        {relatedReviews.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📚</span> 你可能还想看这些评测
              </h2>
              <Link
                href="/reviews"
                className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                查看全部评测 →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedReviews.map(related => (
                <Link
                  key={related.id}
                  href={`/review/${related.slug}`}
                  className="group bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {related.tools.length > 0
                        ? related.tools.length >= 3 ? '⚔️' : 'VS'
                        : '📖'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {related.featured && (
                          <span className="shrink-0 px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                            🔥 热门
                          </span>
                        )}
                        <span className="shrink-0 px-2 py-0.5 text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full">
                          {related.readingTime} 分钟
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {related.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {related.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

