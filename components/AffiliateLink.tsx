'use client';

import { useState } from 'react';
import { Tool } from '@/lib/types';

interface AffiliateLinkProps {
  tool: Tool;
}

export default function AffiliateLink({ tool }: AffiliateLinkProps) {
  const [clicked, setClicked] = useState(false);

  // 构建最终跳转链接：优先用联盟链接，否则用官网链接
  const getTargetUrl = (): string => {
    if (tool.affiliateUrl && !tool.affiliateUrl.includes('YOUR_ID') && !tool.affiliateUrl.includes('XXXXX')) {
      // 有效联盟链接：拼接目标网址
      return tool.affiliateUrl + encodeURIComponent(tool.officialUrl);
    }
    // 无效或未配置联盟链接 → 直接跳官网（带 UTM 追踪）
    const url = new URL(tool.officialUrl);
    url.searchParams.set('ref', 'aitoolhub');
    url.searchParams.set('utm_source', 'aitoolhub');
    url.searchParams.set('utm_medium', 'referral');
    return url.toString();
  };

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <a
      href={getTargetUrl()}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg active:scale-[0.98] ${
        clicked
          ? 'bg-green-500 text-white shadow-green-500/30'
          : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-violet-500/25'
      }`}
    >
      {clicked ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          正在跳转...
        </>
      ) : (
        <>
          🚀 访问官网
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </>
      )}
    </a>
  );
}
