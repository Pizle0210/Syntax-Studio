import NavigationHeader from "@/components/navigation-header";
import { ArrowRight, Command, Star } from "lucide-react";
import Link from "next/link";

export default function ProPlanView() {
  return (
    <div className="bg-[#0a0a0f]">
      <NavigationHeader />
      <div className="relative flex h-[80vh] items-center justify-center px-4">
        <div className="relative mx-auto max-w-xl text-center">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-10 blur-2xl" />

          <div className="relative rounded-2xl border border-gray-800/50 bg-[#12121a]/90 p-12 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05]" />

            <div className="relative">
              <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 ring-1 ring-gray-800/60">
                <Star className="h-8 w-8 text-purple-400" />
              </div>

              <h1 className="mb-3 text-3xl font-semibold text-white">
                Pro Plan Active
              </h1>
              <p className="mb-8 text-lg text-gray-400">
                Experience the full power of professional development
              </p>

              <Link
                href="/"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-8 py-4 text-white transition-all duration-200 hover:border-blue-500/50 hover:from-blue-500/20 hover:to-purple-500/20"
              >
                <Command className="h-5 w-5 text-blue-400" />
                <span>Open Editor</span>
                <ArrowRight className="h-5 w-5 text-purple-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
