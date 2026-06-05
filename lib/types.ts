// 工具数据类型定义

export interface Tool {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  tagline: string;
  description: string;
  category: string; // Category slug
  tags: string[];
  logoUrl: string;
  screenshots?: string[];
  pricingType: 'free' | 'freemium' | 'paid';
  priceFrom?: string;
  affiliateUrl?: string;
  officialUrl: string;
  rating: number;
  featured: boolean;
  hot: boolean;
  createdAt: string;
  updatedAt: string;
  recommendationReason?: string; // 推荐理由 / 使用场景
}

export interface Category {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
}

// 评测文章类型定义
export interface Review {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string; // SEO描述, 150-160字符
  content: ReviewSection[]; // 评测章节内容
  tools: string[]; // 涉及的工具slug列表
  category: string; // 主分类
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  recommendationReason?: string; // 推荐理由 / 使用场景
  readingTime: number; // 阅读时间(分钟)
  featured: boolean;
}

export interface ReviewSection {
  type: 'heading' | 'text' | 'comparison-table' | 'pros-cons' | 'verdict' | 'pricing-table' | 'callout';
  level?: 1 | 2 | 3; // heading级别
  title?: string;
  content?: string;
  rows?: { tool: string; values: (string | number)[] }[]; // comparison table
  headers?: string[]; // comparison table headers
  pros?: string[];
  cons?: string[];
  toolName?: string; // pros-cons对应的工具名
  verdicts?: { persona: string; recommendation: string; reason: string }[];
  calloutType?: 'tip' | 'warning' | 'info';
}

// 博客文章类型定义
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // HTML或Markdown内容
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  recommendationReason?: string; // 推荐理由 / 使用场景
  readingTime: number;
  featured: boolean;
}
