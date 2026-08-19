import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: '关于 AI Tool Hub',
  description: 'AI Tool Hub 的编辑标准、数据更新方式和联盟披露说明。',
  alternates: { canonical: 'https://tools.link.cn/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: '首页', url: '/' }, { name: '关于我们', url: '/about' }]} />
      <article className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 prose prose-gray dark:prose-invert max-w-none">
        <h1>关于 AI Tool Hub</h1>
        <p>AI Tool Hub 是一个面向中文用户的 AI 工具发现和比较平台，帮助个人创作者、小团队和企业更快找到适合自己的工具。</p>
        <h2>我们的编辑标准</h2>
        <ul>
          <li>优先展示有明确产品定位、公开官网和可核验价格的工具。</li>
          <li>工具信息会根据官网、实际体验和用户反馈更新。</li>
          <li>评测会说明适用场景、局限性和可替代方案，不承诺不现实的效果。</li>
          <li>联盟链接或商业合作会明确披露，不以付费直接换取正面评价。</li>
        </ul>
        <h2>数据更新</h2>
        <p>目录数据会持续检查。价格、功能和服务地区可能变化，最终信息以工具官方页面为准。</p>
        <AffiliateDisclosure variant="footer" note="部分工具链接可能带有联盟参数；这不会改变编辑标准或排序逻辑。" />
      </article>
    </div>
  );
}
