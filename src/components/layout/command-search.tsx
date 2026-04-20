"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building2, FileText, LayoutDashboard, Search, Settings } from "lucide-react";

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search opportunities, contractors, and more..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => navigate("/opportunities")}>
            <Search className="mr-2 h-4 w-4" />
            Opportunities
          </CommandItem>
          <CommandItem onSelect={() => navigate("/primes")}>
            <Building2 className="mr-2 h-4 w-4" />
            Prime Contractors
          </CommandItem>
          <CommandItem onSelect={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Recent Opportunities">
          <CommandItem onSelect={() => navigate("/opportunities/o1")}>
            <FileText className="mr-2 h-4 w-4" />
            Enterprise Cloud Migration Services
          </CommandItem>
          <CommandItem onSelect={() => navigate("/opportunities/o2")}>
            <FileText className="mr-2 h-4 w-4" />
            Cybersecurity Operations Center Support
          </CommandItem>
          <CommandItem onSelect={() => navigate("/opportunities/o3")}>
            <FileText className="mr-2 h-4 w-4" />
            Data Analytics Platform Development
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Recent Contractors">
          <CommandItem onSelect={() => navigate("/primes/c1")}>
            <Building2 className="mr-2 h-4 w-4" />
            Northbridge Defense Systems
          </CommandItem>
          <CommandItem onSelect={() => navigate("/primes/c2")}>
            <Building2 className="mr-2 h-4 w-4" />
            Meridian Federal Solutions
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
