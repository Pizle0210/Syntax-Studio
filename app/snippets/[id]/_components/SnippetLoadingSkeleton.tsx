import NavigationHeader from "@/components/navigation-header";

export default function SnippetLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <main className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1200px]">
          {/* Skeleton Header */}
          <div className="mb-6 rounded-2xl border border-[#ffffff0a] bg-[#121218] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-12 animate-pulse items-center justify-center rounded-xl bg-[#ffffff08]" />
                <div>
                  <div className="mb-2 h-8 w-48 animate-pulse rounded-lg bg-[#ffffff08]" />
                  <div className="flex gap-4">
                    <div className="h-5 w-24 animate-pulse rounded bg-[#ffffff08]" />
                    <div className="h-5 w-24 animate-pulse rounded bg-[#ffffff08]" />
                  </div>
                </div>
              </div>
            </div>
            {/* Skeleton Code Editor */}
            <div className="h-[400px] animate-pulse rounded-xl bg-[#ffffff08]" />
          </div>
          {/* Skeleton Comments Section */}
          <div className="rounded-2xl border border-[#ffffff0a] bg-[#121218] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 h-6 w-32 animate-pulse rounded bg-[#ffffff08]" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-[#ffffff08]" />
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-32 animate-pulse rounded bg-[#ffffff08]" />
                    <div className="h-16 animate-pulse rounded bg-[#ffffff08]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}