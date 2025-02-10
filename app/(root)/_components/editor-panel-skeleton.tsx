import { Terminal } from "lucide-react";

export default function EditorPanelSkeleton() {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 blur-2xl" />
        <div className="relative h-[600px] rounded-xl border border-white/[0.05] bg-[#12121a]/90 p-6 backdrop-blur">
          {/* Editor Area Skeleton */}
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            <div className="h-[600px] bg-[#1e1e2e]/50 p-4 backdrop-blur-sm">
              {/* Code line skeletons */}
              {[...Array(15)].map((_, i) => (
                <div key={i} className="mb-3 flex items-center gap-4">
                  <div className={`h-4 w-12 rounded bg-white/5`} />
                  <div
                    className={`h-4 rounded bg-white/5`}
                    style={{ width: `${Math.random() * 60 + 20}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-3 flex justify-end">
            <div className={`h-6 w-40 rounded-lg bg-white/5`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative rounded-xl bg-[#181825] p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="h-4 w-4 text-blue-400/50" />
          </div>
          <div className={`h-4 w-16 rounded bg-white/5`} />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-b from-[#1e1e2e] to-[#1a1a2e]" />
        <div className="relative h-[600px] rounded-xl border border-[#313244] bg-[#1e1e2e]/50 p-4 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className={`mx-auto mb-4 h-12 w-12 rounded-xl bg-white/5`} />
              <div className={`mx-auto h-4 w-48 rounded bg-white/5`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}