import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { logEvent, readLead } from "@/lib/tracking";

export const Route = createFileRoute("/qualify")({
  head: () => ({
    meta: [
      { title: "Help shape Welzea | Optional early-access questions" },
      {
        name: "description",
        content:
          "Optional questions for Welzea early-access members about what is genuinely difficult when building routines alongside GLP-1 medication.",
      },
      { property: "og:title", content: "Help shape Welzea" },
      {
        property: "og:description",
        content: "Tell us what is difficult, so we build the most useful support first.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QualifyPage,
});

const YES_NO = ["Yes", "No", "Prefer not to say"];
const DURATIONS = [
  "Less than 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months",
  "Prefer not to say",
];
const HARDEST = [
  "Knowing what to eat when appetite is low",
  "Getting enough balanced nutrition without logging everything",
  "Knowing whether to train, rest, or adapt movement",
  "Staying consistent when work, travel, family, or life gets in the way",
  "Managing hydration and simple daily habits",
  "Restarting after missed days or weeks",
  "Understanding what matters most when I have several goals",
  "Maintaining progress over time",
  "Something else",
];
const SUPPORT = [
  "Medication provider or clinic",
  "GP, dietitian, nutritionist, personal trainer, or coach",
  "Noom",
  "WeightWatchers",
  "MyFitnessPal or another food tracker",
  "Apple Health / Apple Watch",
  "Fitbit, Garmin, Oura, WHOOP, or another wearable",
  "Online communities or social media",
  "ChatGPT, Perplexity, or another AI assistant",
  "I mostly figure it out myself",
  "Other",
];
const RESEARCH = ["Yes, I would like to help test", "Maybe later", "No, updates only"];

function RadioRow({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option;
        return (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-sage"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

function CheckRow({
  options,
  values,
  onToggle,
  max,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
  max?: number;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = values.includes(option);
        const disabled = !selected && max !== undefined && values.length >= max;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-left text-sm transition-colors ${
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-sage"
            } ${disabled ? "opacity-45" : ""}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function QualifyPage() {
  const storedLead = typeof window !== "undefined" ? readLead() : null;
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState(storedLead?.email ?? "");
  const [livesInUk, setLivesInUk] = useState("");
  const [usesGlp1, setUsesGlp1] = useState("");
  const [duration, setDuration] = useState("");
  const [hardest, setHardest] = useState<string[]>([]);
  const [support, setSupport] = useState<string[]>([]);
  const [routineStory, setRoutineStory] = useState("");
  const [oneDecision, setOneDecision] = useState("");
  const [research, setResearch] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, value: string, max?: number) {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
      return;
    }
    if (max !== undefined && list.length >= max) return;
    setList([...list, value]);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!consent) {
      setError("Please give consent so we can use your answers for product research.");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("qualification_responses").insert({
      email: email.trim().toLowerCase() || null,
      lives_in_uk: livesInUk || null,
      uses_glp1: usesGlp1 || null,
      glp1_duration: duration || null,
      hardest_now: hardest,
      current_support: support,
      routine_story: routineStory.trim() || null,
      one_decision: oneDecision.trim() || null,
      research_interest: research || null,
      consent_given: true,
    });
    setSubmitting(false);
    if (insertError) {
      setError("We could not save your answers. Please try again in a moment.");
      return;
    }
    logEvent("qualification_submitted");
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteNav />
        <main className="container-page flex max-w-2xl flex-1 flex-col items-start gap-6 py-20">
          <h1 className="text-3xl font-extrabold text-balance-tight">
            Thank you. Your answers will help shape what Welzea builds first.
          </h1>
          <p className="text-muted-foreground">
            We will be in touch with early-access updates and, where relevant, research invitations.
          </p>
          <Button asChild size="lg">
            <Link to="/today-plan-demo">Try an example Today Plan</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="container-page flex max-w-3xl flex-col gap-10 py-16">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-balance-tight sm:text-4xl">Help us shape Welzea.</h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Your answers will help us understand what is actually difficult about building routines alongside GLP-1
            medication.
          </p>
          <p className="rounded-xl bg-sand-soft p-4 text-sm leading-relaxed text-foreground">
            This is optional. Do not share anything you are uncomfortable sharing. Welzea is not a medical service and
            does not provide medical advice.
          </p>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            {step === 1 ? "Step 1 of 2: Your current experience" : "Step 2 of 2: What you need most"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {step === 1 ? (
            <>
              <div className="flex flex-col gap-2">
                <Label htmlFor="qualify-email">Your email address (so we can match your answers)</Label>
                <Input
                  id="qualify-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">Do you currently live in the UK?</legend>
                <RadioRow name="uk" options={YES_NO} value={livesInUk} onChange={setLivesInUk} />
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">
                  Are you currently using GLP-1 medication prescribed by a qualified clinician?
                </legend>
                <RadioRow name="glp1" options={YES_NO} value={usesGlp1} onChange={setUsesGlp1} />
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">
                  Roughly how long have you been using GLP-1 medication?
                </legend>
                <RadioRow name="duration" options={DURATIONS} value={duration} onChange={setDuration} />
              </fieldset>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">
                  Which feels most difficult right now?{" "}
                  <span className="font-normal text-muted-foreground">(choose up to two)</span>
                </legend>
                <CheckRow
                  options={HARDEST}
                  values={hardest}
                  max={2}
                  onToggle={(v) => toggle(hardest, setHardest, v, 2)}
                />
              </fieldset>

              <Button type="button" size="lg" onClick={() => setStep(2)}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">What are you currently using for support?</legend>
                <CheckRow options={SUPPORT} values={support} onToggle={(v) => toggle(support, setSupport, v)} />
              </fieldset>

              <div className="flex flex-col gap-2">
                <Label htmlFor="routine-story">
                  Think about the last time your normal routine did not work. What happened, and what decision did you
                  struggle to make?
                </Label>
                <Textarea
                  id="routine-story"
                  rows={5}
                  value={routineStory}
                  onChange={(e) => setRoutineStory(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="one-decision">
                  If Welzea could help with one decision on a difficult day, what would that be?
                </Label>
                <Textarea
                  id="one-decision"
                  rows={5}
                  value={oneDecision}
                  onChange={(e) => setOneDecision(e.target.value)}
                />
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">
                  Would you be open to a short research call or testing an early version?
                </legend>
                <RadioRow name="research" options={RESEARCH} value={research} onChange={setResearch} />
              </fieldset>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5"
                  aria-label="Research consent"
                />
                <span>
                  I consent to Welzea using the health-related information I have voluntarily provided on this form to
                  understand my suitability for product research and early testing. I understand that I can withdraw my
                  consent.
                </span>
              </label>

              {error ? (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? "Saving…" : "Save my answers"}
                </Button>
                <Button type="button" size="lg" variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
            </>
          )}
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
