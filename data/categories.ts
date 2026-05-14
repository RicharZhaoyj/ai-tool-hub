import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: '1',
    slug: 'text-generation',
    nameZh: '文字生成',
    nameEn: 'Text Generation',
    icon: '✍️',
    color: 'from-blue-500 to-cyan-400',
    description: 'AI文本写作、对话、翻译、摘要等文字处理工具',
  },
  {
    id: '2',
    slug: 'image-generation',
    nameZh: '图片生成',
    nameEn: 'Image Generation',
    icon: '🎨',
    color: 'from-purple-500 to-pink-400',
    description: 'AI绘画、图像编辑、图片增强等视觉创作工具',
  },
  {
    id: '3',
    slug: 'video-generation',
    nameZh: '视频生成',
    nameEn: 'Video Generation',
    icon: '🎬',
    color: 'from-red-500 to-orange-400',
    description: 'AI视频制作、剪辑、特效、动画等视频工具',
  },
  {
    id: '4',
    slug: 'audio-voice',
    nameZh: '音频/语音',
    nameEn: 'Audio & Voice',
    icon: '🎤',
    color: 'from-green-500 to-emerald-400',
    description: '语音合成、音乐生成、音频处理等声音工具',
  },
  {
    id: '5',
    slug: 'coding-dev',
    nameZh: '编程开发',
    nameEn: 'Coding & Dev',
    icon: '💻',
    color: 'from-slate-600 to-gray-400',
    description: 'AI编程助手、代码生成、代码审查等开发者工具',
  },
  {
    id: '6',
    slug: 'design-creative',
    nameZh: '设计创意',
    nameEn: 'Design & Creative',
    icon: '🖼️',
    color: 'from-indigo-500 to-violet-400',
    description: 'UI/UX设计、Logo生成、创意素材等设计辅助工具',
  },
  {
    id: '7',
    slug: 'productivity',
    nameZh: '效率办公',
    nameEn: 'Productivity',
    icon: '⚡',
    color: 'from-amber-500 to-yellow-400',
    description: '笔记整理、PPT生成、文档处理、会议记录等效率工具',
  },
  {
    id: '8',
    slug: 'seo-marketing',
    nameZh: 'SEO营销',
    nameEn: 'SEO & Marketing',
    icon: '📈',
    color: 'from-teal-500 to-cyan-400',
    description: '内容优化、文案写作、社媒管理、广告投放等营销工具',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
