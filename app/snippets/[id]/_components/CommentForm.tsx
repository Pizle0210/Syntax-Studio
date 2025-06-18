import { CodeIcon, SendIcon } from "lucide-react";
import { useState } from "react";

type CommentFormProps = {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}
export default function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {

    const [comment, setComment] = useState("");
    const [isPreview, setIsPreview] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = e.currentTarget.selectionStart;
        const end = e.currentTarget.selectionEnd;
        const newComment =
          comment.substring(0, start) + "  " + comment.substring(end);
        setComment(newComment);
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
          start + 2;
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!comment.trim()) return;

      await onSubmit(comment);

      setComment("");
      setIsPreview(false);
    };


  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="overflow-hidden rounded-xl border border-[#ffffff0a] bg-[#0a0a0f]">
        {/* Comment form header */}
        <div className="flex justify-end gap-2 px-4 pt-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              isPreview
                ? "bg-blue-500/10 text-blue-400"
                : "text-gray-400 hover:bg-[#ffffff08]"
            }`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="text-[#e1e1e3 min-h-[120px] p-4">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the discussion..."
            className="min-h-[120px] w-full resize-none border-0 bg-transparent p-4 font-mono text-sm text-[#e1e1e3] outline-none placeholder:text-[#808086]"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#ffffff0a] bg-[#080809] px-4 py-3">
          <div className="hidden space-y-1 text-xs text-[#808086] sm:block">
            <div className="flex items-center gap-2">
              <CodeIcon className="h-3.5 w-3.5" />
              <span>Format code with ```language</span>
            </div>
            <div className="pl-5 text-[#808086]/60">
              Tab key inserts spaces • Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="ml-auto flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-white transition-all hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="h-4 w-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}