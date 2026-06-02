import { Metadata } from 'next';
import Link from 'next/link';
import { tools, getToolBySlug } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import { notFound } from 'next/navigation';
import ToolGrid from '@/components/ToolGrid';
import AffiliateLink from '@/components/AffiliateLink';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import Breadcrumb from '@/components/Breadcrumb';
import { SoftwareAppJsonLd } from '@/components/JsonLd';
import ShareButtons from '@/components/ShareButtons';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} — ${tool.tagline}`,
    description: `${tool.description.slice(0, 160)}...`,
    openGraph: {
      title: `${tool.name} | AI Tool Hub`,
      description: tool.tagline,
      type: 'article',
      images: [tool.logoUrl],
    },
    // Structured data
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: tool.description,
        offers: {
          '@type': 'Offer',
          price: tool.priceFrom || '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          bestRating: 5,
        },
      }),
    },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SoftwareAppJsonLd
        name={tool.name}
        description={tool.description}
        url={`https://tools.link.cn/tool/${tool.slug}`}
        logoUrl={tool.logoUrl}
        priceFrom={tool.priceFrom}
        rating={tool.rating}
        pricingType={tool.pricingType}
      />

      <Breadcrumb
        items={[
          ...(category ? [{ name: `${category.icon} ${category.nameZh}`, url: `/category/${category.slug}` }] : []),
          { name: tool.name, url: `/tool/${tool.slug}` },
        ]}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                {tool.logoUrl ? (
                  <img src={tool.logoUrl} alt={tool.name} className="w-10 h-10 object-contain" />
                ) : (
                  <span className="text-3xl">{tool.name[0]}</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{tool.name}</h1>
                {tool.nameEn && <p className="text-sm text-gray-400 mb-2">{tool.nameEn}</p>}
                <p className="text-base text-gray-600 dark:text-gray-300">{tool.tagline}</p>
              </div>
              <div className="mt-3">
                <ShareButtons title={`${tool.name} — ${tool.tagline}`} url={`https://tools.link.cn/tool/${tool.slug}`} />
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {tool.hot && (
                <span className="px-3 py-1 text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">🔥 热门</span>
              )}
              {tool.featured && (
                <span className="px-3 py-1 text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">⭐ 编辑精选</span>
              )}
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                tool.pricingType === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                tool.pricingType === 'freemium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              }`}>
                {tool.pricingType === 'free' ? '免费' : tool.pricingType === 'freemium' ? '免费增值' : '付费'}
              </span>
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="px-3 py-1 text-xs font-medium bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors"
                >
                  {category.icon} {category.nameZh}
                </Link>
              )}
            </div>

            {/* CTA */}
            <AffiliateLink tool={tool} />
            <div className="mt-2 flex justify-center">
              <AffiliateDisclosure variant="inline" />
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 详细介绍</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none leading-relaxed text-gray-600 dark:text-gray-300">
                {tool.description.split('。').filter((s: string) => s.trim()).map((sentence: string, i: number) => (
                  <p key={i} className="mb-4">{sentence}。</p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 工具信息</h3>
            
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">评分</dt>
                <dd className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-gray-900 dark:text-white">{tool.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">/ 5.0</span>
                </dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">定价</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {tool.priceFrom || (tool.pricingType === 'free' ? '免费' : '-')}
                </dd>
              </div>
              
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">类型</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {tool.pricingType === 'free' ? '免费使用' : tool.pricingType === 'freemium' ? '免费试用' : '订阅制'}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">更新于</dt>
                <dd className="text-sm text-gray-600 dark:text-gray-400">{tool.updatedAt}</dd>
              </div>
            </dl>

            {/* Divider */}
            <hr className="my-4 border-gray-200 dark:border-gray-700" />

            {/* Official Link */}
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 text-sm text-violet-600 hover:text-violet-700 font-medium border border-violet-200 dark:border-violet-800 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
            >
              🔗 官方网站（无追踪）
            </a>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🛡️ 使用提示</h3>
            <ul className="space-y-2.5 text-sm text-amber-800 dark:text-amber-200">
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">💰</span>
                <span>上方「访问官网」为联盟链接，通过它注册/购买本站可能获得佣金，价格不变</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">🎁</span>
                <span>大部分工具提供免费额度，可以先试用再决定</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">📝</span>
                <span>评测内容独立，不受商业合作影响</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {category?.icon} 同类工具推荐
            </h2>
            <span className="text-sm text-gray-400">你可能也喜欢</span>
          </div>
          <ToolGrid tools={relatedTools} emptyMessage="暂无同类工具" />
        </section>
      )}
    </div>
  );
}
