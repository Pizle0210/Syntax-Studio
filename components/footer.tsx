import Link from "next/link";
import { Blocks } from "lucide-react";


export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* left */}
          <div className="flex items-center gap-2 text-gray-400">
            <Blocks className="size-5" />
            <span>Built for developers, by developers</span>
          </div>
          {/* right */}
          <div className="flex items-center gap-6">
            <Link
              href="/support"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}