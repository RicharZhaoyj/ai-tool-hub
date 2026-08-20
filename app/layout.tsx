import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebSiteJsonLd } from '@/components/JsonLd';
import GrowthAnalytics from '@/components/GrowthAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.link.cn'),
  title: {
    default: 'AI工具推荐与评测 2026 | ChatGPT、Midjourney、编程与办公工具',
    template: '%s | AI Tool Hub',
  },
  description: '精选AI工具推荐与真实使用场景，覆盖ChatGPT、Midjourney、编程、设计、视频和办公效率。比较免费与付费方案、价格和适用人群，快速找到合适的AI助手。',
  keywords: ['AI工具', '人工智能', 'ChatGPT', 'Midjourney', 'AI导航', 'AI工具推荐', 'AI工具评测', 'AI工具价格', 'AI工具免费', 'AI tool directory', 'AI tools 2026'],
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://tools.link.cn',
  },
  openGraph: {
    title: 'AI工具推荐与评测 2026 | ChatGPT、Midjourney、编程与办公工具',
    description: '按场景比较精选AI工具的功能、价格和免费方案，快速找到适合你的AI助手。',
    url: 'https://tools.link.cn',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'AI Tool Hub',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AI Tool Hub - tools.link.cn' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具推荐与评测 2026 | ChatGPT、Midjourney、编程与办公工具',
    description: '按场景比较精选AI工具的功能、价格和免费方案，快速找到适合你的AI助手。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WebSiteJsonLd />
        <GrowthAnalytics />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-9GQB6S45PY'} />
      </body>
    </html>
  );
}
