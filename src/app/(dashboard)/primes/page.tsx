"use client";

import { useState } from "react";
import Link from "next/link";
import { contractors } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MapPin,
  Users,
  DollarSign,
  Search,
  Bookmark,
} from "lucide-react";

function fitScoreColor(score: number) {
  if (score > 80) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (score > 60) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
}

export default function PrimesPage() {
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const allAgencies = Array.from(
    new Set(contractors.flatMap((c) => c.agencies_worked_with))
  ).sort();

  const filtered = contractors.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.capabilities.some((cap) => cap.toLowerCase().includes(q)) ||
      c.agencies_worked_with.some((a) => a.toLowerCase().includes(q));

    const matchesAgency =
      !agencyFilter ||
      c.agencies_worked_with.includes(agencyFilter);

    return matchesSearch && matchesAgency;
  });

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Prime Contractors
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover and track potential teaming partners
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, capability, or agency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Agencies</option>
          {allAgencies.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} contractor{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-base leading-snug">
                    {c.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {c.location}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums ${fitScoreColor(
                    c.teaming_fit_score ?? 0
                  )}`}
                >
                  {c.teaming_fit_score ?? "N/A"}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Stats row */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3" />
                  {c.employee_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3" />
                  {c.annual_revenue}
                </span>
              </div>

              {/* Tags */}
              {c.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {c.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Capabilities */}
              <div className="flex flex-wrap gap-1">
                {c.capabilities.slice(0, 3).map((cap) => (
                  <Badge key={cap} variant="outline" className="text-[10px] px-1.5 py-0">
                    {cap}
                  </Badge>
                ))}
              </div>

              {/* Top agencies */}
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Agencies: </span>
                {c.agencies_worked_with.slice(0, 3).join(", ")}
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Button variant="default" size="sm" className="flex-1" render={<Link href={`/primes/${c.id}`} />}>
                View Profile
              </Button>
              <Button
                variant={savedIds.has(c.id) ? "secondary" : "outline"}
                size="icon-sm"
                onClick={() => toggleSave(c.id)}
              >
                <Bookmark
                  className={`size-3.5 ${
                    savedIds.has(c.id) ? "fill-current" : ""
                  }`}
                />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
          <Building2 className="size-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            No contractors match your search
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
