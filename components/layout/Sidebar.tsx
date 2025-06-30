"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationData } from '@/lib/navigation';
import { LogIn } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    return (
        <aside className={cn("h-screen w-64 border-r bg-background p-4 flex flex-col", className)}>
            <div className="flex-grow flex flex-col">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="p-2 bg-primary rounded-lg">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M12 9.5V2.5a2.5 2.5 0 0 1 5 0V6"/><path d="M12 14.5v-5a2.5 2.5 0 0 0-5 0v8.5a2.5 2.5 0 0 0 5 0V18"/><path d="M9 21.5V13a2.5 2.5 0 0 1 5 0v2"/></svg>
                    </div>
                    <span className="text-xl font-bold">UtilsHub</span>
                </div>
                <div className="mb-6 border-y py-4">
                    <SignedOut><Button asChild className="w-full"><Link href="/sign-in"><LogIn className="mr-2 h-4 w-4" /> Sign In</Link></Button></SignedOut>
                    <SignedIn><div className="flex items-center justify-center p-2"><UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonBox: "flex-row-reverse", userButtonText: "text-base font-semibold" } }} /></div></SignedIn>
                </div>
                <nav className="flex flex-col space-y-1 flex-grow overflow-y-auto">
                    {navigationData.map((item, index) => (
                        item.type === 'heading' ? (
                            <h4 key={index} className="font-semibold text-xs uppercase text-muted-foreground tracking-wider px-3 pt-4 pb-1">{item.label}</h4>
                        ) : (
                            <Link key={item.href} href={item.href!} className={cn( "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors", (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href!)) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted" )}>
                                <item.icon className="mr-3 h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    ))}
                </nav>
            </div>
        </aside>
    );
}