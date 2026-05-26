'use client';

import { useState } from 'react';

interface AffiliateDisclosureProps {
  /** 展示位置：'page-top' 文章顶部横幅 | 'inline' 内联小字 | 'footer' 页脚样式 */
  variant?: 'page-top' | 'inline' | 'footer';
  /** 自定义额外说明 */
  note?: string;
}

export default function AffiliateDisclosure({ variant = 'inline', note }: AffiliateDisclosureProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && variant !== 'footer') return null;

  if (variant === 'inline') {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500 inline-flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        联盟链接
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="text-center px-4 py-3 bg-amber-50/50 dark:bg-amber-950/10 border-t border-amber-100 dark:border-amber-900/30">
        <p className="text-xs text-amber-800 dark:text-amber-300/80 leading-relaxed">
          <strong>🛡️ 广告与联盟披露：</strong>
          本站部分链接为联盟推广链接（Affiliate Link）。
          通过本站链接访问或购买产品，本站可能获得佣金，不会影响你的购买价格。
          所有评测与推荐内容均为独立产出，不受商业合作影响。
          {note && <span className="ml-1 text-amber-700 dark:text-amber-400/70">| {note}</span>}
        </p>
      </div>
    );
  }

  // page-top 默认样式
  return (
    <div className="relative bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/15 dark:to-yellow-950/15 rounded-xl px-4 py-3 mb-6 border border-amber-200/60 dark:border-amber-800/30 text-sm text-amber-900 dark:text-amber-200">
      <div className="flex items-start gap-2.5">
        <span className="text-lg shrink-0 mt-0.5">🛡️</span>
        <div className="flex-1">
          <p className="font-semibold mb-0.5">透明声明</p>
          <p className="text-amber-800 dark:text-amber-300/80 leading-relaxed">
            本文部分工具链接为联盟链接（Affiliate Link）。通过本站链接注册或购买，
            本站可能会获得佣金，但不影响你的购买价格。
            评测内容完全独立，不受广告或赞助影响。
            {note && <span className="block mt-1 opacity-75">{note}</span>}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors p-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30"
          aria-label="关闭提示"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
