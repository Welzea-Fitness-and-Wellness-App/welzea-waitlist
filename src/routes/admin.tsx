import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, LogOut, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Early-access dashboard | Welzea" },
      { name: "description", content: "Internal Welzea dashboard for waitlist leads, campaigns, and research interest." },
      { property: "og:title", content: "Early-access dashboard | Welzea" },
      { property: "og:description", content: "Internal use only." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  first_name: string;
  email: string;
  marketing_opt_in: boolean;
  referral_code: string;
  referred_by: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null
  referrer: string | null;
  landing_page: string | null;
  created_at: string;
};

type Qualification = {
  id: string;
  email: string | null;
  lives_in_uk: string | null;
  uses_glp1: string | null;
  glp1_duration: string | null;
  hardest_now: string[];
  current_support: string[];
  routine_story: string | null;
  one_decision: string | null;
  research_interest: string | null;
  created_at: string;
};

type Feedback = {
  id: string;
  email: string | null;
  felt_realistic: boolean | null;
  interest_level: string | null;
  created_at: string;
};

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]!);
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((h) => escape(row[h])).join(","))].join("\n");
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="surface-card flex flex-col gap-1 p-4">
      <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</span>
      <span className="font-display text-2xl font-extrabold">{value}</span>
    </div>
  );
}

function GroupTable({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <div className="surface-card flex flex-col gap-3 p-5">
      <h3 className="text-sm font-bold">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-2 text-sm">
          {rows.map(([key, count]) => (
            <li key={key} className="flex justify-between gap-4 border-b border-border pb-1 last:border-0">
              <span className="truncate text-muted-foreground">{key}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [leadRes, qualRes, feedbackRes] = await Promise.all([
      supabase.from("waitlist_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("qualification_responses").select("*").order("created_at", { ascending: false }),
      supabase.from("demo_feedback").select("*").order("created_at", { ascending: false }),
    ]);
    setLeads((leadRes.data as Lead[] | null) ?? []);
    setQualifications((qualRes.data as Qualification[] | null) ?? []);
    setFeedback((feedbackRes.data as Feedback[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (!data.session) {
        void navigate({ to: "/auth" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id);
      const admin = (roles ?? []).some((row) => row.role === "admin");
      setIsAdmin(admin);
      setChecking(false);
      if (admin) void loadData();
    })();
    return () => {
      active = false;
    };
  }, [navigate, loadData]);

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((lead) =>
      [lead.first_name, lead.email, lead.utm_source, lead.utm_campaign, lead.referred_by]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [leads, search]);

  const group = (values: (string | null)[]) => {
    const counts = new Map<string, number>();
    for (const value of values) {
      const key = value?.trim() || "(none)";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Checking access…</div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="font-display text-2xl font-extrabold">No dashboard access</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          This account is signed in but does not have the admin role. Ask an existing admin to grant access.
        </p>
        <Button
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            void navigate({ to: "/auth" });
          }}
        >
          <LogOut className="size-4" /> Sign out
        </Button>
      </div>
    );
  }

  const researchYes = qualifications.filter((q) => q.research_interest?.startsWith("Yes")).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container-page flex h-16 items-center justify-between">
          <span className="font-display font-extrabold text-primary">{siteConfig.brand} dashboard</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => void loadData()} disabled={loading}>
              <RefreshCw className="size-4" /> Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                void navigate({ to: "/auth" });
              }}
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-page flex flex-col gap-8 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total leads" value={leads.length} />
          <Stat label="Marketing opt-ins" value={leads.filter((l) => l.marketing_opt_in).length} />
          <Stat label="Qualification answers" value={qualifications.length} />
          <Stat label="Open to research" value={researchYes} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <GroupTable title="Top sources" rows={group(leads.map((l) => l.utm_source))} />
          <GroupTable title="Top campaigns" rows={group(leads.map((l) => l.utm_campaign))} />
          <GroupTable title="Referral codes used" rows={group(leads.map((l) => l.referred_by))} />
        </div>

        <Tabs defaultValue="leads">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="qualification">Qualification</TabsTrigger>
            <TabsTrigger value="feedback">Demo feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Input
                placeholder="Search name, email, source, campaign…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sm:max-w-sm"
              />
              <Button
                variant="secondary"
                onClick={() => downloadCsv("welzea-waitlist-leads.csv", filteredLeads as unknown as Record<string, unknown>[])}
                disabled={filteredLeads.length === 0}
              >
                <Download className="size-4" /> Export CSV
              </Button>
            </div>
            <div className="surface-card overflow-x-auto">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead className="bg-secondary/60 text-xs tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Opt-in</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Campaign</th>
                    <th className="px-4 py-3">Ref code</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-t border-border">
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3">{lead.first_name}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.marketing_opt_in ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.utm_source ?? "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.utm_campaign ?? "—"}</td>
                      <td className="px-4 py-3 font-mono text-xs">{lead.referral_code}</td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No leads yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="qualification" className="flex flex-col gap-4">
            <Button
              variant="secondary"
              className="w-fit"
              onClick={() =>
                downloadCsv("welzea-qualification.csv", qualifications as unknown as Record<string, unknown>[])
              }
              disabled={qualifications.length === 0}
            >
              <Download className="size-4" /> Export CSV
            </Button>
            <div className="flex flex-col gap-3">
              {qualifications.map((row) => (
                <article key={row.id} className="surface-card flex flex-col gap-2 p-5 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold">{row.email ?? "(no email given)"}</span>
                    <span className="text-muted-foreground">
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    UK: {row.lives_in_uk ?? "—"} · GLP-1: {row.uses_glp1 ?? "—"} · Duration: {row.glp1_duration ?? "—"} ·
                    Research: {row.research_interest ?? "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Hardest now:</span> {row.hardest_now.join(", ") || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Using:</span> {row.current_support.join(", ") || "—"}
                  </p>
                  {row.routine_story ? (
                    <p className="text-muted-foreground">“{row.routine_story}”</p>
                  ) : null}
                  {row.one_decision ? <p className="text-muted-foreground">“{row.one_decision}”</p> : null}
                </article>
              ))}
              {qualifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No qualification answers yet.</p>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="flex flex-col gap-4">
            <Button
              variant="secondary"
              className="w-fit"
              onClick={() => downloadCsv("welzea-demo-feedback.csv", feedback as unknown as Record<string, unknown>[])}
              disabled={feedback.length === 0}
            >
              <Download className="size-4" /> Export CSV
            </Button>
            <div className="surface-card overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-secondary/60 text-xs tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Felt realistic</th>
                    <th className="px-4 py-3">Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((row) => (
                    <tr key={row.id} className="border-t border-border">
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(row.created_at).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-3">{row.email ?? "—"}</td>
                      <td className="px-4 py-3">{row.felt_realistic ? "Yes" : "—"}</td>
                      <td className="px-4 py-3">{row.interest_level ?? "—"}</td>
                    </tr>
                  ))}
                  {feedback.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        No demo feedback yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
