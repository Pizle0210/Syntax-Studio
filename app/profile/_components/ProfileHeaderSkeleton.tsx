export default function ProfileHeaderSkeleton() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-8">
      <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:32px]" />
      <div className="relative flex items-center gap-8">
        {/* Avatar Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl" />
          <div className="relative z-10 h-24 w-24 animate-pulse rounded-full border-4 border-gray-800/50 bg-gray-800/80" />
          <div className="absolute -right-2 -top-2 z-20 h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-purple-500/50 to-purple-600/50" />
        </div>

        {/* User Info Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-800/80" />
          <div className="h-5 w-32 animate-pulse rounded bg-gray-800/80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-800/20 p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-5" />
            <div className="relative space-y-4">
              {/* Stat Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-800/80" />
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-800/80" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-800/80" />
                </div>
                <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-800/80" />
              </div>

              {/* Stat Footer */}
              <div className="flex items-center gap-2 border-t border-gray-800/50 pt-4">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-800/80" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-800/80" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-800/80" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}