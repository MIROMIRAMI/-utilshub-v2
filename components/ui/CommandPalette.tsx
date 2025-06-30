"use client";

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Laptop } from "lucide-react"
import { navigationData } from "@/lib/navigation"; // Import from the new central file

import {
  CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator, CommandInput,
} from "@/components/ui/command"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const runCommand = React.useCallback((command: () => unknown) => {
    onOpenChange(false)
    command()
  }, [onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Tools & Hubs">
          {navigationData.filter(item => item.type === 'link').map((navItem) => (
              <CommandItem
                  key={navItem.href}
                  value={navItem.label}
                  onSelect={() => runCommand(() => router.push(navItem.href!))}
              >
                  <navItem.icon className="mr-2 h-4 w-4" />
                  <span>{navItem.label}</span>
              </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}><Sun className="mr-2 h-4 w-4" />Light</CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}><Moon className="mr-2 h-4 w-4" />Dark</CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}><Laptop className="mr-2 h-4 w-4" />System</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}