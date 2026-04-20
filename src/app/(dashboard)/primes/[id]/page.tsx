"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  Users,
  DollarSign,
  Award,
  Building2,
  Phone,
  Mail,
  Globe,
  Shield,
  Hash,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getContractorById,
  getContractorPastAwards,
  getContractorOpportunities,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(dateStr: string) {
  return Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
}

export default function PrimeDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const contractor = getContractorById(id);
  const pastAwards = getContractorPastAwards(id);
  const relatedOpps = getContractorOpportunities(id).slice(0, 4);
  const [saved, setSaved] = useState(false);

  if (!contractor) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Contractor not found</h2>
        <Link href="/primes" className="mt-3 text-sm text-primary">
          ← Back to Prime Contractors
        </Link>
      </div>
    );
  }

  const fitScore = contractor.teaming_fit_score ?? 0;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/primes"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Prime Contractors
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {contractor.name}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {contractor.location}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {contractor.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/20 bg-primary/10 text-xs text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border/50"
            onClick={() => {
              setSaved(!saved);
              toast.success(saved ? "Removed from saved" : "Contractor saved");
            }}
          >
            <Bookmark
              className={cn("mr-1.5 h-3.5 w-3.5", saved && "fill-current")}
            />
            {saved ? "Saved" : "Save"}
          </Button>
          <Button size="sm">
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Contact
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Employees",
            value: contractor.employee_count.toLocaleString(),
            icon: Users,
          },
          {
            label: "Annual Revenue",
            value: contractor.annual_revenue,
            icon: DollarSign,
          },
          {
            label: "Past Awards",
            value: contractor.past_award_count,
            icon: Award,
          },
          {
            label: "Total Award Value",
            value: contractor.past_award_value,
            icon: DollarSign,
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-4 lg:col-span-2">
          {/* Capabilities */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {contractor.capabilities.map((cap) => (
                <Badge
                  key={cap}
                  variant="outline"
                  className="border-border/50 bg-muted/30 text-xs text-foreground"
                >
                  {cap}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Agencies */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Agencies Worked With
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {contractor.agencies_worked_with.map((agency) => (
                <Badge
                  key={agency}
                  variant="outline"
                  className="border-blue-500/20 bg-blue-500/10 text-xs text-blue-400"
                >
                  {agency}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* NAICS */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Hash className="h-4 w-4" /> NAICS Codes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {contractor.naics_codes.map((code) => (
                <Badge
                  key={code}
                  variant="outline"
                  className="border-border/50 font-mono text-xs text-foreground"
                >
                  {code}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Past Awards */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Award className="h-4 w-4" /> Past Awards
                <Badge
                  variant="outline"
                  className="ml-auto border-border/50 text-xs"
                >
                  {pastAwards.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {pastAwards.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No past awards on record.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-xs text-muted-foreground">
                        Title
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground">
                        Agency
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground">
                        Value
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground">
                        Award Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastAwards.map((award) => (
                      <TableRow
                        key={award.id}
                        className="border-border/50 hover:bg-accent/30"
                      >
                        <TableCell className="text-sm text-foreground">
                          {award.title}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {award.agency}
                        </TableCell>
                        <TableCell className="text-xs font-medium text-foreground">
                          {award.value}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(award.award_date)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Teaming Fit Score */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Teaming Fit Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    fitScore >= 80
                      ? "text-green-400"
                      : fitScore >= 60
                      ? "text-yellow-400"
                      : "text-red-400"
                  )}
                >
                  {fitScore}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">/ 100</span>
              </div>
              <Progress
                value={fitScore}
                className={cn(
                  "h-2",
                  fitScore >= 80 ? "[&>*]:bg-green-400" : fitScore >= 60 ? "[&>*]:bg-yellow-400" : "[&>*]:bg-red-400"
                )}
              />
              <div className="space-y-1.5 pt-1">
                {[
                  { label: "NAICS Alignment", score: 95 },
                  { label: "Agency Overlap", score: fitScore - 5 },
                  { label: "Capability Match", score: fitScore + 3 > 100 ? 97 : fitScore + 3 },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {f.label}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {Math.min(f.score, 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contractor.contact_name ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {contractor.contact_name}
                  </div>
                  {contractor.contact_email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${contractor.contact_email}`}
                        className="text-primary hover:underline"
                      >
                        {contractor.contact_email}
                      </a>
                    </div>
                  )}
                  {contractor.contact_phone && (
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {contractor.contact_phone}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Contact info available upon request.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {[
                { label: "CAGE Code", value: contractor.cage_code, icon: Shield },
                { label: "DUNS", value: contractor.duns, icon: Hash },
                {
                  label: "Size Standard",
                  value: contractor.size_standard ?? "Small Business",
                  icon: Users,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                  <span className="font-mono text-xs text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
              {contractor.website && (
                <Separator className="border-border/50" />
              )}
              {contractor.website && (
                <a
                  href={contractor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-primary hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {contractor.website.replace("https://", "")}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>

          {/* Related Opportunities */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Related Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {relatedOpps.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No matching opportunities found.
                </p>
              ) : (
                relatedOpps.map((opp) => {
                  const days = daysUntil(opp.due_date);
                  return (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.id}`}
                      className="block rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/30"
                    >
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {opp.title}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{opp.agency}</span>
                        <span
                          className={cn(
                            days < 7
                              ? "text-red-400"
                              : days < 14
                              ? "text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-0.5 inline h-3 w-3" />
                          {days}d
                        </span>
                      </div>
                    </Link>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
