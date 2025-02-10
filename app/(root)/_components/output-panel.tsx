"use client"

import { useCodeEditorStore } from "@/store/use-code-editor-store";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./running-code-skeleton";


export default function OutputPanel() {

  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl bg-[#181825] p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-[#1e1e2e] px-2.5 py-1.5 text-xs text-gray-400 ring-1 ring-gray-800/50 transition-all hover:text-gray-300 hover:ring-gray-700/50"
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div className="relative h-[650px] overflow-auto rounded-xl border border-[#313244] bg-[#1e1e2e]/50 p-4 font-mono text-sm backdrop-blur-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="mb-3 flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}