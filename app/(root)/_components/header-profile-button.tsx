"use client";

import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export default function HeaderProfileBtn() {
  return (
    <div className="flex items-center">
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            href="/profile"
            label="Profile"
            labelIcon={<User size={16}  />}
          />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
