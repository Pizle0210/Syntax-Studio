import { api } from "@/convex/_generated/api";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import ThemeSelector from "./theme-selector";
import LanguageSelector from "./language-selector";
import RunButton from "./run-button";
import HeaderProfileBtn from "./header-profile-button";

export default async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <header className="relative z-10">
      <div className="mb-4 flex items-center justify-center rounded-lg bg-[#0a0a0f]/80 p-6 backdrop-blur-xl lg:justify-between">
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="group relative flex items-center gap-3">
            {/* Logo hover effect */}

            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

            {/* Logo */}
            <div className="relative rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 ring-1 ring-white/10 transition-all group-hover:ring-white/20">
              <Blocks className="size-6 -rotate-90 transform text-blue-400 backdrop-hue-rotate-180 transition-transform duration-500 group-hover:rotate-0" />
            </div>

            <div className="flex flex-col">
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-purple-200 bg-clip-text text-lg font-semibold text-transparent">
                SyntaxStudio
              </span>
              <span className="block text-xs font-medium text-blue-400/60">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
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
          </nav>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector mode={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-1.5 transition-all duration-300 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20"
            >
              <Sparkles className="h-4 w-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-semibold text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="flex items-center border-l border-gray-800 pl-3">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
