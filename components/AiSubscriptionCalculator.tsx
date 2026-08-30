'use client';

import { useMemo, useRef, useState } from 'react';

type SubscriptionPlan = {
  id: string;
  name: string;
  category: '通用模型' | '编程' | '语音' | '自定义';
  monthlyUsd: number;
  seats: number;
  usage: number;
  selected: boolean;
  sourceUrl?: string;
};

const initialPlans: SubscriptionPlan[] = [
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: '通用模型',
    monthlyUsd: 20,
    seats: 1,
    usage: 70,
    selected: true,
    sourceUrl: 'https://chatgpt.com/pricing',
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: '通用模型',
    monthlyUsd: 20,
    seats: 1,
    usage: 50,
    selected: true,
    sourceUrl: 'https://www.anthropic.com/pricing',
  },
  {
    id: 'google-ai-pro',
    name: 'Google AI Pro',
    category: '通用模型',
    monthlyUsd: 19.99,
    seats: 1,
    usage: 20,
    selected: true,
    sourceUrl: 'https://one.google.com/about/google-ai-plans/',
  },
  {
    id: 'cursor-pro',
    name: 'Cursor Pro',
    category: '编程',
    monthlyUsd: 20,
    seats: 1,
    usage: 60,
    selected: false,
    sourceUrl: 'https://www.cursor.com/pricing',
  },
  {
    id: 'elevenlabs-creator',
    name: 'ElevenLabs Creator',
    category: '语音',
    monthlyUsd: 22,
    seats: 1,
    usage: 30,
    selected: false,
    sourceUrl: 'https://elevenlabs.io/pricing',
  },
  {
    id: 'custom',
    name: '其他订阅',
    category: '自定义',
    monthlyUsd: 10,
    seats: 1,
    usage: 50,
    selected: false,
  },
];

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const cnyFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 0,
});

function track(eventName: string, params: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'subscription_cost_funnel',
      site: 'tools',
      content_path: window.location.pathname,
      ...params,
    });
  }
}

export default function AiSubscriptionCalculator() {
  const [plans, setPlans] = useState(initialPlans);
  const [exchangeRate, setExchangeRate] = useState(7.2);
  const [generated, setGenerated] = useState(false);
  const startedRef = useRef(false);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('calculator_start', { calculator: 'ai_subscription_cost' });
  };

  const updatePlan = (id: string, patch: Partial<SubscriptionPlan>) => {
    markStarted();
    setPlans((current) => current.map((plan) => (plan.id === id ? { ...plan, ...patch } : plan)));
  };

  const summary = useMemo(() => {
    const selected = plans.filter((plan) => plan.selected);
    const monthlyUsd = selected.reduce((total, plan) => total + plan.monthlyUsd * plan.seats, 0);
    const annualUsd = monthlyUsd * 12;
    const lowUsePlans = selected.filter((plan) => plan.usage <= 30);
    const lowUseMonthlyUsd = lowUsePlans.reduce((total, plan) => total + plan.monthlyUsd * plan.seats, 0);
    const totalSeats = selected.reduce((total, plan) => total + plan.seats, 0);
    const generalPlanCount = selected.filter((plan) => plan.category === '通用模型').length;

    return {
      selected,
      monthlyUsd,
      annualUsd,
      annualCny: annualUsd * exchangeRate,
      lowUsePlans,
      lowUseMonthlyUsd,
      lowUseAnnualCny: lowUseMonthlyUsd * 12 * exchangeRate,
      totalSeats,
      generalPlanCount,
    };
  }, [exchangeRate, plans]);

  const suggestions = useMemo(() => {
    const items: string[] = [];
    if (summary.generalPlanCount >= 2) {
      items.push('通用模型订阅存在重叠：先指定一个主力模型，保留另一个做明确的专项任务，并连续记录 14 天使用情况。');
    }
    if (summary.lowUsePlans.length > 0) {
      items.push(`优先复核 ${summary.lowUsePlans.map((plan) => plan.name).join('、')}：当前填写的利用率不高于 30%，适合检查降档、暂停或按需购买。`);
    }
    if (summary.totalSeats > summary.selected.length) {
      items.push('存在多席位成本：核对团队版的管理、安全和共享权益，不要通过共享个人账号来降低费用。');
    }
    if (summary.selected.length === 0) {
      items.push('先勾选正在付费的订阅，再填写每月价格、席位和实际使用率。');
    }
    if (items.length === 0) {
      items.push('当前工具栈较精简；建议每月固定记录一次使用率和实际产出，避免自动续费后长期闲置。');
    }
    items.push('把模型费用与提示词模板、API、人工复核和数据安全成本一起纳入采购判断，订阅价不等于完整使用成本。');
    return items;
  }, [summary]);

  const handleGenerate = () => {
    markStarted();
    setGenerated(true);
    track('cost_plan_generated', {
      selected_plan_count: summary.selected.length,
      monthly_cost_usd: Number(summary.monthlyUsd.toFixed(2)),
      annual_cost_cny: Math.round(summary.annualCny),
      low_use_plan_count: summary.lowUsePlans.length,
    });
  };

  const consultingPlan = summary.totalSeats > summary.selected.length ? 'team' : 'personal';
  const consultingHref = `/consulting?plan=${consultingPlan}&utm_source=tools&utm_medium=calculator&utm_campaign=service_revenue&utm_content=calculator_generated`;

  const handleConsultingEntry = () => {
    track('consulting_entry_click', {
      offer: consultingPlan,
      selected_plan_count: summary.selected.length,
      annual_cost_cny: Math.round(summary.annualCny),
    });
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-xl shadow-violet-100/60 dark:border-violet-900 dark:bg-gray-900 dark:shadow-none" aria-labelledby="calculator-title">
      <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-5 dark:border-violet-900 dark:from-violet-950/30 dark:via-gray-900 dark:to-cyan-950/20 sm:p-7">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">免费 · 无需登录 · 价格可编辑</p>
        <h2 id="calculator-title" className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">先算清年度成本，再决定保留哪些订阅</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">勾选正在使用的产品，填写席位和真实使用率。计算在浏览器内完成；分析事件只记录汇总数字，不记录自定义工具名称。</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.55fr_1fr]">
        <div className="p-5 sm:p-7">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-semibold text-gray-950 dark:text-white">你的订阅清单</h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">示例价更新于 2026-08-27；地区、税费、促销和团队版价格可能不同。</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              美元兑人民币估算
              <input
                type="number"
                min="1"
                max="20"
                step="0.01"
                value={exchangeRate}
                onChange={(event) => {
                  markStarted();
                  setExchangeRate(Math.max(1, Number(event.target.value) || 1));
                }}
                className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-right text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                aria-label="美元兑人民币估算汇率"
              />
            </label>
          </div>

          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan.id} className={`rounded-2xl border p-4 transition ${plan.selected ? 'border-violet-300 bg-violet-50/60 dark:border-violet-800 dark:bg-violet-950/20' : 'border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-950/40'}`}>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                  <div className="flex min-w-52 flex-1 items-start gap-3">
                    <input
                      id={`plan-${plan.id}`}
                      type="checkbox"
                      checked={plan.selected}
                      onChange={(event) => updatePlan(plan.id, { selected: event.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600"
                      aria-label={`选择 ${plan.name}`}
                    />
                    <div>
                      {plan.id === 'custom' ? (
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(event) => updatePlan(plan.id, { name: event.target.value.slice(0, 40) })}
                          onFocus={markStarted}
                          className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-semibold text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          aria-label="自定义订阅名称"
                        />
                      ) : (
                        <label htmlFor={`plan-${plan.id}`} className="font-semibold text-gray-950 dark:text-white">{plan.name}</label>
                      )}
                      <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                        {plan.category}
                        {plan.sourceUrl && (
                          <>
                            {' · '}
                            <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-violet-700 hover:underline dark:text-violet-300">官方价格</a>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="grid flex-[1.4] grid-cols-2 gap-3 sm:grid-cols-3">
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                      月价（USD）
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={plan.monthlyUsd}
                        onChange={(event) => updatePlan(plan.id, { monthlyUsd: Math.max(0, Number(event.target.value) || 0) })}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                      />
                    </label>
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                      席位数
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={plan.seats}
                        onChange={(event) => updatePlan(plan.id, { seats: Math.min(100, Math.max(1, Math.round(Number(event.target.value) || 1))) })}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                      />
                    </label>
                    <label className="col-span-2 text-xs text-gray-500 dark:text-gray-400 sm:col-span-1">
                      使用率 {plan.usage}%
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={plan.usage}
                        onChange={(event) => updatePlan(plan.id, { usage: Number(event.target.value) })}
                        className="mt-3 w-full accent-violet-600"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-gray-200 bg-gray-950 p-5 text-white dark:border-gray-800 lg:border-l lg:border-t-0 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">成本快照</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-gray-400">每月</p>
              <p className="mt-1 text-2xl font-bold text-white">{usdFormatter.format(summary.monthlyUsd)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-gray-400">每年估算</p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">{cnyFormatter.format(summary.annualCny)}</p>
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
            <p className="text-xs text-amber-200">低利用订阅待复核</p>
            <p className="mt-1 text-xl font-bold text-amber-300">{summary.lowUsePlans.length} 个 · {cnyFormatter.format(summary.lowUseAnnualCny)}/年</p>
            <p className="mt-2 text-xs leading-5 text-gray-400">这是利用率不高于 30% 的订阅成本，不等同于一定可以节省的金额。</p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="mt-5 w-full rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400"
          >
            生成优化清单
          </button>

          {generated && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4" aria-live="polite">
              <h3 className="font-semibold text-white">优先检查这几件事</h3>
              <ol className="mt-3 space-y-3 text-sm leading-6 text-gray-300">
                {suggestions.map((suggestion, index) => (
                  <li key={suggestion} className="flex gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-400/20 text-xs font-bold text-violet-200">{index + 1}</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <a
            href={consultingHref}
            onClick={handleConsultingEntry}
            className="mt-5 flex w-full items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-3 text-center font-semibold text-cyan-200 transition hover:bg-cyan-300/20"
          >
            获取人工选型与成本优化方案 →
          </a>
          <p className="mt-3 text-center text-xs leading-5 text-gray-500">进入站内表单确认需求；提交不会自动扣款，请勿填写密码、密钥或支付信息。</p>
        </aside>
      </div>
    </section>
  );
}
