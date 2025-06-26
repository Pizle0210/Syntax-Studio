import { Zap } from "lucide-react";
import React from "react";

interface UpgradeButtonProps {
  url?: string;
  className?: string;
  ariaLabel?: string;
}

const CHECKOUT_URL =
  "https://syntax-studio.lemonsqueezy.com/buy/13d65597-6034-402c-8fe0-849b0298a96e";
export default function UpgradeButton({
  url = CHECKOUT_URL,
  className = "",
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
      {"Upgrade to Pro"}
    </a>
  );
}
