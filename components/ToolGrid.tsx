import { Tool } from '@/lib/types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
}

export default function ToolGrid({ tools, emptyMessage = '暂无工具' }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">{emptyMessage}</p>
        <p className="text-sm text-gray-400 mt-2">试试换个关键词搜索</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
