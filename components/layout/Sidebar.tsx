"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigationData } from '@/lib/navigation';
import { LayoutDashboard, Pin, PinOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from 'react';

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const [isPinned, setIsPinned] = useState(false);

    const handleMouseEnter = () => {
        if (!isPinned) setIsCollapsed(false);
    };
    const handleMouseLeave = () => {
        if (!isPinned) setIsCollapsed(true);
    };
    const togglePin = () => {
        setIsPinned(!isPinned);
        if (isPinned) setIsCollapsed(true); // if it was pinned, unpin and collapse
        else setIsCollapsed(false); // if it was unpinned, pin it open
    };

    return (
        <aside 
            className={cn(
                "h-screen border-r bg-background flex flex-col transition-all duration-300",
                isCollapsed ? "w-20" : "w-64",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <TooltipProvider delayDuration={0}>
                <div className="flex-grow flex flex-col p-4">
                    <div className={cn("flex items-center mb-8", isCollapsed ? "justify-center" : "justify-between")}>
                        {!isCollapsed && <span className="text-xl font-bold">UtilsHub</span>}
                        <Button variant="ghost" size="icon" onClick={togglePin}>
                            {isPinned ? <PinOff className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                        </Button>
                    </div>

                    <nav className="flex flex-col space-y-1">
                        {navigationData.map((item, index) => (
                            item.type === 'heading' ? (
                                !isCollapsed && <h4 key={index} className="font-semibold text-xs uppercase text-muted-foreground tracking-wider px-3 pt-4 pb-1">{item.label}</h4>
                            ) : (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href!}
                                            className={cn(
                                                "flex items-center py-2 rounded-md text-sm font-medium transition-colors",
                                                isCollapsed ? "justify-center px-0" : "px-3",
                                                (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href!))
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            <item.icon className={cn("h-6 w-6", !isCollapsed && "mr-3")} />
                                            {!isCollapsed && <span>{item.label}</span>}
                                        </Link>
                                    </TooltipTrigger>
                                    {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                                </Tooltip>
                            )
                        ))}
                    </nav>
                </div>
            </TooltipProvider>
        </aside>
    );
}