export default function MenuSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl public-skeleton" />
        <div className="flex-1">
          <div className="h-5 w-40 public-skeleton rounded mb-2" />
          <div className="h-3 w-64 public-skeleton rounded" />
        </div>
      </div>

      {/* Category nav skeleton */}
      <div className="flex gap-2 mb-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-20 public-skeleton rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="w-full h-32 sm:h-40 public-skeleton flex-shrink-0" />
            <div className="flex-1 p-3 sm:p-4 flex flex-col">
              <div className="h-3 w-16 public-skeleton rounded mb-2" />
              <div className="h-5 w-3/4 public-skeleton rounded mb-2" />
              <div className="h-3 w-full public-skeleton rounded mb-1" />
              <div className="h-3 w-2/3 public-skeleton rounded mb-3 flex-1" />
              <div className="h-5 w-16 public-skeleton rounded mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
