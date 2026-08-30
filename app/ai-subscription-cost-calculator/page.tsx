import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import AiSubscriptionCalculator from '@/components/AiSubscriptionCalculator';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'AI订阅成本计算器｜ChatGPT、Claude、Gemini团队年费与省钱方案',
  description: '免费计算 ChatGPT、Claude、Gemini、Cursor 等 AI 工具的月费、年费和低利用订阅成本，生成个人与团队的工具栈优化清单。',
  keywords: ['AI订阅成本计算器', 'ChatGPT订阅价格', 'Claude订阅价格', 'AI工具成本', 'AI工具选型', '团队AI预算'],
  alternates: { canonical: 'https://tools.link.cn/ai-subscription-cost-calculator' },
  openGraph: {
    title: 'AI订阅成本计算器｜先算年费，再决定保留哪些工具',
    description: '把 ChatGPT、Claude、Gemini、Cursor 等订阅换算成年度预算，找出低利用项目并生成优化清单。',
    url: 'https://tools.link.cn/ai-subscription-cost-calculator',
    type: 'website',
  },
};

const faqs = [
  {
    question: '低使用率订阅的成本，是否就是可以节省的金额？',
    answer: '不是。计算器只把使用率不高于 30% 的订阅列为待复核成本。是否降档或取消，还要看关键任务、数据安全、团队协作和替代工具。',
  },
  {
    question: '示例订阅价格准确吗？',
    answer: '示例价来自官方公开价格页并标注了更新时间，但地区、税费、促销和团队版可能不同。所有价格都可以编辑，应以结算页为准。',
  },
  {
    question: '个人版账号可以多人共享来省钱吗？',
    answer: '不建议。多人使用应核对产品条款并优先考虑可管理席位、权限和数据边界的团队方案。',
  },
  {
    question: '人工选型服务会承诺固定节省比例吗？',
    answer: '不会。服务提供成本建模、需求梳理和选型建议，不保证固定节省金额，也不替代采购、法务或信息安全评估。',
  },
];

export default function AiSubscriptionCostCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI订阅成本计算器',
    url: 'https://tools.link.cn/ai-subscription-cost-calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'zh-CN',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Script id="ai-subscription-calculator-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <Script id="ai-subscription-calculator-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumb items={[{ name: '首页', url: '/' }, { name: 'AI订阅成本计算器', url: '/ai-subscription-cost-calculator' }]} />

      <header className="mx-auto mb-9 max-w-4xl text-center">
        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300">AI 工具栈预算与采购决策</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">AI订阅成本计算器</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">把 ChatGPT、Claude、Gemini、Cursor 等月费换算成年成本，识别低利用和功能重叠，再决定续费、降档或替换。</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>✓ 价格可编辑</span><span>✓ 支持多席位</span><span>✓ 生成优化清单</span><span>✓ 无需注册</span>
        </div>
      </header>

      <AiSubscriptionCalculator />

      <section className="mt-14" aria-labelledby="service-title">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">从计算到落地</p>
            <h2 id="service-title" className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">需要人工判断时，可选择首批验证服务</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">报价覆盖分析与建议，不出售正面评价，不承诺固定节省比例。</p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">个人 / 创作者</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">AI工具栈体检 · ¥499 起</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <li>• 45 分钟需求与工作流访谈</li>
              <li>• 当前订阅、功能重叠与年成本清单</li>
              <li>• 主力工具、替代方案与 30 天验证建议</li>
            </ul>
            <Link href="/consulting?plan=personal&utm_source=tools&utm_medium=calculator&utm_campaign=service_revenue&utm_content=calculator_personal_offer" data-growth-event="consulting_entry_click" data-growth-placement="calculator_personal_offer" className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700">咨询个人方案 →</Link>
          </article>
          <article className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 dark:border-cyan-900 dark:from-cyan-950/20 dark:to-gray-900">
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">2–20 人小团队</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">AI选型与成本优化 · ¥1,999 起</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <li>• 需求、席位、权限与数据边界梳理</li>
              <li>• 年度成本模型与 2–3 套工具组合</li>
              <li>• 实施优先级、试用指标与 7 天答疑</li>
            </ul>
            <Link href="/consulting?plan=team&utm_source=tools&utm_medium=calculator&utm_campaign=service_revenue&utm_content=calculator_team_offer" data-growth-event="consulting_entry_click" data-growth-placement="calculator_team_offer" className="mt-5 inline-flex rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700">咨询团队方案 →</Link>
          </article>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">怎么判断一项订阅该不该续费？</h2>
          <ol className="mt-5 space-y-5">
            {[
              ['先看任务，而不是模型榜单', '列出每周重复发生、能产生业务价值的任务，再判断哪个工具不可替代。'],
              ['记录 14 天真实使用率', '登录次数不等于产出；记录完成任务数、节省时间和必须人工返工的比例。'],
              ['把重叠能力设为主备关系', '通用模型不要全部当主力。保留一个日常主力，再为编程、长文或多模态设置明确的专项工具。'],
              ['用年度总成本做决策', '同时计算席位、税费、API、提示词资产、培训和数据治理成本，避免只比较月费。'],
            ].map(([title, description], index) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">{index + 1}</span>
                <div><h3 className="font-semibold text-gray-950 dark:text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p></div>
              </li>
            ))}
          </ol>
        </article>
        <aside className="rounded-2xl border border-violet-200 bg-violet-50/60 p-6 dark:border-violet-900 dark:bg-violet-950/20 sm:p-8">
          <h2 className="text-xl font-bold text-gray-950 dark:text-white">继续比较工具</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">成本只是一个维度。结合真实场景再看能力、速度、隐私与替代方案。</p>
          <div className="mt-5 space-y-3">
            <Link href="/review/chatgpt-vs-claude-vs-gemini-2026" data-growth-event="calculator_review_click" data-growth-placement="calculator_related_reviews" className="block rounded-xl border border-violet-200 bg-white p-4 text-sm font-semibold text-gray-900 transition hover:border-violet-400 dark:border-violet-800 dark:bg-gray-900 dark:text-white">ChatGPT vs Claude vs Gemini →</Link>
            <Link href="/review/deepseek-vs-qwen-vs-kimi-2026" data-growth-event="calculator_review_click" data-growth-placement="calculator_related_reviews" className="block rounded-xl border border-violet-200 bg-white p-4 text-sm font-semibold text-gray-900 transition hover:border-violet-400 dark:border-violet-800 dark:bg-gray-900 dark:text-white">DeepSeek vs Qwen vs Kimi →</Link>
            <Link href="/reviews" className="block rounded-xl border border-violet-200 bg-white p-4 text-sm font-semibold text-gray-900 transition hover:border-violet-400 dark:border-violet-800 dark:bg-gray-900 dark:text-white">浏览全部深度评测 →</Link>
          </div>
        </aside>
      </section>

      <section className="mt-14" aria-labelledby="cost-intent-title">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">按搜索意图继续</p>
            <h2 id="cost-intent-title" className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">价格、对比和团队预算专题</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">先读对应场景，再回到计算器输入自己的席位和利用率。</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link href="/ai-subscription-cost-calculator/chatgpt-vs-claude-vs-gemini-cost" data-growth-event="cost_intent_landing_click" data-growth-placement="calculator_related_landing" className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-950 dark:text-white">ChatGPT、Claude、Gemini一年多少钱？</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">通用模型订阅价格、年度预算和主备组合判断。</p>
          </Link>
          <Link href="/ai-subscription-cost-calculator/ai-tools-for-small-teams-budget" data-growth-event="cost_intent_landing_click" data-growth-placement="calculator_related_landing" className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-950 dark:text-white">5人小团队 AI 预算怎么定？</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">从席位、权限、使用率和试用门槛拆分团队预算。</p>
          </Link>
          <Link href="/ai-subscription-cost-calculator/ai-tool-pricing-comparison-2026" data-growth-event="cost_intent_landing_click" data-growth-placement="calculator_related_landing" className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-950 dark:text-white">2026 AI 工具价格表</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">快速筛选 ChatGPT、Claude、Cursor、ElevenLabs 等订阅。</p>
          </Link>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold text-gray-950 dark:text-white">常见问题</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-950 dark:text-white">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
        <h2 className="font-semibold text-gray-900 dark:text-white">价格来源与说明</h2>
        <p className="mt-2">示例价更新于 2026-08-27，参考 ChatGPT、Anthropic、Google、Cursor 和 ElevenLabs 官方价格页。汇率为手动估算，不构成报价；最终费用以各产品结算页为准。本站的人工服务独立于这些产品厂商。</p>
      </section>
    </div>
  );
}
