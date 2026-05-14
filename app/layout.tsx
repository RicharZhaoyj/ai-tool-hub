import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'AI Tool Hub — 发现最好的AI工具',
    template: '%s | AI Tool Hub',
  },
  description: '精选全球最优秀的AI工具，涵盖文字生成、图片创作、视频制作、编程开发、效率办公等全场景。找到最适合你的AI助手。',
  keywords: ['AI工具', '人工智能', 'ChatGPT', 'Midjourney', 'AI导航', 'AI工具推荐', 'AI tool directory'],
  openGraph: {
    title: 'AI Tool Hub — 发现最好的AI工具',
    description: '精选全球最优秀的AI工具，涵盖文字、图像、视频、编程等全场景。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'AI Tool Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tool Hub — 发现最好的AI工具',
    description: '精选全球最优秀的AI工具，涵盖文字、图像、视频、编程等全场景。',
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
      </body>
    </html>
  );
}
