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
