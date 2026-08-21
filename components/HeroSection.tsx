export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-16 sm:px-12 sm:py-20 mb-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
          ✨ 已收录 36+ 款精选 AI 工具 · 持续更新
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
          AI工具推荐
          <br />
          <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            与真实评测
          </span>
        </h1>

        <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          按写作、图像、视频、编程和办公场景筛选，比较免费额度、价格与真实使用体验。
          找到真正适合你的AI工具，让AI为你打工。
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 text-white/70">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">36+</div>
            <div className="text-xs">精选工具</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs">分类覆盖</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12+</div>
            <div className="text-xs">深度评测</div>
          </div>
        </div>
      </div>
    </div>
  );
}
