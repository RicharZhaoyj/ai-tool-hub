import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export const metadata: Metadata = {
  title: 'AI工具收录、资料页增强与场景合作报价',
  description: 'AI Tool Hub 面向 AI 产品团队提供免费基础收录、资料核验与产品页增强、明确标注的场景内容合作；商业合作不影响编辑排序。',
  alternates: { canonical: 'https://tools.link.cn/advertise' },
};

export default function AdvertisePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: '首页', url: '/' }, { name: '广告与合作', url: '/advertise' }]} />
      <article className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">AI 产品团队合作入口</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white mb-4">工具收录、资料页增强与场景合作</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-7 mb-8">
          我们为 AI 工具团队提供公开资料收录、事实核验、产品页增强和场景化内容合作。所有付费合作会明确标注；付费不购买正面评价、排名或虚构体验。
        </p>
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">基础收录</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥0</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-6">提交官网、功能、价格和适用场景。通过基本真实性与站点质量审核后进入候选库，不保证收录时点和排名。</p>
            <a href="/submit-tool" className="mt-5 inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300">提交工具资料 →</a>
          </section>
          <section className="rounded-2xl border border-violet-200 bg-violet-50/60 p-5 dark:border-violet-800 dark:bg-violet-950/20">
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">资料核验与产品页增强</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥499 / 次</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-6">核对官网信息、价格、适用人群和关键限制，完善现有资料页并提供一次事实性修改。付费不影响评分或推荐顺序。</p>
            <a href="mailto:hello@tools.link.cn?subject=AI工具资料页增强合作" data-growth-event="partner_inquiry" data-growth-placement="advertise_profile_package" className="mt-5 inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300">咨询资料页增强 →</a>
          </section>
          <section className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-5 dark:border-cyan-800 dark:bg-cyan-950/20">
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">场景内容合作</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">¥1,999 起</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-6">围绕真实工作流制作明确标注的合作内容，包含需求访谈、事实核验、独立披露和上线后基础流量报告。</p>
            <a href="mailto:hello@tools.link.cn?subject=AI工具场景内容合作" data-growth-event="partner_inquiry" data-growth-placement="advertise_content_package" className="mt-5 inline-flex text-sm font-semibold text-cyan-700 hover:text-cyan-900 dark:text-cyan-300">咨询场景合作 →</a>
          </section>
        </div>
        <section className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">合作边界</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-600 dark:text-gray-400 sm:grid-cols-2">
            <li>• 付费内容明确标注合作关系</li>
            <li>• 不出售排名、星级或保证性结论</li>
            <li>• 关键价格和功能以官方资料为准</li>
            <li>• 可拒绝高风险、误导或无法核验的产品</li>
          </ul>
        </section>
        <a href="mailto:hello@tools.link.cn?subject=AI%20Tool%20Hub%20合作咨询" data-growth-event="partner_inquiry" data-growth-placement="advertise_primary_cta" className="mt-8 inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 transition-colors">
          联系合作团队 →
        </a>
        <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">请在邮件中附产品官网、目标用户、希望合作的内容和可核验资料。报价为首批验证价，复杂项目会在执行前单独确认范围。</p>
        <AffiliateDisclosure variant="footer" note="部分工具链接可能包含联盟合作；合作关系不会改变编辑核验标准。" />
      </article>
    </div>
  );
}
