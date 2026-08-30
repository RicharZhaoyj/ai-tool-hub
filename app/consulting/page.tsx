import type { Metadata } from 'next';
import Script from 'next/script';
import Breadcrumb from '@/components/Breadcrumb';
import ConsultingForm from '@/components/ConsultingForm';

const BASE_URL = 'https://tools.link.cn';

export const metadata: Metadata = {
  title: 'AI工具选型咨询｜个人与团队订阅成本优化',
  description: '面向个人创作者和2–20人团队的AI工具选型、订阅成本核对与工具栈优化服务。先提交需求，确认范围和报价后再开始。',
  keywords: ['AI工具选型咨询', 'AI订阅成本优化', '团队AI工具采购', 'ChatGPT Claude Gemini选型', 'AI工具预算'],
  alternates: { canonical: `${BASE_URL}/consulting` },
  openGraph: {
    title: 'AI工具选型与订阅成本优化服务',
    description: '梳理工作流、席位、订阅重叠和数据边界，形成可执行的AI工具组合与30天验证建议。',
    url: `${BASE_URL}/consulting`,
    type: 'website',
    locale: 'zh_CN',
  },
};

const faqs = [
  {
    question: '提交咨询后会立即收费吗？',
    answer: '不会。表单只用于确认需求，双方确认服务范围、交付周期和报价后才会进入付款与执行。',
  },
  {
    question: '个人工具栈体检包含什么？',
    answer: '包括一次需求与工作流访谈、当前订阅和年成本清单、功能重叠检查，以及主力工具、替代方案和30天验证建议。',
  },
  {
    question: '团队方案会处理账号共享和数据安全吗？',
    answer: '会梳理席位、权限、管理和数据边界，但不替代企业的法务、采购或信息安全审查。',
  },
  {
    question: '是否保证节省固定比例？',
    answer: '不保证。服务提供需求梳理、成本建模和独立选型建议，不承诺固定节省金额，也不出售特定产品的正面评价。',
  },
];

type ConsultingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ConsultingPage({ searchParams }: ConsultingPageProps) {
  const query = await searchParams;
  const initialPlan = firstValue(query.plan);
  const source = firstValue(query.utm_content) || firstValue(query.source) || 'consulting_page';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI工具选型与订阅成本优化服务',
    provider: { '@type': 'Organization', name: 'AI Tool Hub', url: BASE_URL },
    areaServed: 'CN',
    availableLanguage: ['zh-CN'],
    url: `${BASE_URL}/consulting`,
    offers: [
      { '@type': 'Offer', name: '个人AI工具栈体检', price: '499', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: '团队AI选型与成本优化', price: '1999', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
    ],
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Script id="consulting-service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id="consulting-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb items={[{ name: '首页', url: '/' }, { name: 'AI工具选型咨询', url: '/consulting' }]} />

      <header className="mx-auto max-w-4xl text-center">
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300">先确认问题与范围，再决定是否付费</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">AI工具选型与订阅成本优化</h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">面向个人创作者和小团队，梳理真实工作流、席位、订阅重叠和数据边界，形成可执行的工具组合与30天验证建议。</p>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="服务方案">
        <article className="rounded-2xl border border-violet-200 bg-violet-50/60 p-6 dark:border-violet-800 dark:bg-violet-950/20">
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">个人 / 创作者</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">AI工具栈体检 · ¥499 起</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
            <li>• 45分钟需求与工作流访谈</li>
            <li>• 当前订阅、功能重叠与年成本清单</li>
            <li>• 主力工具、替代方案与30天验证建议</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6 dark:border-cyan-800 dark:bg-cyan-950/20">
          <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">2–20 人团队</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">AI选型与成本优化 · ¥1,999 起</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
            <li>• 需求、席位、权限与数据边界梳理</li>
            <li>• 年度成本模型与2–3套工具组合</li>
            <li>• 采购前试用清单、风险项和落地顺序</li>
          </ul>
        </article>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">交付路径</p>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-950 dark:text-white">1. 提交需求：</strong>说明工具、预算和最想解决的问题。</li>
              <li><strong className="text-gray-950 dark:text-white">2. 确认范围：</strong>通过邮箱确认是否适合、交付内容、周期和最终报价。</li>
              <li><strong className="text-gray-950 dark:text-white">3. 分析交付：</strong>形成成本清单、选型结论、风险项和验证步骤。</li>
              <li><strong className="text-gray-950 dark:text-white">4. 复核调整：</strong>按约定完成一次事实性修订或答疑。</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
            <h2 className="font-semibold">服务边界</h2>
            <p className="mt-2">不出售排名、指定产品的正面结论或固定节省承诺；不要求提供账号密码、API Key、支付信息或未公开业务数据。</p>
          </article>
        </div>
        <ConsultingForm initialPlan={initialPlan} source={source} />
      </section>

      <section className="mt-14" aria-labelledby="consulting-faq-title">
        <h2 id="consulting-faq-title" className="text-2xl font-bold text-gray-950 dark:text-white">常见问题</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-950 dark:text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
