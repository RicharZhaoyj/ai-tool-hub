'use client';

import { useEffect } from 'react';

const SISTER_SITES: Record<string, string> = {
  'ai.link.cn': 'ai',
  'tool.link.cn': 'tool',
  'prompts.link.cn': 'prompts',
  'signal.link.cn': 'signal',
};

export default function GrowthAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest('a[href]') : null;
      if (!link || typeof window.gtag !== 'function') return;

      const href = link.getAttribute('href') || '';
      if (href.startsWith('/review/') || href.startsWith('/blog/') || href.startsWith('/category/')) {
        window.gtag('event', 'content_click', {
          event_category: 'content_growth',
          site: 'tools',
          content_type: href.startsWith('/review/') ? 'review' : href.startsWith('/blog/') ? 'blog' : 'category',
          content_path: href,
        });
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        const destination = SISTER_SITES[url.hostname];
        if (destination) {
          window.gtag('event', 'sister_site_click', {
            event_category: 'cross_site_growth',
            site: 'tools',
            destination,
            placement: 'sister_sites',
          });
        }
      } catch {
        // Ignore malformed or non-navigation href values.
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
