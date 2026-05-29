import Script from 'next/script';

/**
 * JSON-LD 结构化数据组件
 * 用于 SEO，帮助搜索引擎更好理解页面内容
 */

// 首页 — WebSite
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tool Hub',
    url: 'https://tools.link.cn',
    description: '精选全球最优秀的AI工具，涵盖文字生成、图片创作、视频制作、编程开发等全场景。',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tools.link.cn/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 工具详情 — SoftwareApplication
export function SoftwareAppJsonLd({
  name,
  description,
  url,
  logoUrl,
  priceFrom,
  rating,
  pricingType,
}: {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  priceFrom?: string;
  rating: number;
  pricingType: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: description.slice(0, 300),
    url,
    image: logoUrl,
    offers: {
      '@type': 'Offer',
      price: pricingType === 'free' ? '0' : (priceFrom || '0'),
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(rating * 100),
    },
  };

  return (
    <Script
      id={`software-${name}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 评测文章 — Article
export function ArticleJsonLd({
  title,
  description,
  url,
  author,
  publishedAt,
  updatedAt,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl?: string;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedAt,
    dateModified: updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'AI Tool Hub',
      url: 'https://tools.link.cn',
    },
    inLanguage: 'zh-CN',
  };

  if (imageUrl) {
    data.image = imageUrl;
  }

  return (
    <Script
      id={`article-${title.slice(0, 20)}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 面包屑 — BreadcrumbList
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
