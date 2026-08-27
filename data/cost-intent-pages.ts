export type CostIntentRow = {
  name: string;
  monthly: string;
  annual: string;
  bestFor: string;
  note: string;
  source?: { label: string; href: string };
};

export type CostIntentPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  audience: string;
  takeaways: string[];
  rows: CostIntentRow[];
  checklist: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const COST_INTENT_UPDATED_AT = '2026-08-27';

export const costIntentPages: CostIntentPage[] = [
  {
    slug: 'chatgpt-vs-claude-vs-gemini-cost',
    eyebrow: '主流模型订阅价格',
    title: 'ChatGPT、Claude、Gemini订阅价格对比：一年要花多少钱？',
    description: '对比 ChatGPT、Claude、Gemini 的常见个人订阅价格，按月费、年费和使用场景判断是否需要同时保留多款通用模型。',
    intro: '如果你同时订阅 ChatGPT、Claude 和 Gemini，真正需要先回答的不是“哪个模型最强”，而是每个月为重复能力付了多少钱。下面用公开价格页的常见个人档位做可编辑的预算基线，再结合任务和使用频率做取舍。',
    audience: '适合正在比较 ChatGPT、Claude、Gemini 个人版，或想把多款通用模型压缩成主力 + 备用组合的人。',
    takeaways: [
      '三款个人档位按约 20 美元/月的常见标价估算，同时保留 12 个月的基础成本约为 720 美元；地区、税费、档位和促销会改变实际账单。',
      '如果只是偶尔切换模型，先记录 14 天真实任务，再决定是否需要三款都续费。',
      '写作、编程、长文、联网和团队协作的优先级不同，价格只应作为决策的一部分。',
    ],
    rows: [
      {
        name: 'ChatGPT Plus',
        monthly: '约 $20',
        annual: '约 $240',
        bestFor: '通用对话、研究、图像与办公任务',
        note: '以官方结算页和所在地区显示为准。',
        source: { label: 'OpenAI 官方价格页', href: 'https://openai.com/chatgpt/pricing' },
      },
      {
        name: 'Claude Pro',
        monthly: '约 $20',
        annual: '约 $240',
        bestFor: '长文分析、写作与代码协作',
        note: '不同地区可能展示不同货币与税费。',
        source: { label: 'Anthropic 官方价格页', href: 'https://www.anthropic.com/pricing' },
      },
      {
        name: 'Google AI Pro',
        monthly: '约 $19.99',
        annual: '约 $239.88',
        bestFor: 'Google 生态、研究与多模态任务',
        note: 'Google One 页面按地区展示具体方案。',
        source: { label: 'Google One 官方方案页', href: 'https://one.google.com/about/plans?hl=en_CA' },
      },
    ],
    checklist: [
      { title: '先分配主力任务', description: '给每个订阅写下 2–3 个不可替代的周任务，不能只用“模型能力强”作为保留理由。' },
      { title: '记录真实使用率', description: '连续 14 天记录完成任务数、返工次数和关键输出，登录次数不等于使用价值。' },
      { title: '设定主备关系', description: '保留一个日常主力，其他工具只有在长文、代码、联网或多模态场景有明确差异时才续费。' },
      { title: '把结果放回预算模型', description: '用计算器加入席位、汇率和利用率，避免只比较单月价格而忽略年度总成本。' },
    ],
    faqs: [
      { question: '三款工具一起订阅，一年大约多少钱？', answer: '按本页示例的常见个人月费估算，三款合计约 59.99 美元/月，即约 719.88 美元/年；实际价格、税费、地区和档位以官方结算页为准。' },
      { question: 'ChatGPT、Claude、Gemini 应该只选一个吗？', answer: '不一定。若你的工作包含明显不同的任务，可以保留主力 + 专项工具；如果只是重复比较回答质量，先用 14 天任务记录验证，再考虑降档或取消。' },
      { question: '计算器里的示例价格会一直不变吗？', answer: '不会。示例价格是预算基线而不是报价，产品、地区和税费都可能变化。计算器允许编辑价格，页面也保留官方价格来源。' },
    ],
  },
  {
    slug: 'ai-tools-for-small-teams-budget',
    eyebrow: '小团队 AI 预算',
    title: '小团队 AI 工具预算怎么定？5人团队月费、年费计算方法',
    description: '用席位、使用率、权限和替代方案拆解 5 人小团队的 AI 工具预算，避免每个人都买一套却没有统一管理。',
    intro: '小团队最容易出现的预算问题，不是工具太贵，而是重复购买、闲置席位和权限边界没有被记录。预算应该从岗位任务和席位开始，而不是从“每个人都买一个账号”开始。',
    audience: '适合 2–20 人的创业团队、内容团队、代理商和需要统一管理 AI 订阅的负责人。',
    takeaways: [
      '5 人团队不一定需要 5 份相同订阅；先按核心任务配置席位，再给专项工具设置试用期限。',
      '预算表至少应同时显示月费、年费、席位数、实际使用率和替代方案。',
      '涉及客户资料、代码和内部文档时，权限、数据边界和离职回收比单纯省月费更重要。',
    ],
    rows: [
      { name: '最小可行组合', monthly: '约 $40–$60', annual: '约 $480–$720', bestFor: '2 个核心席位 + 免费工具', note: '适合先验证流程，不代表每个团队的最终成本。' },
      { name: '全员通用组合', monthly: '约 $100', annual: '约 $1,200', bestFor: '5 个通用模型席位', note: '按每席约 $20/月的示例预算计算。' },
      { name: '分层组合', monthly: '约 $60–$140', annual: '约 $720–$1,680', bestFor: '核心模型 + 编程/视频/语音专项', note: '专项工具数量、座席和用量会显著影响账单。' },
    ],
    checklist: [
      { title: '列出高频工作流', description: '按岗位列出写作、研究、编程、设计、客服等任务，标注频率、产出和人工返工。' },
      { title: '区分共享知识与个人偏好', description: '团队知识库、客户资料和代码应进入可管理的团队方案，个人偏好工具则单独验证。' },
      { title: '设置 30 天试用门槛', description: '任何新增付费工具都先定义任务数、节省时间、质量和安全指标，未达标就停用。' },
      { title: '每月回收闲置席位', description: '把登录、任务完成和实际产出放在同一张表，月度复盘席位、权限和续费。' },
    ],
    faqs: [
      { question: '5 人团队应该每人都买 ChatGPT 或 Claude 吗？', answer: '不建议直接按人数全量购买。先按任务配置 1–2 个核心席位，观察真实使用，再根据权限、协作和数据要求扩展团队方案。' },
      { question: '小团队预算里要不要算 API 费用？', answer: '要。若产品通过 API、自动化或内部应用使用，API 调用、日志、存储、人工审核和培训都应单独列项，不能只看网页订阅。' },
      { question: '怎么快速得到适合自己团队的预算？', answer: '先用计算器输入席位、月费和利用率，再把低利用或功能重叠的项目列为待复核。复杂的权限、数据和采购问题可以申请人工选型服务。' },
    ],
  },
  {
    slug: 'ai-tool-pricing-comparison-2026',
    eyebrow: 'AI 工具价格表',
    title: 'AI工具价格对比 2026：ChatGPT、Claude、Cursor、ElevenLabs月费与年费',
    description: '整理 ChatGPT、Claude、Google AI Pro、Cursor、ElevenLabs 的常见月费与年费预算，帮助个人和团队快速筛出值得核验的订阅。',
    intro: '价格对比页的作用是缩短筛选时间，不是替代官方结算页。下面把常见订阅按月费和 12 个月简单年费列出，并明确它们适合的工作场景，方便你进入计算器做自己的席位和汇率调整。',
    audience: '适合在写作、编程、研究、图像/视频和语音工具之间做第一轮价格筛选的人。',
    takeaways: [
      '同样是约 20 美元/月，工具的计费单位和能力边界可能完全不同，不能只按价格排序。',
      '年费是月费 × 12 的预算估算，不包含税费、促销、用量超额和团队增购。',
      '当多个工具能力重叠时，先把闲置率和替代成本算清，再考虑新增订阅。',
    ],
    rows: [
      { name: 'ChatGPT Plus', monthly: '约 $20', annual: '约 $240', bestFor: '通用对话、研究、图像与办公', note: '按个人常见档位做预算基线。', source: { label: 'OpenAI 官方价格页', href: 'https://openai.com/chatgpt/pricing' } },
      { name: 'Claude Pro', monthly: '约 $20', annual: '约 $240', bestFor: '长文、写作和代码协作', note: '以官方价格页和结算页为准。', source: { label: 'Anthropic 官方价格页', href: 'https://www.anthropic.com/pricing' } },
      { name: 'Google AI Pro', monthly: '约 $19.99', annual: '约 $239.88', bestFor: 'Google 生态与多模态任务', note: '地区和方案可能不同。', source: { label: 'Google One 官方方案页', href: 'https://one.google.com/about/plans?hl=en_CA' } },
      { name: 'Cursor Pro', monthly: '约 $20', annual: '约 $240', bestFor: '代码编辑、重构与开发工作流', note: '用量和模型调用规则需以官方页面为准。', source: { label: 'Cursor 官方价格页', href: 'https://www.cursor.com/pricing' } },
      { name: 'ElevenLabs Creator', monthly: '约 $22', annual: '约 $264', bestFor: '配音、语音合成与内容制作', note: '字符额度与超额用量会影响实际成本。', source: { label: 'ElevenLabs 官方方案页', href: 'https://elevenlabs.io/pricing' } },
    ],
    checklist: [
      { title: '先按场景筛选', description: '通用模型、代码编辑器和语音工具的产出不同，先明确任务，再比较价格和额度。' },
      { title: '把年费换算成人均成本', description: '团队采购时同时看每席成本、闲置率、权限和成员变动，避免被低月费误导。' },
      { title: '核对用量和税费', description: '按官方价格页复核地区、税费、额度、超额计费和年度优惠，本站数字只用于前期估算。' },
      { title: '用实际数据做续费', description: '至少记录一次完整计费周期，再决定续费、降档、替换或增加席位。' },
    ],
    faqs: [
      { question: '表中的价格是最终报价吗？', answer: '不是。它们是基于官方公开方案的常见价格基线，地区、税费、促销、用量和团队方案都会改变账单，最终以官方结算页为准。' },
      { question: '为什么价格相近的工具不能直接比较？', answer: '因为额度、模型、数据权限、集成和使用场景不同。更合理的做法是先选任务，再比较完成任务的总成本和返工成本。' },
      { question: '如何把这张价格表变成自己的预算？', answer: '进入 AI 订阅成本计算器，修改价格、席位、利用率和汇率，生成待复核清单，再决定是否咨询人工选型。' },
    ],
  },
];

export const costIntentPageMap = Object.fromEntries(
  costIntentPages.map((page) => [page.slug, page]),
) as Record<string, CostIntentPage>;
