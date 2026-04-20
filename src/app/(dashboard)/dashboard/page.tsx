"use client";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Building2,
  Clock,
  FileText,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CircleDot,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardMetrics, opportunities } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  reviewing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  bidding: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  partnered: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  submitted: "bg-green-500/10 text-green-400 border-green-500/20",
  archived: "bg-muted text-muted-foreground",
};

const stageConfig = [
  { key: "new", label: "New", color: "bg-slate-400" },
  { key: "qualified", label: "Qualified", color: "bg-blue-400" },
  { key: "reaching_out", label: "Reaching Out", color: "bg-cyan-400" },
  { key: "teaming", label: "Teaming", color: "bg-violet-400" },
  { key: "submitted", label: "Submitted", color: "bg-green-400" },
] as const;

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const upcomingDeadlines = [...opportunities]
  .filter((o) => daysUntil(o.due_date) > 0)
  .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
  .slice(0, 5);

const recentOpportunities = opportunities.slice(0, 6);
const totalPipeline = Object.values(dashboardMetrics.pipeline_counts).reduce(
  (a, b) => a + b,
  0
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, Sarah. Here&apos;s your opportunity overview.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Opportunities",
            value: dashboardMetrics.total_opportunities,
            icon: Search,
            trend: "+12%",
            trendUp: true,
          },
          {
            label: "Tracked",
            value: dashboardMetrics.tracked_opportunities,
            icon: FileText,
            trend: "+3 this week",
            trendUp: true,
          },
          {
            label: "Saved Primes",
            value: dashboardMetrics.saved_primes,
            icon: Building2,
            trend: "2 new matches",
            trendUp: true,
          },
          {
            label: "Upcoming Deadlines",
            value: dashboardMetrics.upcoming_deadlines,
            icon: Clock,
            trend: "Next 30 days",
            trendUp: false,
          },
        ].map((metric) => (
          <Card key={metric.label} className="border-border/50 bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-foreground">
                    {metric.value}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2">
                  <metric.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <TrendingUp
                  className={cn(
                    "h-3 w-3",
                    metric.trendUp ? "text-green-400" : "text-muted-foreground"
                  )}
                />
                <span className="text-xs text-muted-foreground">
                  {metric.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Overview */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-foreground">
            Pipeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 overflow-hidden rounded-full">
            {stageConfig.map((stage) => {
              const count =
                dashboardMetrics.pipeline_counts[stage.key as keyof typeof dashboardMetrics.pipeline_counts] ?? 0;
              const pct = totalPipeline > 0 ? (count / totalPipeline) * 100 : 0;
              return (
                <div
                  key={stage.key}
                  className={cn("h-2 rounded-full transition-all", stage.color)}
                  style={{ width: `${pct}%`, minWidth: count > 0 ? "4px" : "0" }}
                />
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {stageConfig.map((stage) => {
              const count =
                dashboardMetrics.pipeline_counts[stage.key as keyof typeof dashboardMetrics.pipeline_counts] ?? 0;
              return (
                <div key={stage.key} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <CircleDot className={cn("h-2.5 w-2.5", stage.color.replace("bg-", "text-"))} />
                    <span className="text-xs text-muted-foreground">
                      {stage.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-lg font-semibold text-foreground">
                    {count}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Opportunities by Agency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={dashboardMetrics.opportunities_by_agency}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="agency"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Monthly Opportunity Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={dashboardMetrics.opportunities_by_month}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#areaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Opportunities Table */}
        <Card className="border-border/50 bg-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground">
                Recent Opportunities
              </CardTitle>
              <Link
                href="/opportunities"
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground">Title</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Agency</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Due</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Value</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOpportunities.map((opp) => {
                  const days = daysUntil(opp.due_date);
                  return (
                    <TableRow
                      key={opp.id}
                      className="border-border/50 hover:bg-accent/30"
                    >
                      <TableCell className="font-medium">
                        <Link
                          href={`/opportunities/${opp.id}`}
                          className="max-w-[200px] truncate text-sm text-foreground hover:text-primary"
                        >
                          {opp.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {opp.agency}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-xs",
                            days < 7
                              ? "font-medium text-red-400"
                              : days < 14
                              ? "font-medium text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        >
                          {days}d
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {opp.estimated_value}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs capitalize",
                            statusColors[opp.status]
                          )}
                        >
                          {opp.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground">
                Upcoming Deadlines
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((opp) => {
              const days = daysUntil(opp.due_date);
              return (
                <Link
                  key={opp.id}
                  href={`/opportunities/${opp.id}`}
                  className="flex items-start justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-accent/30"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {opp.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {opp.agency}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "shrink-0 rounded-md px-2 py-1 text-xs font-semibold",
                      days < 7
                        ? "bg-red-500/10 text-red-400"
                        : days < 14
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    )}
                  >
                    {days}d
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
