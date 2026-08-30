'use client';

import { useState } from 'react';

const PLAN_OPTIONS = [
  { value: 'personal', label: '个人 / 创作者 AI 工具栈体检（¥499 起）' },
  { value: 'team', label: '2–20 人团队 AI 选型与成本优化（¥1,999 起）' },
  { value: 'partner_profile', label: 'AI 工具资料核验与产品页增强（¥499 / 次）' },
  { value: 'partner_content', label: 'AI 工具场景内容合作（¥1,999 起）' },
] as const;

type ConsultingFormProps = {
  initialPlan?: string;
  source?: string;
};

function normalizePlan(value?: string) {
  return PLAN_OPTIONS.some((option) => option.value === value) ? value! : 'personal';
}

export default function ConsultingForm({ initialPlan, source = 'consulting_page' }: ConsultingFormProps) {
  const normalizedInitialPlan = normalizePlan(initialPlan);
  const [plan, setPlan] = useState(normalizedInitialPlan);
  const [teamSize, setTeamSize] = useState(normalizedInitialPlan === 'team' ? '2-5' : '1');
  const safeSource = source.slice(0, 120);

  const handlePlanChange = (nextPlan: string) => {
    setPlan(nextPlan);
    if (nextPlan === 'team' && teamSize === '1') setTeamSize('2-5');
    if (nextPlan === 'personal') setTeamSize('1');
  };

  const handleSubmit = () => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    const isPartner = plan.startsWith('partner_');
    window.gtag('event', isPartner ? 'partner_inquiry' : 'consulting_intent', {
      event_category: isPartner ? 'partner_revenue_funnel' : 'service_revenue_funnel',
      site: 'tools',
      placement: 'consulting_form_submit',
      offer: plan,
      source_content: safeSource,
      content_path: window.location.pathname,
      contact_method: 'formsubmit',
    });
  };

  return (
    <form
      action="https://formsubmit.co/support@link.cn"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-violet-200 bg-white p-6 shadow-xl shadow-violet-100/60 dark:border-violet-900 dark:bg-gray-900 dark:shadow-none sm:p-8"
    >
      <input type="hidden" name="_subject" value="[AI Tool Hub] 新的选型或合作咨询" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://tools.link.cn/consulting/success" />
      <input type="hidden" name="来源标识" value={safeSource} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="consulting-plan" className="block text-sm font-semibold text-gray-900 dark:text-white">
          需要的方案 <span className="text-red-500">*</span>
        </label>
        <select
          id="consulting-plan"
          name="咨询方案"
          value={plan}
          onChange={(event) => handlePlanChange(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        >
          {PLAN_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="consulting-name" className="block text-sm font-semibold text-gray-900 dark:text-white">
            称呼 <span className="text-red-500">*</span>
          </label>
          <input
            id="consulting-name"
            name="称呼"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="怎么称呼你"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="consulting-email" className="block text-sm font-semibold text-gray-900 dark:text-white">
            回复邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            id="consulting-email"
            name="邮箱"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            placeholder="name@company.com"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="consulting-team-size" className="block text-sm font-semibold text-gray-900 dark:text-white">团队规模</label>
          <select
            id="consulting-team-size"
            name="团队规模"
            value={teamSize}
            onChange={(event) => setTeamSize(event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          >
            <option value="1">个人</option>
            <option value="2-5">2–5 人</option>
            <option value="6-20">6–20 人</option>
            <option value="21+">21 人以上</option>
          </select>
        </div>
        <div>
          <label htmlFor="consulting-budget" className="block text-sm font-semibold text-gray-900 dark:text-white">每月 AI 工具预算</label>
          <select
            id="consulting-budget"
            name="每月预算"
            defaultValue="unknown"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          >
            <option value="unknown">暂不确定</option>
            <option value="under-500">¥500 以下</option>
            <option value="500-2000">¥500–2,000</option>
            <option value="2000-10000">¥2,000–10,000</option>
            <option value="10000+">¥10,000 以上</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consulting-tools" className="block text-sm font-semibold text-gray-900 dark:text-white">
          当前正在使用或考虑的工具 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="consulting-tools"
          name="当前工具"
          required
          rows={3}
          maxLength={800}
          placeholder="例如：ChatGPT Plus、Claude Pro、Cursor；团队还在比较 Gemini 和 Microsoft Copilot"
          className="mt-2 w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="consulting-goal" className="block text-sm font-semibold text-gray-900 dark:text-white">
          最希望解决的问题 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="consulting-goal"
          name="核心问题"
          required
          rows={5}
          maxLength={1200}
          placeholder="描述使用场景、目前遇到的重复订阅、成本、权限、协作或数据边界问题。请不要提交账号密码、密钥或未公开数据。"
          className="mt-2 w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <label className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600 dark:bg-gray-950/60 dark:text-gray-300">
        <input type="checkbox" name="同意联系" value="是" required className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600" />
        <span>我同意使用上述信息回复本次咨询。本站不会要求在表单中提交密码、API Key、支付信息或其他敏感凭据。</span>
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        提交需求，确认服务范围
      </button>
      <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
        提交不会自动扣款。需求会通过 FormSubmit 转发至 support@link.cn，确认范围、周期和报价后再决定是否开始。
      </p>
    </form>
  );
}
