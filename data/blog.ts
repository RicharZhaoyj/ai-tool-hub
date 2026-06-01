import { BlogPost } from '@/lib/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'claude-opus-4-8-sonnet-4-8-released',
    title: 'Claude Opus 4.8 + Sonnet 4.8 同周发布：Anthropic 的六月攻势',
    summary: 'Anthropic 在5月底连续发布 Opus 4.8（5/29）和 Sonnet 4.8（5/31），跳过4.7版本号。Opus 4.8 在 SWE-Bench Pro 达69.2%，新增 effort 控制和快速模式2.5倍提速。',
    content: `<p>Anthropic 在 2026 年 5 月底打出了强力组合拳——<strong>Opus 4.8</strong>（5月29日）和 <strong>Sonnet 4.8</strong>（5月31日）在同一周内相继发布。</p>

<h2>Opus 4.8：新一代编程之王</h2>
<p>Opus 4.8 在 SWE-Bench Pro 上达到 69.2%，超越了 GPT-5.5 和 Gemini 3.1 Pro。主要升级包括：</p>
<ul>
<li><strong>Effort 程度控制</strong>：high/extra/max 三档，让用户按需权衡质量与速度</li>
<li><strong>快速模式 2.5 倍提速</strong>：API 定价不变，常规 $5/$25，快速 $10/$50 每百万 token</li>
<li><strong>编程可靠性提升 4 倍</strong>：代码缺憾不加说明的概率降至前代 1/4</li>
<li><strong>亲社会对齐创新高</strong>：安全性指标继续领先</li>
</ul>

<h2>Sonnet 4.8：跳过 4.7 的惊喜</h2>
<p>直接跳过 4.7 版本号的 Sonnet 4.8 支持 1M token 上下文，面向日常对话和轻量编程场景优化。API 定价与之前保持一致。</p>

<h2>战略背景</h2>
<p>这些发布发生在 Anthropic Q2 预计首次运营盈利（$5.59亿，营收$109亿同比+130%）和 Andrej Karpathy 加盟预训练团队的大背景下。6月15日起 Agent SDK 将实行独立计费拆分。</p>`,
    tags: ['Claude', 'Anthropic', 'Opus 4.8', 'Sonnet 4.8', 'AI模型', '编程AI'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readingTime: 5,
    featured: true,
  },
  {
    id: 'b2',
    slug: 'deepseek-v4-1-multimodal-mcp-coming-june',
    title: 'DeepSeek V4.1 预告：首次多模态 + MCP 协议适配',
    summary: '梁文锋宣布 V4.1 将于 6 月发布，首次集成图像+音频多模态理解，深度适配 MCP 协议，支持企业级微调与私有化部署。同时 V4-Pro API 永久降价 75%。',
    content: `<p>DeepSeek 创始人梁文锋在 5 月 26 日正式宣布：<strong>DeepSeek V4.1 将于 6 月发布</strong>，这是 V4 系列的首次重大更新。</p>

<h2>V4.1 核心升级</h2>
<ul>
<li><strong>多模态能力</strong>：首次集成图像理解和音频理解，打破纯文本局限</li>
<li><strong>MCP 协议适配</strong>：深度适配 Model Context Protocol，支持工具调用生态</li>
<li><strong>企业级部署</strong>：支持微调和私有化部署方案</li>
</ul>

<h2>V4-Pro 永久降价 75%</h2>
<p>从 5 月 22 日起，V4-Pro API 永久降至原价 1/4：</p>
<ul>
<li>输入（缓存命中）：¥0.025/百万 token</li>
<li>输入（缓存未命中）：¥3/百万 token</li>
<li>输出：¥6/百万 token</li>
</ul>
<p>这是全球大模型 API 的最低价格，约合 $0.435/$0.84 每百万 token。</p>

<h2>开源生态</h2>
<p>DeepSeek 已组建内部 Harness 代码 Agent 团队（对标 Claude Code），$500 亿估值首轮融资完成。V4 系列采用 MIT 许可证完全开源，是 GPT/Claude/Gemini 之外最值得关注的国产开源替代。</p>`,
    tags: ['DeepSeek', '开源AI', '国产AI', 'V4.1', '多模态', 'MCP', 'API降价'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readingTime: 4,
    featured: true,
  },
  {
    id: 'b3',
    slug: 'github-copilot-token-billing-june-1-effect',
    title: 'GitHub Copilot 6月1日 Token 计费正式生效：开发者必读',
    summary: 'GitHub Copilot 于 6 月 1 日起正式从「按请求计费」转为「按 Token 用量计费」，年付套餐永久停售，免费模型兜底取消。对开发者的实际影响有多大？',
    content: `<p>GitHub Copilot 在 2026 年 6 月 1 日迎来了重大计费变革——<strong>AI Credits 按用量计费正式生效</strong>。</p>

<h2>核心变化</h2>
<ul>
<li><strong>计费模式</strong>：从「按请求次数」全面转为「按 Token 消耗量」</li>
<li><strong>年付套餐停售</strong>：永久停售，已订阅用户继续使用至到期</li>
<li><strong>免费兜底取消</strong>：不再提供免费模型限额兜底</li>
<li><strong>基础价格</strong>：$10/月起，具体费用视 Token 消耗而定</li>
</ul>

<h2>对开发者的影响</h2>
<p>对于轻度使用者，新计费可能降低成本；但对于重度依赖 Copilot Chat、代码审查等高 Token 消耗功能的开发者，月费用可能显著上升。建议开发者：</p>
<ol>
<li>监控自己的 Token 消耗模式</li>
<li>评估是否需要调整使用习惯</li>
<li>考虑 Cursor、Windsurf 等替代方案作为补充</li>
</ol>

<h2>行业趋势</h2>
<p>从按请求到按 Token 的转型是行业大趋势（Google I/O 2026 也宣布了类似变化）。AI 编程工具正在从「无限自助餐」走向「按量付费」，这对精确度要求更高的专业开发者来说未必是坏事。</p>`,
    tags: ['GitHub Copilot', 'AI编程', 'Token计费', '开发者工具', '计费变革'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readingTime: 4,
    featured: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
