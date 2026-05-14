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
          ✨ 已收录 26+ 款顶级 AI 工具
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
          发现最好的
          <br />
          <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            AI 工具
          </span>
        </h1>

        <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          精选全球最优秀的AI工具，涵盖文字、图像、视频、编程等全场景。
          找到提升效率的利器，让AI为你打工。
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 text-white/70">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">26+</div>
            <div className="text-xs">精选工具</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs">分类覆盖</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs">人工筛选</div>
          </div>
        </div>
      </div>
    </div>
  );
}
