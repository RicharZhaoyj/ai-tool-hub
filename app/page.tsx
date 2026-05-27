'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import ToolGrid from '@/components/ToolGrid';
import { tools, getFeaturedTools, getHotTools, searchTools, getToolsByCategory } from '@/data/tools';
import { categories } from '@/data/categories';
import Link from 'next/link';

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

          {/* Reviews Section */}
          <section className="mt-16" id="reviews">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">📝 深度评测</h2>
                <span className="text-sm text-gray-400">真实体验 + 数据对比</span>
              </div>
              <Link href="/reviews" className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-1">
                查看全部
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            {/* Latest reviews - inline preview since page is 'use client' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/review/midjourney-vs-gpt-image-2-vs-flux-2026" className="group block bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200 dark:border-purple-800 p-6 hover:border-purple-400 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">NEW</span>
                  <span className="text-xs text-gray-400">11 min read</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">Midjourney V8.1 vs GPT Image 2 vs Flux：2026 AI绘画三巨头全面升级</h3>
                <p className="text-sm text-gray-500 mb-3">V8.1提速5倍、GPT Image 2文字渲染封神、FLUX.2开源称王——谁是最强AI绘画工具？</p>
                <div className="flex gap-2">
                  {['Midjourney', 'GPT Image 2', 'Flux'].map(t => (<span key={t} className="px-2 py-0.5 text-xs bg-white/80 dark:bg-gray-800/80 text-gray-600 rounded">{t}</span>))}
                </div>
              </Link>
              <Link href="/review/bolt-vs-lovable-ai-app-builder-2026" className="group block bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 hover:border-emerald-400 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">热门</span>
                  <span className="text-xs text-gray-400">10 min read</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">Bolt vs Lovable：2026 AI全栈应用构建器终极对决</h3>
                <p className="text-sm text-gray-500 mb-3">Vibe Coding时代，一个为开发者而生，一个让创始人一夜成为全栈工程师</p>
                <div className="flex gap-2">
                  {['Bolt', 'Lovable'].map(t => (<span key={t} className="px-2 py-0.5 text-xs bg-white/80 dark:bg-gray-800/80 text-gray-600 rounded">{t}</span>))}
                </div>
              </Link>
            </div>
          </section>
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
