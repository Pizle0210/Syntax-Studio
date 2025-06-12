import HeaderProfileBtn from "@/app/(root)/_components/header-profile-button";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-3">
              {/* logo hover effect */}
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

              {/* Logo */}
              <div className="relative rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 ring-1 ring-white/10 transition-all group-hover:ring-white/20">
                <Blocks className="h-6 w-6 -rotate-6 transform text-blue-400 transition-transform duration-500 group-hover:rotate-0" />
              </div>

              <div className="relative">
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-lg font-semibold text-transparent">
                  SyntaxStudio
                </span>
                <span className="block text-xs font-medium text-blue-400/60">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* snippets Link */}
            <Link
              href="/snippets"
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-gray-800 bg-gray-800/50 px-4 py-1.5 text-gray-300 shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <Code2 className="relative z-10 h-4 w-4 transition-transform group-hover:rotate-3" />
              <span className="relative z-10 text-sm font-medium transition-colors group-hover:text-white">
                Snippets
              </span>
            </Link>
          </div>

          {/* right rection */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-1.5 transition-all duration-300 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20"
              >
                <Sparkles className="h-4 w-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            </SignedOut>

            {/* profile button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
