'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import ToolGrid from '@/components/ToolGrid';
import { tools, getFeaturedTools, getHotTools, searchTools, getToolsByCategory } from '@/data/tools';
import { categories } from '@/data/categories';

type SortType = 'default' | 'rating' | 'newest' | 'hot';

function HomePageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category');
  const [sort, setSort] = useState<SortType>('default');

  const filteredTools = useMemo(() => {
    let result: typeof tools;

    if (query) {
      result = searchTools(query);
    } else if (categoryParam) {
      result = getToolsByCategory(categoryParam);
    } else {
      result = tools;
    }

    // Sort
    switch (sort) {
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...result].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'hot':
        return [...result].filter(t => t.hot || t.featured);
      default:
        return result;
    }
  }, [query, categoryParam, sort]);

  const featuredTools = useMemo(() => getFeaturedTools(), []);
  const hotTools = useMemo(() => getHotTools(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero + Search */}
      <HeroSection />
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Category Nav */}
      <div className="mb-8">
        <CategoryNav />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {query
            ? `搜索结果：${query}（${filteredTools.length}个）`
            : categoryParam
            ? (() => {
                const cat = categories.find(c => c.slug === categoryParam);
                return cat ? `${cat.icon} ${cat.nameZh}（${filteredTools.length}个）` : '所有工具';
              })()
            : '所有工具'}
        </h2>

        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="default">默认排序</option>
            <option value="rating">评分最高</option>
            <option value="newest">最新更新</option>
            <option value="hot">热门优先</option>
          </select>
        </div>
      </div>

      {/* Tool Grid */}
      <ToolGrid tools={filteredTools} emptyMessage={`未找到与"${query}"相关的工具`} />

      {/* Featured Section (when no query) */}
      {!query && !categoryParam && sort === 'default' && (
        <>
          {/* Hot Tools */}
          {hotTools.length > 0 && (
            <section className="mt-16" id="hot-tools">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">🔥 热门工具</h2>
                <span className="text-sm text-gray-400">大家都在用</span>
              </div>
              <ToolGrid tools={hotTools.slice(0, 6)} />
            </section>
          )}

          {/* Featured Tools */}
          {featuredTools.length > 0 && (
            <section className="mt-16" id="featured-tools">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">⭐ 精选推荐</h2>
                <span className="text-sm text-gray-400">编辑严选</span>
              </div>
              <ToolGrid tools={featuredTools} />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block w-8 h-8 border-3 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">加载中...</p>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
