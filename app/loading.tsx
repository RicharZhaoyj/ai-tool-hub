export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero skeleton */}
      <div className="text-center mb-10">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-3 animate-pulse" />
        <div className="h-5 w-96 bg-gray-100 dark:bg-gray-700 rounded mx-auto animate-pulse" />
      </div>

      {/* Search bar skeleton */}
      <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8 max-w-2xl mx-auto animate-pulse" />

      {/* Category nav skeleton */}
      <div className="flex gap-3 mb-8 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0 animate-pulse" />
        ))}
      </div>

      {/* Tool grid skeleton - 6 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 w-14 bg-gray-100 dark:bg-gray-700 rounded-md" />
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="h-4 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-100 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
