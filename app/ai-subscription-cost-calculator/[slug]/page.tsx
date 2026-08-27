import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { COST_INTENT_UPDATED_AT, costIntentPageMap, costIntentPages } from '@/data/cost-intent-pages';

const BASE_URL = 'https://tools.link.cn';

export function generateStaticParams() {
  return costIntentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = costIntentPageMap[slug];
  if (!page) return {};

  const canonical = `${BASE_URL}/ai-subscription-cost-calculator/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    keywords: ['AI工具价格', 'AI订阅价格', 'AI工具成本', 'AI预算', page.title.split('：')[0]],
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: 'article',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

export default async function CostIntentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = costIntentPageMap[slug];
  if (!page) notFound();

  const canonical = `${BASE_URL}/ai-subscription-cost-calculator/${page.slug}`;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    url: canonical,
    datePublished: COST_INTENT_UPDATED_AT,
    dateModified: COST_INTENT_UPDATED_AT,
    author: { '@type': 'Organization', name: 'AI Tool Hub', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'AI Tool Hub', url: BASE_URL },
    inLanguage: 'zh-CN',
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI订阅成本计算器', item: `${BASE_URL}/ai-subscription-cost-calculator` },
      { '@type': 'ListItem', position: 3, name: page.title, item: canonical },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Script id={`cost-intent-faq-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id={`cost-intent-article-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id={`cost-intent-breadcrumb-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Breadcrumb items={[
        { name: '首页', url: '/' },
        { name: 'AI订阅成本计算器', url: '/ai-subscription-cost-calculator' },
        { name: page.title, url: `/ai-subscription-cost-calculator/${page.slug}` },
      ]} />

      <header className="mx-auto max-w-4xl">
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300">{page.eyebrow}</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">{page.title}</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">{page.intro}</p>
        <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">{page.audience}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/ai-subscription-cost-calculator?utm_source=tools&utm_medium=seo&utm_campaign=cost_intent&utm_content=${page.slug}`} data-growth-event="calculator_entry_click" data-growth-placement={`cost_intent_${page.slug}`} className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700">按你的席位重新计算 →</Link>
          <a href="mailto:hello@tools.link.cn?subject=AI工具预算与选型咨询" data-growth-event="consulting_intent" data-growth-placement={`cost_intent_${page.slug}`} className="inline-flex items-center rounded-xl border border-violet-200 bg-white px-5 py-3 font-semibold text-violet-700 transition hover:border-violet-400 dark:border-violet-800 dark:bg-gray-900 dark:text-violet-300">咨询人工选型</a>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="本页要点">
        {page.takeaways.map((takeaway, index) => (
          <article key={takeaway} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <span className="text-sm font-bold text-violet-600 dark:text-violet-300">0{index + 1}</span>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">{takeaway}</p>
          </article>
        ))}
      </section>

      <section className="mt-12" aria-labelledby="price-table-title">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">参考预算 · 更新于 {COST_INTENT_UPDATED_AT}</p>
            <h2 id="price-table-title" className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">月费、年费与适用场景</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">年费按月费 × 12 估算，不含税费、促销、超额用量和团队方案差异。</p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800/80 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">工具 / 组合</th>
                  <th className="px-4 py-3 font-semibold">月度预算</th>
                  <th className="px-4 py-3 font-semibold">12个月预算</th>
                  <th className="px-4 py-3 font-semibold">更适合</th>
                  <th className="px-4 py-3 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {page.rows.map((row) => (
                  <tr key={row.name} className="align-top">
                    <td className="px-4 py-4 font-semibold text-gray-950 dark:text-white">
                      {row.source ? <a href={row.source.href} target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 dark:hover:text-violet-300">{row.name}</a> : row.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-violet-700 dark:text-violet-300">{row.monthly}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-violet-700 dark:text-violet-300">{row.annual}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{row.bestFor}</td>
                    <td className="px-4 py-4 text-gray-500 dark:text-gray-400">{row.note}{row.source && <><br /><a href={row.source.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-violet-600 hover:underline dark:text-violet-300">查看官方来源 ↗</a></>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">从价格表到可执行预算</h2>
          <ol className="mt-5 space-y-5">
            {page.checklist.map((item, index) => (
              <li key={item.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">{index + 1}</span>
                <div><h3 className="font-semibold text-gray-950 dark:text-white">{item.title}</h3><p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.description}</p></div>
              </li>
            ))}
          </ol>
        </article>
        <aside className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-6 dark:border-cyan-900 dark:bg-cyan-950/20 sm:p-8">
          <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">免费工具</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">别凭感觉决定续费</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">输入自己的价格、席位、汇率和使用率，计算月度与年度预算，并把低利用项目列为待复核。</p>
          <Link href={`/ai-subscription-cost-calculator?utm_source=tools&utm_medium=seo&utm_campaign=cost_intent&utm_content=${page.slug}_aside`} data-growth-event="calculator_entry_click" data-growth-placement={`cost_intent_${page.slug}_aside`} className="mt-5 inline-flex rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700">打开 AI 订阅成本计算器 →</Link>
          <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400">计算结果用于预算讨论，不构成产品推荐、采购或节省承诺。</p>
        </aside>
      </section>

      <section className="mt-12" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold text-gray-950 dark:text-white">常见问题</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {page.faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-950 dark:text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
        <h2 className="font-semibold text-gray-900 dark:text-white">价格来源与说明</h2>
        <p className="mt-2">本页更新于 {COST_INTENT_UPDATED_AT}。金额是基于公开官方方案的预算示例，可能受地区、币种、税费、促销、用量和团队方案影响。请在购买前打开对应官方价格页核对；本站的人工选型服务独立于这些产品厂商。</p>
      </section>
    </div>
  );
}
