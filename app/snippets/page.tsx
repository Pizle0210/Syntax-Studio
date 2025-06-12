"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/snippet-page-skeleton";
import NavigationHeader from "@/components/navigation-header";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/snippet-card";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { LANGUAGE_CONFIG } from "../(root)/_constants";

export default function SnippetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const snippets = useQuery(api.snippets.getSnippets);
  const [view, setView] = useState<"grid" | "list">("grid");
  // loading state
  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  console.log(languages);
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Hero */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-1.5 text-sm text-gray-400"
          >
            <BookOpen className="h-4 w-4" />
            Community Code Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg text-gray-400"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>




        {/* Filters Section */}
        <div className="relative mx-auto mb-12 max-w-5xl space-y-6">
          {/* Search */}
          <div className="group relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full rounded-xl border border-[#313244] bg-[#1e1e2e]/80 py-4 pl-12 pr-4 text-white transition-all duration-200 placeholder:text-gray-500 hover:border-[#414155] hover:bg-[#1e1e2e] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-[#1e1e2e] px-4 py-2 ring-1 ring-gray-800">
              <Tag className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Languages:</span>
            </div>

            {popularLanguages.map((lang) => {
              const languageConfig = LANGUAGE_CONFIG[lang.toLowerCase()];
              return (
                <button
                  key={lang}
                  onClick={() =>
                    setSelectedLanguage(lang === selectedLanguage ? null : lang)
                  }
                  className={`group relative rounded-lg px-3 py-1.5 transition-all duration-200 ${
                    selectedLanguage === lang
                      ? "bg-blue-500/10 text-blue-400 ring-2 ring-blue-500/50"
                      : "bg-[#1e1e2e] text-gray-400 ring-1 ring-gray-800 hover:bg-[#262637] hover:text-gray-300"
                  } `}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={languageConfig.logoPath}
                      alt={lang}
                      width={80}
                      height={80}
                      className="h-4 w-4 object-contain"
                    />
                    <span className="text-sm">{lang}</span>
                  </div>
                </button>
              );
            })}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 transition-colors hover:text-gray-300"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredSnippets.length} snippets found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-[#1e1e2e] p-1 ring-1 ring-gray-800">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-md p-2 transition-all ${
                    view === "grid"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-[#262637] hover:text-gray-300"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`rounded-md p-2 transition-all ${
                    view === "list"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-[#262637] hover:text-gray-300"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>




        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "mx-auto max-w-3xl grid-cols-1"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} languageConfig={LANGUAGE_CONFIG}/>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* edge case: empty state */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto mt-20 max-w-md overflow-hidden rounded-2xl p-8"
          >
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-white/10">
                <Code className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-white">
                No snippets found
              </h3>
              <p className="mb-6 text-gray-400">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#262637] px-4 py-2 text-gray-300 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
