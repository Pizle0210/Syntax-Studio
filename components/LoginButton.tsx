import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-600 hover:to-blue-700">
        <LogIn className="h-4 w-4 transition-transform" />
        <span>Sign In</span>
      </button>
    </SignInButton>
  );
}
