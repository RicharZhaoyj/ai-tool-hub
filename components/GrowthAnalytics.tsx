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
      const explicitEvent = link.getAttribute('data-growth-event');
      if (explicitEvent) {
        window.gtag('event', explicitEvent, {
          event_category: explicitEvent === 'partner_inquiry' || explicitEvent === 'partner_entry_click'
            ? 'partner_revenue_funnel'
            : explicitEvent === 'consulting_intent' || explicitEvent === 'consulting_entry_click'
              ? 'service_revenue_funnel'
            : explicitEvent === 'cost_intent_landing_click'
              ? 'content_growth'
              : 'subscription_cost_funnel',
          site: 'tools',
          placement: link.getAttribute('data-growth-placement') || 'unspecified',
          content_path: window.location.pathname,
          destination: href.startsWith('mailto:') ? 'email' : href,
        });
        return;
      }

      if (window.location.pathname.startsWith('/review/') && href.startsWith('/tool/')) {
        window.gtag('event', 'review_decision_click', {
          event_category: 'review_funnel',
          site: 'tools',
          destination: href,
          placement: link.getAttribute('data-growth-placement') || 'review_tool_choice',
          content_path: window.location.pathname,
        });
        return;
      }

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
          const funnelEvent = destination === 'prompts'
            ? 'prompt_funnel_click'
            : destination === 'tool'
              ? 'ltd_funnel_click'
              : 'sister_site_click';
          window.gtag('event', funnelEvent, {
            event_category: 'cross_site_growth',
            site: 'tools',
            destination,
            placement: link.getAttribute('data-growth-placement') || 'sister_sites',
            content_path: window.location.pathname,
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

