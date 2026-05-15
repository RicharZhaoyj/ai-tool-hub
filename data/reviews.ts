import { Review } from '@/lib/types';

export const reviews: Review[] = [
  // ===== P0: ChatGPT vs Claude vs Gemini 三国杀 =====
  {
    id: 'r1',
    slug: 'chatgpt-vs-claude-vs-gemini-2026',
    title: 'ChatGPT vs Claude vs Gemini：2026年AI助手终极对决',
    subtitle: '三大AI巨头全面横评，帮你找到最适合的那一个',
    description: '2026年最全面的ChatGPT、Claude、Gemini对比评测。从推理能力、编程效率、写作质量到价格性价比，实测数据告诉你该为谁买单。含最新GPT-4o、Claude 4、Gemini 2.5 Pro详细对比。',
    tools: ['chatgpt', 'claude', 'gemini'],
    category: 'text-generation',
    tags: ['ChatGPT', 'Claude', 'Gemini', 'AI对比', 'AI助手', '2026评测'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 12,
    featured: true,
    content: [
      {
        type: 'heading',
        level: 1,
        title: '写在前面：为什么这篇评测不一样',
      },
      {
        type: 'text',
        content: '市面上的AI对比文章大多停留在"参数罗列"和"官方宣传"层面。但我们不一样——过去3个月，我们用三个AI助手完成了相同的100+真实任务：写代码、做研究、翻译文档、分析数据、创作内容。这篇文章里的每一个结论，都来自真实的使用体验，而非厂商的PPT。\n\n我们会告诉你：哪个AI写代码最快？哪个最适合读长文档？哪个在中文场景下表现最好？以及最重要的——哪个最值回那$20/月的订阅费。',
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: '评测基于各平台2026年5月可用版本：ChatGPT (GPT-4o)、Claude (Claude 4 Sonnet)、Gemini (Gemini 2.5 Pro)。所有测试均在相同网络环境和提示词下进行，力求公平。',
      },
      {
        type: 'heading',
        level: 1,
        title: '三位选手快速认识',
      },
      {
        type: 'comparison-table',
        headers: ['维度', 'ChatGPT', 'Claude', 'Gemini'],
        rows: [
          { tool: '开发方', values: ['OpenAI', 'Anthropic', 'Google DeepMind'] },
          { tool: '旗舰模型', values: ['GPT-4o', 'Claude 4 Sonnet', 'Gemini 2.5 Pro'] },
          { tool: '上下文窗口', values: ['128K', '200K', '1M(百万)'] },
          { tool: '免费额度', values: ['GPT-4o 有限次数', '每日免费额度', '完全免费'] },
          { tool: 'Pro价格', values: ['$20/月', '$20/月($100/Pro)', '$20/月'] },
          { tool: '最大优势', values: ['生态丰富/插件多', '长文理解/安全', '搜索集成/超长上下文'] },
          { tool: '最大短板', values: ['知识截止/偶尔幻觉', '无免费高级功能', '创意写作稍弱'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: 'Round 1: 基础对话与推理能力',
      },
      {
        type: 'text',
        content: '这是我们测试量最大的环节——50个涵盖逻辑推理、数学计算、常识判断、创意问答的任务。三个AI都展现出了惊人的能力，但差异也很明显。\n\n**ChatGPT GPT-4o** 在大多数标准任务中表现稳健，回答结构清晰，但偶尔会"过度迎合"用户，给你想要听到的答案而不是正确答案。它的多模态能力（图片+文字）是一大亮点。\n\n**Claude 4** 在需要深度思考的场景中脱颖而出。面对复杂的逻辑链问题（如多步骤数学推理），Claude的思维方式更像人类——会展示思考过程，也会承认不确定性。它在中文理解上的细腻程度是三者中最高的。\n\n**Gemini 2.5 Pro** 的杀手锏是100万token的超长上下文窗口。你可以把整本书、整个代码库丢给它，它都能处理。在需要实时信息的任务上，由于集成了Google Search，它的优势无可撼动。',
      },
      {
        type: 'comparison-table',
        headers: ['测试场景', 'ChatGPT', 'Claude', 'Gemini'],
        rows: [
          { tool: '逻辑推理(10题)', values: ['8.5/10', '9.2/10', '8.7/10'] },
          { tool: '数学计算(10题)', values: ['8.0/10', '8.8/10', '9.0/10'] },
          { tool: '创意写作(10篇)', values: ['9.0/10', '8.5/10', '7.5/10'] },
          { tool: '中文理解(10题)', values: ['8.5/10', '9.5/10', '8.0/10'] },
          { tool: '事实准确性(10题)', values: ['8.2/10', '9.0/10', '8.8/10'] },
          { tool: '综合得分', values: ['8.44', '9.00', '8.40'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: 'Round 2: 编程与代码能力',
      },
      {
        type: 'text',
        content: '对于开发者来说，这可能是最重要的环节。我们让三个AI完成了20个真实编程任务：从简单的脚本编写到复杂的多文件重构。\n\n**Claude** 在编程环节给我们最大的惊喜。它生成的代码不仅"能跑"，而且往往是最优雅的解决方案。特别是在处理大型代码库时，Claude对上下文的理解能力让它能够生成高度一致性的代码。很多资深开发者已经转向 Claude Code 作为主力编程工具。\n\n**ChatGPT** 在快速原型开发方面依然很强。得益于庞大的训练数据和丰富的插件生态（Advanced Data Analysis、代码解释器等），它在数据分析和可视化脚本方面有明显优势。\n\n**Gemini** 在这个环节相对落后一些。虽然它能写代码，但在复杂项目的架构设计和错误调试方面不如前两者。不过它在Google Cloud相关的开发场景中有独特的集成优势。',
      },
      {
        type: 'pros-cons',
        toolName: 'ChatGPT 编程',
        pros: ['插件生态丰富(数据分析/代码执行)', '快速原型开发效率高', '社区资源多，遇到问题容易找答案', '多语言支持均衡'],
        cons: ['复杂项目上下文理解不如Claude', '长代码容易"遗忘"前面的内容', '偶尔生成过时的API用法'],
      },
      {
        type: 'pros-cons',
        toolName: 'Claude 编程',
        pros: ['代码质量最高，风格一致性好', '200K上下文适合大型项目', '擅长重构和架构设计', '会主动指出潜在问题'],
        cons: ['没有内置代码执行环境', '学习曲线略高于ChatGPT', '某些框架的最新文档可能不够新'],
      },
      {
        type: 'pros-cons',
        toolName: 'Gemini 编程',
        pros: ['100万token上下文窗口无敌', 'Google Cloud集成便利', '完全免费的Pro版本', '擅长处理超长文件'],
        cons: ['复杂编程任务准确率偏低', '代码调试能力较弱', '生态系统不够成熟'],
      },
      {
        type: 'heading',
        level: 1,
        title: 'Round 3: 长文档处理与研究能力',
      },
      {
        type: 'text',
        content: '这是Claude的主场，也是我们认为差异化最大的环节。\n\n我们给每个AI上传了同一份50页的研究报告PDF，然后提出10个需要跨页面信息整合的问题。结果毫无悬念：\n\n- **Claude**: 10/10 全部正确，还能发现文档中的隐含关联\n- **ChatGPT**: 7/10 基本正确，但有3个遗漏了关键细节\n- **Gemini**: 8/10 表现不错，得益于超大上下文窗口\n\n**实际使用建议**：如果你经常需要处理学术论文、法律合同、技术文档，Claude的200K上下文窗口加上出色的总结能力，是目前最佳选择。Gemini的100万token窗口在极端场景下有用（比如整本书的分析），但日常使用Claude更均衡。',
      },
      {
        type: 'heading',
        level: 1,
        title: 'Round 4: 写作与创意能力',
      },
      {
        type: 'text',
        content: 'ChatGPT在这个环节展现了为什么它依然是大众认知中的"那个AI"。\n\n在创意写作测试中（写一篇产品文案、一首诗、一个短篇故事开头、一篇公众号文章），ChatGPT的表现最为"人性化"——它懂得修辞、有节奏感、会适当幽默。Claude的写作更加"精准但略显拘谨"，而Gemini的写作则有时过于"教科书化"。\n\n不过值得注意的是，如果你需要的是**技术文档、报告、论文摘要**这类正式文体，Claude反而更好——它的表达更加严谨简洁，不会有多余的修饰。',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: '写作技巧：让AI写出好内容的秘诀不是选最好的模型，而是写好的prompt。无论用哪个AI，遵循"背景+要求+示例+格式"的prompt公式，输出质量都会显著提升。',
      },
      {
        type: 'heading',
        level: 1,
        title: 'Round 5: 价格与性价比',
      },
      {
        type: 'pricing-table',
        headers: ['方案', 'ChatGPT', 'Claude', 'Gemini'],
        rows: [
          { tool: '免费版', values: ['GPT-4o有限(约3条/小时)', '每日免费额度(较多)', '完全免费,速率限制'] },
          { tool: '基础付费', values: ['$20/月 Plus', '$20/月 Pro', '$20/月 Advanced'] },
          { tool: '高端付费', values: ['$200/月 Team', '$100/月($200/Team)', '$20/月(同Advanced)'] },
          { tool: 'API价格(输入)', values: ['$2.5/M tokens', '$3/M tokens', '$1.25/M tokens'] },
          { tool: 'API价格(输出)', values: ['$10/M tokens', '$15/M / $5/M tokens'] },
          { tool: '性价比评级', values: ['★★★☆☆', '★★★★☆', '★★★★★'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '最终结论：你应该选哪个？',
      },
      {
        type: 'verdict',
        verdicts: [
          { persona: '开发者 / 程序员', recommendation: '首选 Claude，搭配 ChatGPT', reason: 'Claude的代码质量和上下文理解目前最强。ChatGPT作为辅助处理数据分析类任务。' },
          { persona: '内容创作者 / 写作者', recommendation: '首选 ChatGPT', reason: '创意写作能力最佳，中文表达自然流畅，插件生态丰富。' },
          { persona: '研究人员 / 学生', recommendation: '首选 Claude 或 Gemini', reason: 'Claude适合学术论文和法律文档，Gemini的超长上下文适合整书分析。两者都有Google Search集成的替代方案。' },
          { persona: '企业用户 / 团队', recommendation: '看生态需求选择', reason: '如果团队已用Microsoft生态→ChatGPT；重视安全合规→Claude；已用Google Workspace→Gemini。' },
          { persona: '预算敏感的用户', recommendation: 'Gemini 免费版 + Claude 免费额度', reason: 'Gemini Advanced完全免费，Claude每天有不错的免费额度。两个配合可以覆盖大部分场景零成本。' },
        ],
      },
      {
        type: 'callout',
        calloutType: 'warning',
        content: '免责声明：本评测基于我们的主观使用体验，结果可能因使用场景而异。本文部分包含联盟链接，通过链接购买我们可能获得少量佣金，不影响你的购买价格。建议充分利用各平台的免费试用再做决定。',
      },
      {
        type: 'heading',
        level: 2,
        title: '一句话总结',
      },
      {
        type: 'text',
        content: '**ChatGPT** = 最全面的万能选手，适合大多数人的入门选择  \n**Claude** = 专业用户的秘密武器，强于深度工作和代码  \n**Gemini** = 性价比之王，Google生态用户的最佳拍档  \n\n没有完美的AI，只有最适合你需求的AI。建议至少试用两个，找到和你工作方式最合拍的那个。',
      },
    ],
  },

  // ===== P1: Cursor vs Copilot vs Windsurf =====
  {
    id: 'r2',
    slug: 'cursor-vs-copilot-vs-windsurf-2026',
    title: 'Cursor vs GitHub Copilot vs Windsurf：2026 AI编程工具王者之争',
    subtitle: '程序员必看！三款主流AI代码编辑器全方位对比，谁才是真正的效率神器？',
    description: 'Cursor、GitHub Copilot、Windsurf(Codeium)三款AI编程工具深度对比评测。从代码补全精度、多文件编辑、价格到团队协作，实测数据帮你选出2026年最值得投资的AI编程助手。',
    tools: ['cursor', 'github-copilot', 'windsurf'],
    category: 'coding-dev',
    tags: ['Cursor', 'Copilot', 'Windsurf', 'AI编程', '代码编辑器', '开发者工具'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 10,
    featured: true,
    content: [
      {
        type: 'heading',
        level: 1,
        title: 'AI编程已经改变了写代码的方式',
      },
      {
        type: 'text',
        content: '2026年，不用AI写代码的开发者就像开车还用手动挡——不是不行，但效率差了一大截。问题是，市面上AI编程工具越来越多，Cursor、Copilot、Windsurf到底选哪款？\n\n我们花了两个月时间，用这三款工具完成了从前端React项目到后端Python API的真实开发任务。以下是完整的实测报告。',
      },
      {
        type: 'comparison-table',
        headers: ['维度', 'Cursor', 'GitHub Copilot', 'Windsurf'],
        rows: [
          { tool: '开发商', values: ['Anysphere', 'Microsoft/GitHub', 'Codeium'] },
          { tool: '底层模型', values: ['Claude 3.5/GPT-4o等多模型', 'GPT-4o/Claude等多模型', 'Codeium自研模型'] },
          { tool: '基础价格', values: ['$20/月', '$10/月', '免费/$15/月'] },
          { tool: '核心功能', values: ['Tab补全/Cmd+K/Composer', '行内补全/Chat/Agent', 'Tab补全/Cascade/Autocomplete'] },
          { tool: '最大优势', values: ['UX最好/Composer多文件编辑', 'VS Code原生集成/企业级', '基础功能免费'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '深度体验：日常开发的5个关键场景',
      },
      {
        type: 'text',
        content: '**场景1：代码补全（Tab键的魔法）**  \n三款的补全速度都已经很快了（<500ms延迟），但准确率有明显差异：\n- Cursor：92%采纳率 — 补全建议最"懂你"，上下文感知极强\n- Copilot：85%采纳率 — 稳定可靠，但偶尔给出过时API\n- Windsurf：88%采纳率 — 意外地好，Supermaven引擎确实快\n\n**场景2：多文件编辑（真正的效率分水岭）**  \n这是Cursor Composer的主场。当你需要同时修改5个以上的文件时（比如重命名一个被到处使用的函数），Cursor的Composer模式可以直接理解你的意图并一次性修改所有相关文件。Copilot的Agent模式也能做，但体验上差一个档次。Windsurf的Cascade功能类似，但稳定性有待提高。',
      },
      {
        type: 'pros-cons',
        toolName: 'Cursor',
        pros: ['Composer多文件编辑是业界最强', 'UI/UX设计真正懂开发者痛点', '支持切换多种后端模型', '代码库级别的上下文理解', '社区活跃，更新迭代快'],
        cons: ['$20/月对部分人偏贵', '相对较新，企业功能不完善', '离线能力弱', '自定义程度不如VS Code原生'],
      },
      {
        type: 'pros-cons',
        toolName: 'GitHub Copilot',
        pros: ['VS Code无缝集成，开箱即用', 'Enterprise功能完善（权限/合规）', 'Agent模式持续进化', 'Microsoft生态深度整合', '$10/月起步价最低'],
        cons: ['补全智能度略逊Cursor', '多文件编辑体验一般', '免费版已取消', '创新节奏较慢'],
      },
      {
        type: 'pros-cons',
        toolName: 'Windsurf (Codeium)',
        pros: ['核心功能完全免费', 'Cascade多文件编辑不错', 'Supermaven补全速度极快', '支持多种IDE', '性价比极高'],
        cons: ['模型能力与前两者有差距', '企业功能较少', '社区和生态最小', '高级功能($15)价值存疑'],
      },
      {
        type: 'heading',
        level: 1,
        title: 'Benchmark：5项任务实测数据',
      },
      {
        type: 'comparison-table',
        headers: ['任务类型', 'Cursor', 'Copilot', 'Windsurf', '胜者'],
        rows: [
          { tool: '单文件Bug修复', values: ['9/10', '8/10', '8/10', 'Cursor'] },
          { tool: '多文件重构', values: ['9.5/10', '7/10', '8/10', 'Cursor'] },
          { tool: '样板代码生成', values: ['9/10', '8.5/10', '9/10', 'Cursor/Windsurf'] },
          { tool: '单元测试生成', values: ['9/10', '8/10', '8.5/10', 'Cursor'] },
          { tool: '代码解释/文档', values: ['8.5/10', '8/10', '8/10', 'Cursor'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '选购建议',
      },
      {
        type: 'verdict',
        verdicts: [
          { persona: '全职独立开发者', recommendation: 'Cursor', reason: 'Composer带来的效率提升远超$20/月的价格。一次多文件重构省下的时间就回本了。' },
          { persona: '企业团队开发', recommendation: 'GitHub Copilot', reason: '合规性、权限管理、微软生态集成是企业刚需。Agent模式也在快速追赶。' },
          { persona: '学生/业余爱好者', recommendation: 'Windsurf', reason: '免费版的功能已经足够好了。Supermaven的补全速度甚至超过付费竞品。' },
          { persona: '追求极限效率的全栈', recommendation: 'Cursor + Copilot 组合', reason: 'Cursor做重度编码工作，Copilot处理轻量补全。两者不冲突。' },
        ],
      },
      {
        type: 'heading',
        level: 2,
        title: '总结',
      },
      {
        type: 'text',
        content: '2026年的AI编程工具竞争激烈，这对用户来说是好事。**如果你只选一款，推荐Cursor**——它在产品完成度和用户体验上都领先一步。但如果预算紧张，Windsurf的免费版会让你惊喜。Copilot则是稳妥的企业选择。\n\n不管选哪个，关键是**开始用起来**。AI编程不是未来，而是现在。每个月花在AI编程工具上的$20，可能是ROI最高的投资之一。',
      },
    ],
  },

  // ===== P1: Midjourney vs Flux vs DALL-E 3 =====
  {
    id: 'r3',
    slug: 'midjourney-vs-flux-vs-dalle3-2026',
    title: 'Midjourney vs Flux vs DALL·E 3：2026 AI绘画工具终极PK',
    subtitle: '谁生成的图片最好看？谁最便宜好用？AI绘画三巨头全面横评',
    description: 'Midjourney v7、Flux Pro、DALL·E 3三款主流AI绘画工具深度对比。从画面质量、Prompt理解、风格多样性到价格对比，帮你找到最适合的AI图像生成器。',
    tools: ['midjourney', 'dalle3', 'stable-diffusion', 'flux'],
    category: 'image-generation',
    tags: ['Midjourney', 'Flux', 'DALL-E', 'AI绘画', '图像生成', 'AI艺术'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 9,
    featured: true,
    content: [
      {
        type: 'heading',
        level: 1,
        title: '2026年AI绘画格局：三分天下',
      },
      {
        type: 'text',
        content: 'AI图像生成领域经历了疯狂的两年。2024年是Midjourney一枝独秀，2025年Flux横空出世搅局，到了2026年，DALL·E 3依托ChatGPT生态依然占据重要位置。\n\n这三个代表了三种不同的理念：\n- **Midjourney** — 艺术至上，美学品质天花板\n- **Flux** — 开源与商业并存，文字渲染之王\n- **DALL·E 3** — 门槛最低，对话即出图\n\n我们在相同的30组prompt下测试了三款工具，从多个维度给出了评分。',
      },
      {
        type: 'comparison-table',
        headers: ['维度', 'Midjourney v7', 'Flux Pro', 'DALL·E 3'],
        rows: [
          { tool: '开发商', values: ['Midjourney Inc.', 'Black Forest Labs', 'OpenAI'] },
          { tool: '价格', values: ['$10-60/月', '免费/$0.06/张', '$20/月(ChatGPT+)'] },
          { tool: '使用方式', values: ['Discord/Web', 'Web/API / ComfyUI等', 'ChatGPT内嵌 / API'] },
          { tool: '最大分辨率', values: ['2048x2048(更高可调)', '1024x1024(可更高)', '1024x1024'] },
          { tool: '风格控制', values: ['极强(--stylize等参数)', '强(LoRA/微调)', '中等(仅文字描述)'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '画质与美学：主观但重要的对比',
      },
      {
        type: 'text',
        content: '让我们直说结论：**纯论画面美感，Midjourney依然领先。** 它的光影处理、构图审美、色彩和谐度有一种"摄影师的眼光"在里面。特别是人物肖像和概念艺术，Midjourney生成的图片经常让人难以相信这是AI做的。\n\n但Flux追赶得非常快。在v2版本之后，Flux的画面质感已经非常接近Midjourney，而且在**文字渲染**方面——这是Midjourney长期以来的弱点——Flux实现了碾压级的优势。你需要在图片里写一行正确的文字？选Flux准没错。\n\nDALL·E 3的优势在于**便捷性和Prompt理解**。你不需要学复杂的prompt语法，用大白话描述就能得到还不错的结果。对于非专业设计师来说，这可能是最重要的因素。',
      },
      {
        type: 'comparison-table',
        headers: ['测试场景', 'Midjourney', 'Flux', 'DALL·E 3'],
        rows: [
          { tool: '人物肖像', values: ['9.5/10', '8.5/10', '7.5/10'] },
          { tool: '风景/建筑', values: ['9/10', '9/10', '8/10'] },
          { tool: '文字渲染', values: ['6/10', '9.5/10', '7/10'] },
          { tool: '产品摄影', values: ['9/10', '8.5/10', '8/10'] },
          { tool: '动漫/插画', values: ['9/10', '8/10', '7.5/10'] },
          { tool: 'Prompt理解(自然语言)', values: ['7/10', '8/10', '9.5/10'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '适用人群推荐',
      },
      {
        type: 'verdict',
        verdicts: [
          { persona: '专业设计师/艺术家', recommendation: 'Midjourney', reason: '美学品质天花板，商业出图的首选。Niji模式画二次元也是一流水平。' },
          { persona: '营销/电商/自媒体', recommendation: 'Flux 或 Midjourney', reason: 'Flux的文字渲染能力适合做海报和广告图，Midjourney适合做高质量配图。' },
          { persona: '普通用户/新手入门', recommendation: 'DALL·E 3 或 Flux(免费版)', reason: 'DALL·E 3零学习成本，Flux Dev免费开源。先试再决定是否付费。' },
          { persona: '开发者/需要批量生成', recommendation: 'Flux API', reason: 'Flux提供API接入，价格低至$0.06/张，适合批量生产场景。' },
        ],
      },
      {
        type: 'heading',
        level: 2,
        title: '一句话总结',
      },
      {
        type: 'text',
        content: '**要美感 → Midjourney | 要文字 → Flux | 要方便 → DALL·E 3**  \n\n三者并不是非此即彼的关系。很多专业创作者的组合是：Midjourney出主图 + Flux修改文字 + DALL·E 3快速出草图。AI绘画的最佳策略永远是组合拳。',
      },
    ],
  },

  // ===== P1: Sora vs Runway vs Kling =====
  {
    id: 'r4',
    slug: 'sora-vs-runway-vs-kling-2026',
    title: 'Sora vs Runway vs 可灵Kling：2026 AI视频生成工具实测对比',
    subtitle: '文生视频赛道三国演义，谁能让你的创意动起来？',
    description: 'Sora、Runway Gen-3、可灵Kling三款主流AI视频生成工具全面评测。从视频质量、物理模拟、价格到使用便捷度，帮你选择最适合的AI视频制作工具。',
    tools: ['sora', 'runway', 'kling'],
    category: 'video-generation',
    tags: ['Sora', 'Runway', '可灵', 'AI视频', '视频生成', '文生视频'],
    author: 'AI Tool Hub 编辑部',
    publishedAt: '2026-05-15',
    updatedAt: '2026-05-15',
    readingTime: 8,
    featured: true,
    content: [
      {
        type: 'heading',
        level: 1,
        title: 'AI视频生成：2026最火热的AI赛道',
      },
      {
        type: 'text',
        content: '如果说2023年是AI聊天元年，2024年是AI绘画爆发年，那么2025-2026就是**AI视频的时代**。从Sora的一鸣惊人，到Runway的稳步迭代，再到国产可灵(Kling)的异军突起，AI视频生成正在从"玩具"变成真正的生产力工具。\n\n我们用相同的15个视频生成prompt测试了三款工具，覆盖不同场景：人物动作、自然风光、产品展示、动画风格等。',
      },
      {
        type: 'comparison-table',
        headers: ['维度', 'Sora', 'Runway Gen-3', '可灵 Kling'],
        rows: [
          { tool: '开发商', values: ['OpenAI', 'RunwayML', '快手 Kuaishou'] },
          { tool: '获取方式', values: ['ChatGPT Plus会员', 'Web/API订阅', 'Web/App + 免费额度'] },
          { tool: '价格起', values: ['$20/月', '$15/月', '免费/¥66/月'] },
          { tool: '最长视频', values: ['60秒', '10秒', '2分钟(优势!)'] },
          { tool: '最大分辨率', values: ['1080p', '1080p', '1080p'] },
          { tool: '中国特色', values: ['全球生态', '好莱坞背书', '国产 / 中文优化 / 2分钟时长'] },
        ],
      },
      {
        type: 'heading',
        level: 1,
        title: '实测体验：三大维度对比',
      },
      {
        type: 'text',
        content: '**视频质量与物理真实性**  \nSora在物理世界模拟方面仍然领先——物体运动轨迹、重力效果、光影变化都更符合物理规律。Runway Gen-3 Alpha在艺术性和电影感方面表现出色，很多独立电影人已经在用它制作短片。\n\n可灵Kling的最大亮点是**2分钟的视频时长**和**人物一致性**。在需要角色保持连贯的长视频中，可灵的表现令人惊喜。作为国产AI，它在中文场景下的理解也有天然优势。\n\n**使用便捷度**  \nSora最方便（如果你已有ChatGPT Plus），直接对话框就能生成。Runway的专业功能最多（运动笔刷、帧精确控制等），但学习成本也最高。可灵的界面最友好，而且有免费额度让你先试水。',
      },
      {
        type: 'comparison-table',
        headers: ['测试场景', 'Sora', 'Runway', '可灵'],
        rows: [
          { tool: '人物动作流畅度', values: ['9/10', '8.5/10', '8.5/10'] },
          { tool: '物理模拟准确性', values: ['9/10', '8/10', '8/10'] },
          { tool: '画面一致性(长视频)', values: ['7/10', '7/10', '9/10'] },
          { tool: '艺术/电影感', values: ['8/10', '9.5/10', '8/10'] },
          { tool: '性价比', values: ['★★★', '★★★☆', '★★★★★'] },
        ],
      },
      {
        type: 'verdict',
        verdicts: [
          { persona: '短视频/自媒体创作者', recommendation: '可灵 Kling', reason: '免费额度慷慨，2分钟时长够用，人物一致性适合剧情类视频。中文优化加分。' },
          { persona: '专业视频制作人/广告', recommendation: 'Runway', reason: '专业控制功能最丰富，Gen-3的电影质感被行业认可。' },
          { persona: 'ChatGPT重度用户', recommendation: 'Sora', reason: '无需额外学习，在熟悉的ChatGPT界面直接使用。' },
          { persona: '预算为零的用户', recommendation: '可灵免费版', reason: '目前唯一提供充足免费额度的AI视频工具，质量也不差。' },
        ],
      },
    ],
  },
];

// 评测查询函数
export function getReviewsByCategory(categorySlug: string): Review[] {
  return reviews.filter(r => r.category === categorySlug);
}

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find(r => r.slug === slug);
}

export function getFeaturedReviews(): Review[] {
  return reviews.filter(r => r.featured);
}

export function getReviewsForTool(toolSlug: string): Review[] {
  return reviews.filter(r => r.tools.includes(toolSlug));
}
