"use client";
import type { Language, Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, StarIcon, Trash2, User } from "lucide-react";
import Image from "next/image";
// import StarButton from "@/components/StarButton";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

type LanguageConfig = Record<string, Language>;

export default function SnippetCard({
  snippet,
  languageConfig,
}: {
  snippet: Snippet;
  languageConfig: LanguageConfig;
}) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const languageDetails = languageConfig[snippet.language.toLowerCase()];

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast({ title: "Snippet Deleted Successfully" });
    } catch (error: unknown) {
      console.error("Error deleting snippet:", error);
      toast({
        title: "Error deleting snippet",
        description: "Error encountered while deleting snippet",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/${snippet._id}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-xl border border-[#313244]/50 bg-[#1e1e2e]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#313244]">
          <div className="p-6">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-all duration-500 group-hover:opacity-30"
                    area-hidden="true"
                  />
                  <div className="relative rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-2 transition-all duration-500 group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                    <Image
                      src={languageDetails?.logoPath || "/default.png"}
                      alt={`${snippet.language} logo`}
                      className="relative z-10 h-6 w-6 object-contain"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute right-5 top-5 z-10 flex items-center gap-4"
                onClick={(e) => e.preventDefault()}
              >
                <StarIcon />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-200 ${
                        isDeleting
                          ? "cursor-not-allowed bg-red-500/20 text-red-400"
                          : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                      } `}
                    >
                      {isDeleting ? (
                        <div className="size-3.5 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h2 className="mb-2 line-clamp-1 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-gray-800/50 p-1">
                      <User className="size-3" />
                    </div>
                    <span className="max-w-[150px] truncate">
                      {snippet.userName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="group/code relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/15 to-purple-500/5 opacity-0 transition-all group-hover/code:opacity-100" />
                <pre className="relative line-clamp-3 overflow-hidden rounded-lg bg-black/30 p-4 font-mono text-sm text-gray-300">
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
