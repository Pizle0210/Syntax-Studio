"use client"

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyButton({code}:{code:string}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      onClick={copyToClipboard}
      type="button"
      className="group relative rounded-lg p-3 transition-all duration-200 hover:bg-white/10"
    >
      {copied ? (
        <Check className="size-5 text-green-400" />
      ) : (
        <Copy className="size-5 text-gray-400 group-hover:text-gray-300" />
      )}
    </Button>
  );
}
