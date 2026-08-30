import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '咨询已提交',
  robots: { index: false, follow: false },
};

export default function ConsultingSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl dark:bg-emerald-950/40">✓</div>
      <h1 className="mt-6 text-3xl font-bold text-gray-950 dark:text-white">咨询需求已提交</h1>
      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">我们会通过你填写的邮箱确认服务范围、周期和报价。提交不会自动扣款，也不会要求你提供账号密码或API密钥。</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/ai-subscription-cost-calculator" className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700">继续核算订阅成本</Link>
        <Link href="/reviews" className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">查看AI工具评测</Link>
      </div>
    </div>
  );
}
