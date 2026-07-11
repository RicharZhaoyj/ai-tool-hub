'use client';

import Link from 'next/link';
import { Tool } from '@/lib/types';
import { cn, getPricingBadgeColor, getPricingLabel, getRatingColor, formatPrice } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const pricingBadge = getPricingBadgeColor(tool.pricingType);

  return (
    <Link href={`/tool/${tool.slug}`} className="group block">
      <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-300 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              {tool.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className="text-2xl hidden">{tool.name[0]}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors line-clamp-1">
                {tool.name}
              </h3>
              {tool.nameEn && (
                <p className="text-xs text-gray-400">{tool.nameEn}</p>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 shrink-0">
            {tool.hot && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                🔥 HOT
              </span>
            )}
            {tool.featured && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                ⭐ 精选
              </span>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {tool.tagline}
        </p>

        {tool.recommendationReason && (
          <p className="text-sm text-violet-700 dark:text-violet-300 mb-3 font-medium bg-violet-50 dark:bg-violet-900/20 px-3 py-1.5 rounded-lg">
            💡 {tool.recommendationReason}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Info */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <svg className={cn('w-4 h-4', getRatingColor(tool.rating))} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className={cn('text-sm font-medium', getRatingColor(tool.rating))}>
                  {tool.rating.toFixed(1)}
                </span>
              </div>

              {/* Pricing Badge */}
              <span className={cn('px-2 py-0.5 text-[11px] font-medium rounded-md', pricingBadge.bg, pricingBadge.text)}>
                {getPricingLabel(tool.pricingType)}
              </span>
            </div>

            {/* Price */}
            <span className="text-xs text-gray-400 font-medium">
              {formatPrice(tool.priceFrom || '')}
            </span>
          </div>

          {/* Visit Button */}
          <a
            href={`${tool.officialUrl}?ref=aitoolhub&utm_source=aitoolhub&utm_medium=card&utm_campaign=toolcard`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center py-2 text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            🚀 立即试用 · 免费开始
          </a>
        </div>
      </div>
    </Link>
  );
}
