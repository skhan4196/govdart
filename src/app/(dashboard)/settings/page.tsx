"use client";

import { useState } from "react";
import { Save, Plus, X, Check, CreditCard, User, Building2, Bell, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const certifications = [
  { id: "8a", label: "8(a)" },
  { id: "hubzone", label: "HUBZone" },
  { id: "sdvosb", label: "SDVOSB" },
  { id: "wosb", label: "WOSB" },
  { id: "sb", label: "Small Business" },
  { id: "sdb", label: "SDB" },
];

const proFeatures = [
  "Up to 500 saved opportunities",
  "Advanced filtering & sorting",
  "Pipeline management",
  "Prime contractor profiles",
  "5 saved searches with alerts",
  "CSV exports",
  "Priority email support",
];

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Sarah Kim",
    email: "sarah.kim@techedgefederal.com",
    phone: "(571) 555-0193",
    title: "Director of Business Development",
  });
  const [company, setCompany] = useState({
    name: "TechEdge Federal Solutions",
    cageCode: "7H3X9",
    duns: "193847562",
    website: "https://techedgefederal.com",
    location: "Reston, VA",
    employeeCount: "85",
    annualRevenue: "$12M",
    sizeStandard: "Small Business",
  });
  const [naicsCodes, setNaicsCodes] = useState([
    "541511",
    "541512",
    "541519",
    "541611",
  ]);
  const [newNaics, setNewNaics] = useState("");
  const [activeCerts, setActiveCerts] = useState<string[]>(["sb", "sdvosb"]);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const save = (section: string) => toast.success(`${section} saved`);

  const toggleCert = (id: string) => {
    setActiveCerts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addNaics = () => {
    const code = newNaics.trim();
    if (code && !naicsCodes.includes(code)) {
      setNaicsCodes((prev) => [...prev, code]);
      setNewNaics("");
    }
  };

  const removeNaics = (code: string) => {
    setNaicsCodes((prev) => prev.filter((c) => c !== code));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and company preferences
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="border border-border/50 bg-card">
          <TabsTrigger value="profile">
            <User className="mr-1.5 h-3.5 w-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="mr-1.5 h-3.5 w-3.5" />
            Company
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings2 className="mr-1.5 h-3.5 w-3.5" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="mr-1.5 h-3.5 w-3.5" />
            Subscription
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-4">
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                  SK
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/50"
                    onClick={() => toast.info("Upload photo coming soon")}
                  >
                    Change Avatar
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>
              <Separator className="border-border/50" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "fullName" as const },
                  { label: "Email Address", key: "email" as const },
                  { label: "Phone Number", key: "phone" as const },
                  { label: "Job Title", key: "title" as const },
                ].map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      {field.label}
                    </Label>
                    <Input
                      value={profile[field.key]}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, [field.key]: e.target.value }))
                      }
                      className="border-border/50 bg-muted/30"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => save("Profile")}>
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company */}
        <TabsContent value="company" className="mt-4 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Company Name", key: "name" as const },
                  { label: "Website", key: "website" as const },
                  { label: "CAGE Code", key: "cageCode" as const },
                  { label: "DUNS Number", key: "duns" as const },
                  { label: "Location", key: "location" as const },
                  { label: "Employee Count", key: "employeeCount" as const },
                  { label: "Annual Revenue", key: "annualRevenue" as const },
                  { label: "Size Standard", key: "sizeStandard" as const },
                ].map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      {field.label}
                    </Label>
                    <Input
                      value={company[field.key]}
                      onChange={(e) =>
                        setCompany((c) => ({ ...c, [field.key]: e.target.value }))
                      }
                      className="border-border/50 bg-muted/30"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">NAICS Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {naicsCodes.map((code) => (
                  <Badge
                    key={code}
                    variant="outline"
                    className="border-border/50 font-mono text-sm"
                  >
                    {code}
                    <button
                      onClick={() => removeNaics(code)}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newNaics}
                  onChange={(e) => setNewNaics(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNaics()}
                  placeholder="Add NAICS code..."
                  className="max-w-[160px] border-border/50 bg-muted/30 font-mono text-sm"
                  maxLength={6}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/50"
                  onClick={addNaics}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {certifications.map((cert) => {
                  const active = activeCerts.includes(cert.id);
                  return (
                    <button
                      key={cert.id}
                      onClick={() => toggleCert(cert.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                      {cert.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="sm" onClick={() => save("Company information")}>
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="mt-4 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  desc: "Receive opportunity alerts and digest emails",
                  val: emailNotifs,
                  set: setEmailNotifs,
                },
                {
                  label: "Deadline Reminders",
                  desc: "Alerts 14 and 7 days before tracked deadlines",
                  val: deadlineReminders,
                  set: setDeadlineReminders,
                },
                {
                  label: "Weekly Digest",
                  desc: "Weekly summary of new opportunities and activity",
                  val: weeklyDigest,
                  set: setWeeklyDigest,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription */}
        <TabsContent value="subscription" className="mt-4 space-y-4">
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Current Plan
                </CardTitle>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Professional
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">$149</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Separator className="border-border/50" />
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Saved Opportunities</span>
                  <span>127 / 500</span>
                </div>
                <Progress value={25} className="h-1.5" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Saved Searches</span>
                  <span>5 / 5</span>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => toast.info("Enterprise contact form coming soon")}
                >
                  Upgrade to Enterprise
                </Button>
                <Button
                  variant="outline"
                  className="border-border/50"
                  onClick={() => toast.info("Billing portal coming soon")}
                >
                  <CreditCard className="mr-1.5 h-3.5 w-3.5" />
                  Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
