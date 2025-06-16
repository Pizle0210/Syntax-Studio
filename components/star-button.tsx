import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Star } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function StarButton({
  snippetId,
}: {
  snippetId: Id<"snippets">;
}) {
  const { isSignedIn } = useAuth();

  // Query to check if the current user has starred the snippet
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });

  // Query to get the total star count for the snippet
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });

  // Mutation to toggle the star state for the current user
  const star = useMutation(api.snippets.starSnippet);

  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId });
  };

  return (
    <Button
      className={`group flex items-center gap-1.5 rounded-lg py-0.5 transition-all duration-200 ${
        isStarred
          ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
      }`}
      onClick={handleStar}
    >
      <Star
        className={`h-4 w-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
      />
      <span
        className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}
      >
        {starCount}
      </span>
    </Button>
  );
}
