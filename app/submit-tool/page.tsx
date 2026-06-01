import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '提交工具',
  description: '向 AI Tool Hub 提交你认为值得收录的 AI 工具，帮助我们完善工具库。',
  openGraph: {
    title: '提交 AI 工具 | AI Tool Hub',
    description: '推荐你发现的优秀 AI 工具，共建最好的 AI 工具导航。',
  },
};

export default function SubmitToolPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { name: '首页', url: '/' },
          { name: '提交工具', url: '/submit-tool' },
        ]}
      />

      <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
            <span className="text-3xl">📬</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">提交 AI 工具</h1>
          <p className="text-gray-500 dark:text-gray-400">
            发现了优秀的 AI 工具？在这里推荐给我们，审核通过后将收录到工具库。
          </p>
        </div>

        <form
          action="https://formsubmit.co/hello@tools.link.cn"
          method="POST"
          className="space-y-6"
        >
          {/* FormSubmit config */}
          <input type="hidden" name="_subject" value="[AI Tool Hub] 新工具提交" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://tools.link.cn/submit-tool?success=1" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="toolName"
                name="工具名称"
                required
                placeholder="例如：ChatGPT"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="toolUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                官方网站 <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="toolUrl"
                name="官方网站"
                required
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="toolCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              工具分类 <span className="text-red-500">*</span>
            </label>
            <select
              id="toolCategory"
              name="工具分类"
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            >
              <option value="">请选择分类</option>
              <option value="文字生成">文字生成</option>
              <option value="图片生成">图片生成</option>
              <option value="视频生成">视频生成</option>
              <option value="音频/语音">音频/语音</option>
              <option value="编程开发">编程开发</option>
              <option value="设计创意">设计创意</option>
              <option value="效率办公">效率办公</option>
              <option value="SEO营销">SEO营销</option>
            </select>
          </div>

          <div>
            <label htmlFor="toolDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              工具简介 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="toolDescription"
              name="工具简介"
              required
              rows={3}
              placeholder="请用 1-2 句话描述这个工具的核心功能和亮点..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pricingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                定价类型
              </label>
              <select
                id="pricingType"
                name="定价类型"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              >
                <option value="免费">免费</option>
                <option value="免费增值">免费增值</option>
                <option value="付费">付费</option>
              </select>
            </div>

            <div>
              <label htmlFor="priceInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                价格信息
              </label>
              <input
                type="text"
                id="priceInfo"
                name="价格信息"
                placeholder="例如：$20/月、免费"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="submitterNote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              补充说明（可选）
            </label>
            <textarea
              id="submitterNote"
              name="补充说明"
              rows={2}
              placeholder="还有什么想告诉我们的？例如推荐理由、竞品对比..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-all text-base"
            >
              提交审核
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              提交后我们会在 3 个工作日内审核，符合条件的工具将收录到网站。
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
