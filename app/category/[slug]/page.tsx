import { Metadata } from 'next';
import { getToolsByCategory } from '@/data/tools';
import { categories, getCategoryBySlug } from '@/data/categories';
import { notFound } from 'next/navigation';
import CategoryNav from '@/components/CategoryNav';
import ToolGrid from '@/components/ToolGrid';
import Breadcrumb from '@/components/Breadcrumb';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const categoryTools = getToolsByCategory(slug);

  return {
    title: `${category.nameZh}（${category.nameEn}）AI工具推荐`,
    description: `发现最好的${category.nameZh}AI工具，已收录${categoryTools.length}款精选产品。${category.description}`,
    openGraph: {
      title: `${category.nameZh}AI工具推荐 | AI Tool Hub`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(slug);
  const allCategories = categories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ name: `${category.icon} ${category.nameZh}`, url: `/category/${category.slug}` }]}
      />

      {/* Category Header */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${category.color} px-8 py-12 mb-8`}>
        <div className="relative z-10">
          <span className="text-5xl mb-4 block">{category.icon}</span>
          <h1 className="text-3xl font-bold text-white mb-2">{category.nameZh}</h1>
          <p className="text-lg text-white/80">{category.nameEn}</p>
          <p className="text-sm text-white/60 mt-3 max-w-xl">{category.description}</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
      </div>

      {/* Category Nav */}
      <div className="mb-8">
        <CategoryNav />
      </div>

      {/* Tool Count & Sort */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          共 {categoryTools.length} 款工具
        </h2>
      </div>

      {/* Tools Grid */}
      <ToolGrid tools={categoryTools} emptyMessage={`${category.nameZh}分类暂无工具`} />

      {/* Other Categories */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📂 其他分类</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allCategories
            .filter((c) => c.slug !== slug)
            .map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${cat.color} text-white hover:shadow-lg transition-shadow`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.nameZh}</span>
                <span className="text-xs text-white/70">{getToolsByCategory(cat.slug).length} 款</span>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
