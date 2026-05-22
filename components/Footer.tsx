import Link from 'next/link';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';

export default function Footer() {
  // 计算最新工具更新时间
  const latestUpdate = tools.reduce((max, t) => {
    const d = new Date(t.updatedAt).getTime();
    return d > max ? d : max;
  }, 0);
  const latestUpdateStr = new Date(latestUpdate).toISOString().slice(0, 10);
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Tool<span className="text-violet-600">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              发现最好的AI工具，提升你的工作效率。我们精选并评测全球最优秀的AI产品，帮你找到最适合的工具。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              工具分类
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {cat.icon} {cat.nameZh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              快速链接
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">热门工具</Link></li>
              <li><Link href="/?sort=featured" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">精选推荐</Link></li>
              <li><Link href="/?pricing=free" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">免费工具</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              关于
            </h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-gray-500">提交工具</span></li>
              <li><span className="text-sm text-gray-500">广告合作</span></li>
              <li><span className="text-sm text-gray-500">关于我们</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} AI Tool Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">
              数据更新于 {latestUpdateStr}
            </span>
            <span className="text-xs text-gray-400">
              ⚡ 用 AI 驱动，为效率而生
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
