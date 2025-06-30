"use client";

import { useState, useEffect } from "react"; // The fix is here: Added useEffect to the import
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isCommandOpen, setCommandOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Keyboard shortcut for command palette
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);


    return (
        <>
            <CommandPalette open={isCommandOpen} onOpenChange={setCommandOpen} />

            <div className="flex">
                {/* Mobile Sidebar Overlay */}
                <div 
                  className={cn(
                    "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 md:hidden",
                    isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  onClick={() => setMobileSidebarOpen(false)}
                />
                
                <Sidebar 
                    className={cn(
                        "fixed -translate-x-full transition-transform duration-300 md:relative md:translate-x-0",
                        isMobileSidebarOpen && "translate-x-0"
                    )}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
                
                <div className="flex-1 flex flex-col min-h-screen">
                  <Header onMenuClick={() => setMobileSidebarOpen(true)} />
                  <main className="flex-1">
                    {children}
                  </main>
                </div>
            </div>
        </>
    );
}