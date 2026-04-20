"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Calendar,
  DollarSign,
  ArrowRight,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { opportunities as initialOpps } from "@/lib/data";
import type { Opportunity, PipelineStage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const columns: { key: PipelineStage; label: string; accent: string; bg: string }[] = [
  { key: "new", label: "New", accent: "border-slate-400", bg: "bg-slate-400" },
  { key: "qualified", label: "Qualified", accent: "border-blue-400", bg: "bg-blue-400" },
  { key: "reaching_out", label: "Reaching Out", accent: "border-cyan-400", bg: "bg-cyan-400" },
  { key: "teaming", label: "Teaming", accent: "border-violet-400", bg: "bg-violet-400" },
  { key: "submitted", label: "Submitted", accent: "border-green-400", bg: "bg-green-400" },
];

const stageLabels: Record<PipelineStage, string> = {
  new: "New",
  qualified: "Qualified",
  reaching_out: "Reaching Out",
  teaming: "Teaming",
  submitted: "Submitted",
};

function daysUntil(dateStr: string) {
  return Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
}

export default function PipelinePage() {
  const [opps, setOpps] = useState<Opportunity[]>(initialOpps);

  const moveToStage = (id: string, stage: PipelineStage) => {
    setOpps((prev) =>
      prev.map((o) => (o.id === id ? { ...o, pipeline_stage: stage } : o))
    );
    toast.success(`Moved to ${stageLabels[stage]}`);
  };

  const totalValue = opps.reduce((sum, o) => {
    const parsed = parseFloat(
      o.estimated_value.replace(/[^0-9.]/g, "")
    );
    return sum + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  return (
    <div className="flex h-full flex-col space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Pipeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your opportunity workflow from discovery to submission
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card px-4 py-2 text-sm">
          <div>
            <span className="text-muted-foreground">Total Opportunities </span>
            <span className="font-semibold text-foreground">{opps.length}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div>
            <span className="text-muted-foreground">Total Value </span>
            <span className="font-semibold text-foreground">
              ${totalValue.toFixed(0)}M+
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colOpps = opps.filter((o) => o.pipeline_stage === col.key);
          return (
            <div
              key={col.key}
              className="flex min-w-[280px] flex-shrink-0 flex-col gap-2"
            >
              {/* Column Header */}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border border-t-2 border-border/50 bg-card px-3 py-2.5",
                  col.accent
                )}
              >
                <span className="text-sm font-medium text-foreground">
                  {col.label}
                </span>
                <Badge
                  variant="outline"
                  className="ml-auto border-border/50 text-xs"
                >
                  {colOpps.length}
                </Badge>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {colOpps.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/50 p-6 text-center">
                    <p className="text-xs text-muted-foreground">No opportunities</p>
                  </div>
                ) : (
                  colOpps.map((opp) => {
                    const days = daysUntil(opp.due_date);
                    return (
                      <Card
                        key={opp.id}
                        className="border-border/50 bg-card transition-shadow hover:shadow-md hover:shadow-black/20"
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-tight text-foreground line-clamp-2">
                              {opp.title}
                            </p>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel className="text-xs">
                                  Move to stage
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {columns
                                  .filter((c) => c.key !== col.key)
                                  .map((c) => (
                                    <DropdownMenuItem
                                      key={c.key}
                                      onClick={() =>
                                        moveToStage(opp.id, c.key)
                                      }
                                    >
                                      <div
                                        className={cn(
                                          "mr-2 h-2 w-2 rounded-full",
                                          c.bg
                                        )}
                                      />
                                      {c.label}
                                    </DropdownMenuItem>
                                  ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => window.location.href = `/opportunities/${opp.id}`}>
                                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                  View Detail
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            <span>{opp.agency}</span>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <DollarSign className="h-3 w-3" />
                              <span>{opp.estimated_value}</span>
                            </div>
                            <div
                              className={cn(
                                "flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium",
                                days < 7
                                  ? "bg-red-500/10 text-red-400"
                                  : days < 14
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Calendar className="h-3 w-3" />
                              {days}d
                            </div>
                          </div>

                          {opp.set_aside !== "None" && (
                            <div className="mt-2">
                              <Badge
                                variant="outline"
                                className="border-border/50 text-[10px] text-muted-foreground"
                              >
                                {opp.set_aside}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
