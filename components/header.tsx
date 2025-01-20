import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div>
        <SignedOut>
            <SignInButton>
                
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
    </div>
  )
}