"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, X } from "lucide-react";
import { opportunities } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const agencies = ["All Agencies", "DoD", "Army", "Air Force", "DHS", "GSA", "VA", "Navy", "HHS"];
const naicsCodes = ["All NAICS", "541511", "541512", "541519", "541330", "541611"];
const setAsides = ["All", "Small Business", "8(a)", "HUBZone", "SDVOSB", "WOSB", "None"];

function statusVariant(status: string) {
  switch (status) {
    case "bidding":
      return "default" as const;
    case "reviewing":
      return "secondary" as const;
    case "partnered":
      return "outline" as const;
    case "submitted":
      return "default" as const;
    case "archived":
      return "secondary" as const;
    default:
      return "secondary" as const;
  }
}

function statusColor(status: string) {
  switch (status) {
    case "bidding":
      return "bg-blue-600 text-white";
    case "reviewing":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "partnered":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "submitted":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "archived":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    default:
      return "";
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateString: string) {
  const now = new Date();
  const due = new Date(dateString);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function dueDateColor(dateString: string) {
  const days = daysUntil(dateString);
  if (days < 0) return "text-muted-foreground line-through";
  if (days <= 7) return "text-red-600 font-semibold dark:text-red-400";
  if (days <= 21) return "text-amber-600 dark:text-amber-400";
  return "text-foreground";
}

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [agency, setAgency] = useState("All Agencies");
  const [naics, setNaics] = useState("All NAICS");
  const [setAside, setSetAside] = useState("All");

  const filtered = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch =
        !search ||
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.solicitation_number.toLowerCase().includes(search.toLowerCase()) ||
        opp.agency.toLowerCase().includes(search.toLowerCase());

      const matchesAgency = agency === "All Agencies" || opp.agency === agency;
      const matchesNaics = naics === "All NAICS" || opp.naics_code === naics;
      const matchesSetAside = setAside === "All" || opp.set_aside === setAside;

      return matchesSearch && matchesAgency && matchesNaics && matchesSetAside;
    });
  }, [search, agency, naics, setAside]);

  const hasFilters =
    search !== "" ||
    agency !== "All Agencies" ||
    naics !== "All NAICS" ||
    setAside !== "All";

  function clearFilters() {
    setSearch("");
    setAgency("All Agencies");
    setNaics("All NAICS");
    setSetAside("All");
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {opportunities.length} opportunities
        </p>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="flex flex-1 min-w-[200px] items-center gap-2">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          <Select value={agency} onValueChange={(v) => v && setAgency(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {agencies.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={naics} onValueChange={(v) => v && setNaics(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {naicsCodes.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={setAside} onValueChange={(v) => v && setSetAside(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setAsides.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="size-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Filter className="size-10 text-muted-foreground mb-3" />
              <p className="text-lg font-medium">No opportunities found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search terms.
              </p>
              {hasFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Agency</TableHead>
                  <TableHead>NAICS</TableHead>
                  <TableHead>Set-Aside</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="max-w-[300px]">
                      <Link
                        href={`/opportunities/${opp.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {opp.title}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opp.solicitation_number}
                      </div>
                    </TableCell>
                    <TableCell>{opp.agency}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {opp.naics_code}
                    </TableCell>
                    <TableCell>
                      {opp.set_aside !== "None" ? (
                        <Badge variant="outline">{opp.set_aside}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          None
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {opp.estimated_value}
                    </TableCell>
                    <TableCell className={dueDateColor(opp.due_date)}>
                      {formatDate(opp.due_date)}
                      {daysUntil(opp.due_date) >= 0 && daysUntil(opp.due_date) <= 14 && (
                        <div className="text-xs">
                          {daysUntil(opp.due_date)} days left
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColor(opp.status)}>
                        {opp.status.charAt(0).toUpperCase() +
                          opp.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
