'use client';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      const btn = document.getElementById('copy-link-btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = original; }, 2000);
      }
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400 mr-1">分享：</span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-500 hover:text-[#1DA1F2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        title="分享到 X (Twitter)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Weibo */}
      <a
        href={`https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-500 hover:text-[#E6162D] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        title="分享到微博"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.821.985.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.307-.361-.164-.585.138-.227.436-.34.672-.24.239.09.317.36.181.572zm.176-2.719c-1.893-.494-4.039.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.642 4.318-.341 5.1-2.138.774-1.763-.145-3.71-2.129-4.19zm7.563-1.224c-.346-.105-.583-.178-.403-.644.394-1.016.435-1.89.008-2.516-.798-1.187-2.988-1.124-5.508-.032 0 0-.788.345-.587-.281.387-1.24.329-2.276-.273-2.873-1.365-1.354-4.992.052-8.089 3.148C.486 11.667-.485 14.37.218 15.577 1.74 18.165 7.04 18.72 11.553 16.798c.007-.003.015-.007.022-.01 1.237-.534 1.962-1.11 1.962-1.11-.09-.126-.185-.264-.271-.403-.789-1.27-.582-2.691.276-3.571.859-.88 2.21-.974 3.016-.212.332.312.49.682.553 1.066.248-.183.517-.355.805-.515.371-.205.608-.341.476-.157z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        id="copy-link-btn"
        onClick={handleCopy}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        title="复制链接"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
    </div>
  );
}
