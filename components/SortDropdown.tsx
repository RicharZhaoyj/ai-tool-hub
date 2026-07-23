'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SortType = 'default' | 'rating' | 'newest' | 'hot';

export default function SortDropdown({ currentQuery = '', currentCategory = '' }: { currentQuery?: string; currentCategory?: string }) {
  const router = useRouter();
  const [sort, setSort] = useState<SortType>('default');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortType;
    setSort(value);

    const params = new URLSearchParams();
    if (currentQuery) params.set('q', currentQuery);
    if (currentCategory) params.set('category', currentCategory);
    if (value !== 'default') params.set('sort', value);
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  };

  return (
    <select
      value={sort}
      onChange={handleChange}
      className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 focus:outline-none focus:border-violet-500 cursor-pointer"
    >
      <option value="default">默认排序</option>
      <option value="rating">评分最高</option>
      <option value="newest">最新收录</option>
      <option value="hot">热门优先</option>
    </select>
  );
}
