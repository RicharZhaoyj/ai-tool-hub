import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mb-8">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          页面未找到
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          很抱歉，您访问的页面不存在或已被移除。试试搜索你想找的 AI 工具？
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-violet-500/25"
        >
          返回首页
        </Link>
        <Link
          href="/?q="
          className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 transition-colors"
        >
          浏览所有工具
        </Link>
      </div>

      <div className="mt-16">
        <p className="text-sm text-gray-400">
          如果你认为这是系统错误，请联系我们。
        </p>
      </div>
    </div>
  );
}
