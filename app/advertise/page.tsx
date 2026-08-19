import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: '广告与合作',
  description: 'AI Tool Hub 的工具收录、品牌评测、精选推荐和内容合作说明。',
  alternates: { canonical: 'https://tools.link.cn/advertise' },
};

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: '首页', url: '/' }, { name: '广告与合作', url: '/advertise' }]} />
      <article className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">广告与合作</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-7 mb-8">
          我们为 AI 工具团队提供工具收录、真实体验评测、场景化推荐和内容合作。合作内容会明确标注，商业合作不会直接决定编辑推荐结果。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {[
            ['工具收录', '提交产品信息，进入分类目录和搜索入口。'],
            ['产品评测', '围绕功能、价格、适用人群和替代方案制作独立内容。'],
            ['精选推荐', '在相关分类或专题页展示经过核验的产品。'],
            ['内容合作', '围绕 AI 工作流、案例和行业趋势进行联合创作。'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl bg-gray-50 dark:bg-gray-700/40 p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{description}</p>
            </div>
          ))}
        </div>
        <a href="mailto:hello@tools.link.cn?subject=AI%20Tool%20Hub%20合作咨询" className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 transition-colors">
          联系合作团队
        </a>
        <AffiliateDisclosure variant="footer" note="部分工具链接可能包含联盟合作；合作关系不会改变编辑核验标准。" />
      </article>
    </div>
  );
}
