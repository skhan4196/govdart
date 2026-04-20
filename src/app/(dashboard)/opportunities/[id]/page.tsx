"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Building2,
  DollarSign,
  MapPin,
  FileText,
  Tag,
  Paperclip,
  StickyNote,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOpportunityById, getRecommendedPrimes, notes } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  reviewing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  bidding: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  partnered: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  submitted: "bg-green-500/10 text-green-400 border-green-500/20",
  archived: "bg-muted text-muted-foreground",
};

const setAsideColors: Record<string, string> = {
  "Small Business": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "8(a)": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  HUBZone: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  SDVOSB: "bg-green-500/10 text-green-400 border-green-500/20",
  WOSB: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  None: "bg-muted text-muted-foreground",
};

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

export default function OpportunityDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const opp = getOpportunityById(id);
  const recommendedPrimes = getRecommendedPrimes(id).slice(0, 4);
  const oppNotes = notes.filter(
    (n) => n.entity_type === "opportunity" && n.entity_id === id
  );
  const [newNote, setNewNote] = useState("");
  const [savedNote, setSavedNote] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(opp?.pipeline_stage ?? "new");
  const [tracked, setTracked] = useState(false);

  if (!opp) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">
          Opportunity not found
        </h2>
        <Link href="/opportunities" className="mt-3 text-sm text-primary">
          ← Back to Opportunities
        </Link>
      </div>
    );
  }

  const days = daysUntil(opp.due_date);

  const detailRows = [
    { label: "Agency", value: opp.agency, icon: Building2 },
    { label: "Sub-Agency", value: opp.sub_agency ?? "N/A", icon: Building2 },
    { label: "Solicitation No.", value: opp.solicitation_number, icon: FileText },
    { label: "Contract Type", value: opp.contract_type, icon: Tag },
    { label: "NAICS Code", value: opp.naics_code, icon: Tag },
    { label: "Set-Aside", value: opp.set_aside, icon: CheckCircle2 },
    { label: "Est. Value", value: opp.estimated_value, icon: DollarSign },
    { label: "Place of Performance", value: opp.place_of_performance, icon: MapPin },
    { label: "Posted", value: formatDate(opp.posted_date), icon: Calendar },
    { label: "Due Date", value: formatDate(opp.due_date), icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/opportunities"
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Opportunities
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={cn("capitalize", statusColors[opp.status])}
              >
                {opp.status}
              </Badge>
              <Badge
                variant="outline"
                className={cn(setAsideColors[opp.set_aside])}
              >
                {opp.set_aside}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  days < 7
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : days < 14
                    ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                    : "border-green-500/20 bg-green-500/10 text-green-400"
                )}
              >
                <Calendar className="mr-1 h-3 w-3" />
                {days} days remaining
              </Badge>
            </div>
            <h1 className="text-xl font-semibold text-foreground">{opp.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {opp.solicitation_number}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border/50"
              onClick={() => {
                setTracked(!tracked);
                toast.success(
                  tracked ? "Removed from saved" : "Saved to pipeline"
                );
              }}
            >
              <Bookmark
                className={cn("mr-1.5 h-3.5 w-3.5", tracked && "fill-current")}
              />
              {tracked ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Two-column Layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left: Main Content */}
        <div className="space-y-4 lg:col-span-2">
          {/* Details */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {detailRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-2">
                    <row.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{row.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {opp.description}
              </p>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Paperclip className="h-4 w-4" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {opp.attachments.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/50 py-8 text-center">
                  <Paperclip className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No attachments available
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Check SAM.gov for official solicitation documents
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {opp.attachments.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-border/50 p-3 text-sm text-foreground"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <StickyNote className="h-4 w-4" /> Internal Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {oppNotes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-border/50 bg-muted/30 p-3"
                >
                  <p className="text-sm text-foreground">{note.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(note.created_at)}
                  </p>
                </div>
              ))}
              {oppNotes.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No notes yet. Add your first note below.
                </p>
              )}
              <Separator className="border-border/50" />
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note about this opportunity..."
                className="min-h-[80px] border-border/50 bg-muted/30 text-sm"
              />
              <Button
                size="sm"
                onClick={() => {
                  if (newNote.trim()) {
                    setSavedNote(true);
                    setNewNote("");
                    toast.success("Note saved");
                    setTimeout(() => setSavedNote(false), 2000);
                  }
                }}
              >
                {savedNote ? "Saved!" : "Save Note"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                onClick={() => {
                  setTracked(true);
                  toast.success("Opportunity tracked in pipeline");
                }}
              >
                <Target className="mr-2 h-4 w-4" />
                Track Opportunity
              </Button>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">Pipeline Stage</p>
                <Select value={pipelineStage} onValueChange={(v) => v && setPipelineStage(v as typeof pipelineStage)}>
                  <SelectTrigger className="border-border/50 bg-muted/30 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="reaching_out">Reaching Out</SelectItem>
                    <SelectItem value="teaming">Teaming</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {opp.url && (
                <a href={opp.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-border/50">
                    View on SAM.gov ↗
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>

          {/* Recommended Primes */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Recommended Prime Contractors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedPrimes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No prime contractors matched for this NAICS code.
                </p>
              ) : (
                recommendedPrimes.map((prime) => (
                  <Link
                    key={prime.id}
                    href={`/primes/${prime.id}`}
                    className="flex items-start gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/30"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {prime.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {prime.location}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            (prime.teaming_fit_score ?? 0) >= 80
                              ? "border-green-500/20 bg-green-500/10 text-green-400"
                              : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                          )}
                        >
                          {prime.teaming_fit_score}% fit
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          NAICS {opp.naics_code}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
