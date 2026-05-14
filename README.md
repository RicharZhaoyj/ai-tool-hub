# AI Tool Hub — AI工具导航站

精选全球最优秀的AI工具导航网站，支持中英文，带联盟佣金变现。

**🌐 在线地址**: https://tools.link.cn

## 🚀 快速开始

### 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 设置自定义域名 `ai.link.cn`（或你想要的子域名）

## 🔧 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **部署**: Vercel (Edge)
- **数据**: TypeScript 数据文件（可后续迁移至数据库）

## 📁 项目结构

```
├── app/              # 页面路由
│   ├── page.tsx      # 首页
│   ├── layout.tsx    # 全局布局
│   ├── sitemap.ts    # 站点地图
│   ├── category/[slug]/  # 分类页
│   └── tool/[slug]/      # 工具详情页
├── components/       # 组件
│   ├── Header.tsx        # 导航栏
│   ├── Footer.tsx        # 页脚
│   ├── SearchBar.tsx     # 搜索框
│   ├── CategoryNav.tsx   # 分类导航
│   ├── ToolCard.tsx      # 工具卡片
│   ├── ToolGrid.tsx      # 工具网格
│   ├── HeroSection.tsx   # 首屏Banner
│   └── AffiliateLink.tsx  # 联盟链接组件
├── data/             # 数据层
│   ├── tools.ts      # 工具数据（26+款）
│   └── categories.ts # 分类数据（8个分类）
├── lib/              # 工具库
│   ├── types.ts      # 类型定义
│   └── utils.ts      # 工具函数
└── public/
    └── robots.txt    # 搜索引擎爬虫规则
```

## 💰 联盟变现

### 已配置联盟链接的工具

| 工具 | 联盟平台 | 佣金 |
|------|----------|------|
| ElevenLabs | ShareASale | 22% |
| Cursor | 自营 | $20/转化 |
| Canva | ShareASale/CJ | $36/单 |
| Notion AI | Notion Affiliates | 20%首年 |
| Jasper | 自营 | 30%订阅 |
| SEMrush | Impact | 最高$200/单 |

### 如何接入联盟

1. 注册对应联盟平台的账号
2. 替换 `data/tools.ts` 中对应工具的 `affiliateUrl` 字段中的占位符（如 YOUR_ID, XXXXX 等）
3. 带追踪参数的格式：联盟前缀 + encodeURIComponent(官网URL)

## ✨ 功能特性

- ✅ 响应式设计（移动端友好）
- ✅ 深色模式支持
- ✅ SEO优化（sitemap、robots、OG元数据、结构化数据）
- ✅ 搜索功能（支持中英文关键词）
- ✅ 分类浏览 + 排序
- ✅ 工具详情页 + 联盟跳转
- ✅ 热门/精选推荐
- ✅ 相关工具推荐

## 🌐 自定义域名设置

在 link.cn DNS 管理面板添加：

```
类型: CNAME
名称: tools
值: cname.vercel-dns.com
```

然后在 Vercel 项目 Settings → Domains 添加 `tools.link.cn`

## 📝 后续迭代方向

- [ ] CMS后台管理工具数据
- [ ] 用户评论和评分系统
- [ ] 工具提交表单
- [ ] 广告位管理
- [ ] 多语言切换（完整i18n）
- [ ] 数据库迁移（PostgreSQL/Supabase）
- [ ] 分析统计面板

## License

MIT
