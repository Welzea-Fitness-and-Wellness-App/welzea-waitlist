import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { EXAMPLE_ONLY, SAFETY_NOTICE } from "@/lib/site-config";
import { readLead } from "@/lib/tracking";

export const Route = createFileRoute("/today-plan-demo")({
  head: () => ({
    meta: [
      { title: "Example Today Plan | Welzea" },
      {
        name: "description",
        content:
          "A simple example of how Welzea may turn a difficult day into one realistic next step. Example only, not medical advice.",
      },
      { property: "og:title", content: "Example Today Plan | Welzea" },
      {
        property: "og:description",
        content: "See how one realistic next step could work on a difficult day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TodayPlanDemoPage,
});

const QUESTIONS = [
  { key: "appetite", label: "How is your appetite today?", options: ["Normal", "Lower than usual", "Very low"] },
  { key: "feeling", label: "How are you feeling?", options: ["Feeling okay", "Mild discomfort", "Feeling unwell"] },
  {
    key: "movement",
    label: "What movement were you planning?",
    options: ["Rest day", "Walk or light movement", "Short strength session", "Full workout"],
  },
  { key: "time", label: "How much time do you realistically have?", options: ["10 minutes", "20 minutes", "45+ minutes"] },
  {
    key: "hardest",
    label: "What feels hardest today?",
    options: ["Eating enough", "Staying hydrated", "Knowing whether to train", "Restarting after missed days"],
  },
] as const;

type AnswerKey = (typeof QUESTIONS)[number]["key"];
type Answers = Partial<Record<AnswerKey, string>>;

const INTEREST = ["Yes, definitely", "Maybe, depending on the plan", "Not for me"];

const DAY_CHANGES = [
  { id: "food", label: "I haven't eaten much" },
  { id: "tired", label: "I'm more tired than expected" },
  { id: "schedule", label: "My schedule changed" },
  { id: "movement", label: "Movement doesn't feel realistic" },
  { id: "other", label: "Something else" },
] as const;

const ADAPTED_PLANS: Record<string, { priority: string; step: string; why: string }> = {
  food: {
    priority: "Refuel gently, then reassess.",
    step: "Choose something easy to eat or drink now, before deciding what else the day needs.",
    why: "When you have eaten very little, most other steps become harder. Starting with nourishment usually makes the rest of the day more manageable.",
  },
  tired: {
    priority: "Protect your energy today.",
    step: "Have something simple to drink, then choose rest or a short gentle walk — whichever feels kinder.",
    why: "Low energy days are normal. Choosing the lighter option often keeps a routine going better than pushing through and needing to recover.",
  },
  schedule: {
    priority: "Shrink the plan, keep the habit.",
    step: "Pick the ten-minute version of what you had planned, and let that be enough today.",
    why: "A smaller version of a routine is far easier to repeat than an all-or-nothing plan that no longer fits your day.",
  },
  movement: {
    priority: "Nourish instead of push.",
    step: "Swap today's movement for one manageable food or drink step, and revisit movement tomorrow.",
    why: "Movement is easier to return to when the basics are steady. Skipping today does not undo your progress.",
  },
  other: {
    priority: "Steady the day.",
    step: "Choose one small thing you can finish comfortably, then reassess how you feel.",
    why: "When something unexpected happens, a single achievable step is usually more useful than trying to rescue the whole day.",
  },
};

function buildPlan(answers: Answers) {
  const lowAppetite = answers.appetite === "Lower than usual" || answers.appetite === "Very low";
  const unwell = answers.feeling === "Feeling unwell";
  const shortTime = answers.time === "10 minutes";

  const priority = unwell
    ? "Keep things very simple: gentle nourishment, fluids, and rest come first."
    : lowAppetite
      ? "Keep things simple: focus on a manageable nourishment and hydration minimum first."
      : answers.hardest === "Restarting after missed days"
        ? "Keep things small: restart with one step you can repeat tomorrow."
        : "Keep things realistic: choose one useful step that fits the time you actually have.";

  const why = unwell
    ? "You are not feeling well today, so a lighter day is a reasonable choice. Focus on comfortable nourishment and fluids, and leave harder training for a day when you feel better."
    : lowAppetite
      ? `You have ${answers.appetite === "Very low" ? "very low" : "lower"} appetite and ${shortTime ? "very little" : "limited"} time today. Instead of trying to do everything perfectly, focus first on one manageable nourishment and hydration step, then reassess what feels realistic later.`
      : "You have some capacity today, but competing priorities can make it harder to start. Choosing one step first usually works better than trying to fix everything at once.";

  const nextStep =
    answers.hardest === "Staying hydrated"
      ? "Fill a bottle or glass you can finish comfortably, drink some now, and keep it in sight for the rest of the day."
      : answers.hardest === "Restarting after missed days"
        ? "Pick the smallest version of your usual routine — one you could repeat tomorrow — and do only that today."
        : "Choose one food or drink option you know you can tolerate, have some water, and reassess how you feel later.";

  const movement = unwell
    ? "Consider resting today, or only very gentle movement if that feels comfortable."
    : answers.movement === "Rest day"
      ? "A rest day is a valid choice. If you feel like moving, a short easy walk is enough."
      : shortTime
        ? "If you feel comfortable, choose 10 minutes of gentle movement rather than skipping it entirely."
        : "If you feel comfortable, choose gentle 10–20 minute movement or a lighter strength session instead of forcing a full workout.";

  return { priority, why, nextStep, movement };
}

function TodayPlanDemoPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [showPlan, setShowPlan] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  const [adaptOpen, setAdaptOpen] = useState(false);
  const [dayChange, setDayChange] = useState<string | null>(null);
  const adapted = dayChange ? ADAPTED_PLANS[dayChange] : null;

  const allAnswered = QUESTIONS.every((q) => answers[q.key]);
  const plan = buildPlan(answers);

  async function saveFeedback(felt: boolean, interestLevel?: string) {
    const lead = readLead();
    await supabase.from("demo_feedback").insert({
      email: lead?.email ?? null,
      felt_realistic: felt,
      interest_level: interestLevel ?? null,
      answers,
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="container-page flex max-w-3xl flex-col gap-10 py-16">
        <header className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-semibold tracking-widest text-foreground uppercase">
            {EXAMPLE_ONLY}
          </span>
          <h1 className="text-3xl font-extrabold text-balance-tight sm:text-4xl">
            A simple example of a Welzea Today Plan.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This example shows how Welzea may help turn a difficult day into one realistic next step.
          </p>
        </header>

        {!showPlan ? (
          <div className="flex flex-col gap-8">
            {QUESTIONS.map((question, index) => (
              <fieldset key={question.key} className="flex flex-col gap-3">
                <legend className="mb-1 font-semibold">
                  <span className="mr-2 text-sm text-muted-foreground">{index + 1}.</span>
                  {question.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => {
                    const selected = answers[question.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setAnswers((prev) => ({ ...prev, [question.key]: option }))}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-sage"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <Button size="lg" disabled={!allAnswered} onClick={() => setShowPlan(true)}>
              Show example Today Plan
            </Button>
            {!allAnswered ? (
              <p className="text-xs text-muted-foreground">Choose an option for each question to continue.</p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <article className="surface-card flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">Today's priority</h2>
                <p className="font-display text-xl font-bold">{plan.priority}</p>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h3 className="text-xs font-semibold tracking-widest text-primary uppercase">Why this may help</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{plan.why}</p>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h3 className="text-xs font-semibold tracking-widest text-primary uppercase">
                  One practical next step
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{plan.nextStep}</p>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h3 className="text-xs font-semibold tracking-widest text-primary uppercase">Movement</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{plan.movement}</p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-sage-soft p-4">
                <h3 className="text-xs font-semibold tracking-widest text-primary uppercase">Remember</h3>
                <p className="text-sm leading-relaxed text-foreground">
                  A difficult day does not mean you have failed your routine. The goal is to make the next step
                  realistic enough to repeat.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{EXAMPLE_ONLY}</p>
            </article>

            {/* Adaptive loop — the signature Welzea moment */}
            <section className="surface-card flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex flex-col gap-1">
                <span className="text-[0.68rem] font-bold tracking-[0.22em] text-teal uppercase">
                  Life happens
                </span>
                <h2 className="font-display text-xl font-extrabold">Has your day changed?</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  If today stopped going to plan, you do not start again from zero. The plan adapts instead.
                </p>
              </div>

              {!adaptOpen ? (
                <Button className="w-fit rounded-full px-7" onClick={() => setAdaptOpen(true)}>
                  My day changed
                </Button>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                      What changed?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {DAY_CHANGES.map((change) => {
                        const active = dayChange === change.id;
                        return (
                          <button
                            key={change.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setDayChange(change.id)}
                            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                              active
                                ? "border-teal bg-teal-soft text-primary"
                                : "border-border bg-card text-foreground hover:border-teal/60"
                            }`}
                          >
                            {change.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {adapted ? (
                    <div className="flex flex-col gap-4 border-t border-border pt-5">
                      <p className="text-sm font-semibold">That is okay. Let&rsquo;s adjust the plan.</p>
                      <div className="rounded-2xl bg-teal-soft/70 p-5">
                        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-primary uppercase">
                          Updated priority
                        </span>
                        <p className="mt-1 font-display text-2xl leading-tight font-extrabold text-primary">
                          {adapted.priority}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                          One realistic next step
                        </span>
                        <p className="text-base leading-relaxed">{adapted.step}</p>
                      </div>
                      <div className="flex flex-col gap-1 border-t border-border pt-4">
                        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                          Why this may help
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground">{adapted.why}</p>
                      </div>
                      <p className="text-sm font-medium text-primary">
                        You did not fail the plan. The plan adapted to you.
                      </p>
                      <p className="text-xs text-muted-foreground">{EXAMPLE_ONLY}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Choose one to see how the plan adapts.</p>
                  )}
                </div>
              )}
            </section>


            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setFeedbackSent(true);
                  void saveFeedback(true);
                }}
              >
                That feels realistic
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPlan(false);
                  setFeedbackSent(false);
                  setInterest(null);
                  setAdaptOpen(false);
                  setDayChange(null);
                }}
              >
                Change my answers
              </Button>
              <Button asChild variant="secondary">
                <Link to="/" hash="early-access">
                  Join the early-access list
                </Link>
              </Button>
            </div>

            {feedbackSent ? (
              <section className="surface-card flex flex-col gap-4 p-6">
                <p className="font-semibold">
                  Thank you. This is exactly the kind of feedback that will help shape Welzea.
                </p>
                <p className="text-sm text-muted-foreground">Would you want this kind of daily support?</p>
                <div className="flex flex-wrap gap-2">
                  {INTEREST.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={interest === option}
                      onClick={() => {
                        setInterest(option);
                        void saveFeedback(true, option);
                      }}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        interest === option
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-sage"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {interest ? <p className="text-sm text-success">Thanks — noted.</p> : null}
              </section>
            ) : null}
          </div>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">{SAFETY_NOTICE}</p>
      </main>

      <SiteFooter />
    </div>
  );
}
