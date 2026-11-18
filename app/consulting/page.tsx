import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '人工咨询服务暂停',
  description: '人工咨询服务暂时暂停，目前不接受咨询订单。',
  alternates: { canonical: 'https://tools.link.cn/consulting' },
};

export default function ConsultingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-950 dark:text-white">人工咨询服务暂时暂停</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">人工咨询服务暂时暂停，目前不接受咨询订单。</p>
    </main>
  );
}
