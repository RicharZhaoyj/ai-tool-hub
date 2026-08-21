import { Tool } from './types';

export function hasValidAffiliateUrl(tool: Tool): boolean {
  return Boolean(
    tool.affiliateUrl &&
    !tool.affiliateUrl.includes('YOUR_ID') &&
    !tool.affiliateUrl.includes('XXXXX')
  );
}

/** Return the actual monetization destination, without inventing an affiliate URL. */
export function getToolOutboundUrl(tool: Tool): string {
  if (hasValidAffiliateUrl(tool)) {
    return tool.affiliateUrl as string;
  }

  const url = new URL(tool.officialUrl);
  url.searchParams.set('ref', 'aitoolhub');
  url.searchParams.set('utm_source', 'aitoolhub');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'toolcard');
  return url.toString();
}

