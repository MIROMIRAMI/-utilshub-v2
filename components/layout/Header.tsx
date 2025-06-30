"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="container flex h-14 items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Open sidebar">
                <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
                <SignedOut>
                    <Button asChild>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </div>
    </header>
  )
}