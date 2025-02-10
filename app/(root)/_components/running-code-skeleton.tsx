export default function RunningCodeSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-800/50" />
        <div className="h-4 w-1/2 rounded bg-gray-800/50" />
        <div className="h-4 w-5/6 rounded bg-gray-800/50" />
      </div>

      <div className="space-y-2 pt-4">
        <div className="h-4 w-2/3 rounded bg-gray-800/50" />
        <div className="h-4 w-4/5 rounded bg-gray-800/50" />
        <div className="h-4 w-3/4 rounded bg-gray-800/50" />
      </div>
    </div>
  );
}