"use client";

import NavigationHeader from "@/components/navigation-header";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Clock, Code, ListVideo, Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import Image from "next/image";
import CodeBlock from "./_components/CodeBlock";
import StarButton from "@/components/star-button";
import Link from "next/link";
import { LANGUAGE_CONFIG } from "../(root)/_constants";


const TABS = [
  {
    id: "executions",
    label: "Code Executions",
    icon: ListVideo,
  },
  {
    id: "starred",
    label: "Starred Snippets",
    icon: Star,
  },
];

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">(
    "executions",
  );
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });
  const {
    loadMore,
    results: executions = [],
    status: executionStatus,
    isLoading,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    {
      userId: user?.id ?? "",
    },
    { initialNumItems: 3 },
  );

  // Handle loading more executions
   const handleLoadMore = () => {
     if (executionStatus === "CanLoadMore") loadMore(2);
   };

   if (!user && isLoaded) return router.push("/");

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Profile Header */}

        {userStats && userData && user &&(
          <ProfileHeader
            userStats={userStats}
            userData={userData}
            user={user!}
          />
        )}

        {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

        {/* Main content */}
        <div className="overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Tabs */}
          <div className="border-b border-gray-800/50">
            <div className="flex space-x-1 p-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as "executions" | "starred")
                  }
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-lg px-6 py-2.5 transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg bg-blue-500/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <tab.icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10 text-sm font-medium">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* ACTIVE TAB IS EXECUTIONS: */}
              {activeTab === "executions" && (
                <div className="space-y-6">
                  {executions?.map((execution) => (
                    // Render each code execution
                    <div
                      key={execution._id}
                      className="group overflow-hidden rounded-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/50"
                    >
                      <div className="flex items-center justify-between rounded-t-xl border border-gray-800/50 bg-black/30 p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-opacity group-hover:opacity-30" />
                            <Image
                              src={LANGUAGE_CONFIG[execution.language]?.logoPath || "/default.png"}
                              alt=""
                              className="relative z-10 rounded-lg object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {execution.language.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">
                                {new Date(
                                  execution._creationTime,
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  execution.error
                                    ? "bg-red-500/10 text-red-400"
                                    : "bg-green-500/10 text-green-400"
                                }`}
                              >
                                {execution.error ? "Error" : "Success"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-b-xl border border-t-0 border-gray-800/50 bg-black/20 p-4">
                        <CodeBlock
                          code={execution.code}
                          language={execution.language}
                        />

                        {(execution.output || execution.error) && (
                          <div className="mt-4 rounded-lg bg-black/40 p-4">
                            <h4 className="mb-2 text-sm font-medium text-gray-400">
                              Output
                            </h4>
                            <pre
                              className={`text-sm ${
                                execution.error
                                  ? "text-red-400"
                                  : "text-green-400"
                              }`}
                            >
                              {execution.error || execution.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading ? (
                    <div className="py-12 text-center">
                      <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-400">
                        Loading code executions...
                      </h3>
                    </div>
                  ) : (
                    executions.length === 0 && (
                      <div className="py-12 text-center">
                        <Code className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                        <h3 className="mb-2 text-lg font-medium text-gray-400">
                          No code executions yet
                        </h3>
                        <p className="text-gray-500">
                          Start coding to see your execution history!
                        </p>
                      </div>
                    )
                  )}

                  {/* Load More Button */}
                  {executionStatus === "CanLoadMore" && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-6 py-3 text-blue-400 transition-colors hover:bg-blue-500/20"
                      >
                        Load More
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE TAB IS STARS: */}
              {activeTab === "starred" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {starredSnippets?.map((snippet) => (
                    <div key={snippet._id} className="group relative">
                      <Link href={`/snippets/${snippet._id}`}>
                        <div className="h-full overflow-hidden rounded-xl border border-gray-800/50 bg-black/20 transition-all duration-300 hover:border-gray-700/50 group-hover:scale-[1.02] group-hover:transform">
                          <div className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-opacity group-hover:opacity-30" />
                                  <Image
                                    src={LANGUAGE_CONFIG[snippet.language]?.logoPath || "/default.png"}
                                    alt={`${snippet.language} logo`}
                                    className="relative z-10"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                  {snippet.language}
                                </span>
                              </div>
                              <div
                                className="absolute right-6 top-6 z-10"
                                onClick={(e) => e.preventDefault()}
                              >
                                <StarButton snippetId={snippet._id} />
                              </div>
                            </div>
                            <h2 className="mb-3 line-clamp-1 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                              {snippet.title}
                            </h2>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    snippet._creationTime,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <div className="overflow-hidden rounded-lg bg-black/30 p-4">
                              <pre className="line-clamp-3 font-mono text-sm text-gray-300">
                                {snippet.code}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full py-12 text-center">
                      <Star className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-400">
                        No starred snippets yet
                      </h3>
                      <p className="text-gray-500">
                        Start exploring and star the snippets you find useful!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
