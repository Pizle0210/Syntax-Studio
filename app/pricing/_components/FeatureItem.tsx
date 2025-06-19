import { Check } from "lucide-react";

export default function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex items-start gap-3">
      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/20">
        <Check className="h-3 w-3 text-blue-400" />
      </div>
      <span className="text-gray-400 transition-colors group-hover:text-gray-300">
        {children}
      </span>
    </div>
  );
}