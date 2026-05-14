/**
 * 工具函数
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: string): string {
  if (price === '免费') return '免费';
  return price;
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.7) return 'text-green-500';
  if (rating >= 4.3) return 'text-yellow-500';
  return 'text-orange-400';
}

export function getPricingBadgeColor(type: string): {
  bg: string;
  text: string;
} {
  switch (type) {
    case 'free':
      return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' };
    case 'freemium':
      return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' };
    case 'paid':
      return { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700' };
  }
}

export function getPricingLabel(type: string): string {
  switch (type) {
    case 'free': return '免费';
    case 'freemium': return '免费增值';
    case 'paid': return '付费';
    default: return type;
  }
}
