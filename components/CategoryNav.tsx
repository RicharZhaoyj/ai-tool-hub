import { categories } from '@/data/categories';
import Link from 'next/link';

export default function CategoryNav() {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max px-1 py-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 shadow-sm"
        >
          🔥 全部
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap bg-white dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700`}
          >
            <span>{cat.icon}</span>
            {cat.nameZh}
          </Link>
        ))}
      </div>
    </div>
  );
}
