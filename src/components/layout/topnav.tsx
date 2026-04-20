"use client";

import { Bell, Command, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandSearch } from "@/components/layout/command-search";
import { useState } from "react";

export function TopNav() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCommandOpen(true)}
            className="flex h-9 w-64 items-center gap-2 rounded-lg border border-border/50 bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Search everything...</span>
            <kbd className="ml-auto rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-md px-2 text-sm font-medium hover:bg-accent hover:text-foreground">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  SK
                </AvatarFallback>
              </Avatar>
              <span>Sarah Kim</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <CommandSearch open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
