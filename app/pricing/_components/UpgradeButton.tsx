import { Zap } from "lucide-react";
import React from "react";

interface UpgradeButtonProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const DEFAULT_URL =
  "https://ytprogrammingstore.lemonsqueezy.com/buy/d459dddb-a233-4060-9e72-90a1a7740552";
export default function UpgradeButton({
  url = DEFAULT_URL,
  className = "",
  children,
  ariaLabel = "Upgrade to Pro",
}: UpgradeButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-white transition-all hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${className}`}
      aria-label={ariaLabel}
    >
      <Zap className="h-5 w-5" aria-hidden="true" />
      {children || "Upgrade to Pro"}
    </a>
  );
}
