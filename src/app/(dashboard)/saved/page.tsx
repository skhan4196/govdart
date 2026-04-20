"use client";

import { useState } from "react";
import { Bell, Search, Trash2, Plus, Play, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { savedSearches as initialSearches } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const alertTypes = [
  { id: "new_matches", label: "New Opportunity Matches", description: "Notified when new opportunities match your saved searches" },
  { id: "deadlines", label: "Deadline Reminders", description: "Reminders 14 and 7 days before tracked opportunity deadlines" },
  { id: "status_changes", label: "Status Updates", description: "When tracked opportunities change status on SAM.gov" },
  { id: "new_awards", label: "New Prime Awards", description: "When saved prime contractors receive new contract awards" },
];

export default function SavedPage() {
  const [searches, setSearches] = useState(initialSearches);
  const [alertToggles, setAlertToggles] = useState<Record<string, boolean>>(
    searches.reduce((acc, s) => ({ ...acc, [s.id]: s.alert_enabled }), {})
  );
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [frequency, setFrequency] = useState("daily");
  const [checkedAlertTypes, setCheckedAlertTypes] = useState<Record<string, boolean>>({
    new_matches: true,
    deadlines: true,
    status_changes: false,
    new_awards: true,
  });

  const deleteSearch = (id: string) => {
    setSearches((prev) => prev.filter((s) => s.id !== id));
    toast.success("Search deleted");
  };

  const toggleAlert = (id: string) => {
    setAlertToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    toast.success(alertToggles[id] ? "Alert disabled" : "Alert enabled");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Saved Searches & Alerts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your saved filters and notification preferences
          </p>
        </div>
        <Button size="sm" onClick={() => toast.info("Search builder coming soon")}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          New Search
        </Button>
      </div>

      <Tabs defaultValue="searches">
        <TabsList className="border border-border/50 bg-card">
          <TabsTrigger value="searches">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Saved Searches
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="mr-1.5 h-3.5 w-3.5" />
            Alert Preferences
          </TabsTrigger>
        </TabsList>

        {/* Saved Searches */}
        <TabsContent value="searches" className="mt-4 space-y-3">
          {searches.length === 0 ? (
            <Card className="border-border/50 bg-card">
              <CardContent className="flex flex-col items-center py-16">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm font-medium text-foreground">
                  No saved searches
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Save a search from the Opportunities page to see it here.
                </p>
                <Button size="sm" className="mt-4">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Create First Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            searches.map((search) => (
              <Card key={search.id} className="border-border/50 bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">
                          {search.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            search.alert_frequency === "instant"
                              ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                              : search.alert_frequency === "daily"
                              ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                              : "border-border/50 text-muted-foreground"
                          )}
                        >
                          {search.alert_frequency}
                        </Badge>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.entries(search.filters).map(([key, val]) => (
                          <Badge
                            key={key}
                            variant="outline"
                            className="border-border/50 text-xs text-muted-foreground"
                          >
                            {key}:{" "}
                            <span className="ml-1 text-foreground">
                              {Array.isArray(val) ? val.join(", ") : val}
                            </span>
                          </Badge>
                        ))}
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Created{" "}
                        {new Date(search.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Alerts
                        </span>
                        <Switch
                          checked={alertToggles[search.id]}
                          onCheckedChange={() => toggleAlert(search.id)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border/50"
                        onClick={() => toast.info("Running search...")}
                      >
                        <Play className="mr-1.5 h-3.5 w-3.5" />
                        Run
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteSearch(search.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Alert Preferences */}
        <TabsContent value="alerts" className="mt-4 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Notification Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  desc: "Receive alerts via email",
                  val: emailAlerts,
                  set: setEmailAlerts,
                },
                {
                  label: "Push Notifications",
                  desc: "Browser push notifications",
                  val: pushAlerts,
                  set: setPushAlerts,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={item.val}
                    onCheckedChange={(v) => {
                      item.set(v);
                      toast.success(`${item.label} ${v ? "enabled" : "disabled"}`);
                    }}
                  />
                </div>
              ))}

              <div className="space-y-1.5 pt-1">
                <Label className="text-sm font-medium text-foreground">
                  Alert Frequency
                </Label>
                <Select value={frequency} onValueChange={(v) => v && setFrequency(v)}>
                  <SelectTrigger className="border-border/50 bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Alert Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertTypes.map((type) => (
                <div key={type.id} className="flex items-start gap-3">
                  <Checkbox
                    id={type.id}
                    checked={checkedAlertTypes[type.id]}
                    onCheckedChange={(v) =>
                      setCheckedAlertTypes((prev) => ({
                        ...prev,
                        [type.id]: !!v,
                      }))
                    }
                    className="mt-0.5"
                  />
                  <div>
                    <label
                      htmlFor={type.id}
                      className="cursor-pointer text-sm font-medium text-foreground"
                    >
                      {type.label}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            onClick={() => toast.success("Alert preferences saved")}
            className="w-full sm:w-auto"
          >
            Save Preferences
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
