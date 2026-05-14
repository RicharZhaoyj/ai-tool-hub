import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: '*.wikipedia.org' },
      { protocol: 'https', hostname: 'www.anthropic.com' },
      { protocol: 'https', hostname: 'perplexity.ai' },
      { protocol: 'https', hostname: 'www.perplexity.ai' },
      { protocol: 'https', hostname: 'www.midjourney.com' },
      { protocol: 'https', hostname: 'openaiprod.blob.core.windows.net' },
      { protocol: 'https', hostname: 'stability.ai' },
      { protocol: 'https', hostname: 'dev.blackforestlabs.ai' },
      { protocol: 'https', hostname: 'runwayml.com' },
      { protocol: 'https', hostname: 'klingai.com' },
      { protocol: 'https', hostname: 'elevenlabs.io' },
      { protocol: 'https', hostname: 'suno.com' },
      { protocol: 'https', hostname: 'www.udio.com' },
      { protocol: 'https', hostname: 'cursor.com' },
      { protocol: 'https', hostname: 'github.githubassets.com' },
      { protocol: 'https', hostname: 'codeium.com' },
      { protocol: 'https', hostname: 'bolt.new' },
      { protocol: 'https', hostname: 'www.canva.com' },
      { protocol: 'https', hostname: 'gamma.app' },
      { protocol: 'https', hostname: 'static.figma.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'www.jasper.ai' },
      { protocol: 'https', hostname: 'motionit.ai' },
      { protocol: 'https', hostname: 'surferseo.com' },
      { protocol: 'https', hostname: 'www.semrush.com' },
    ],
  },
};

export default nextConfig;
