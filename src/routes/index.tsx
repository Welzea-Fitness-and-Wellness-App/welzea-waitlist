import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Quote } from "lucide-react";

import communityImage from "@/assets/community-conversation.jpg";
import heroImage from "@/assets/hero-morning.jpg";
import { CheckInPanel } from "@/components/site/CheckInPanel";
import { DayChangedMoment } from "@/components/site/DayChangedMoment";
import { EvidenceSection } from "@/components/site/EvidenceSection";
import { NoiseToClarity } from "@/components/site/NoiseToClarity";
import { PatternsSection } from "@/components/site/PatternsSection";
import { ProductStory } from "@/components/site/ProductStory";
import { RecognitionScenes } from "@/components/site/RecognitionScenes";
import { Reveal } from "@/components/site/Reveal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { captureAttribution } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welzea — support that adapts to the day you're having" },
      {
        name: "description",
        content:
          "Join the UK early-access list for Welzea: adaptive daily support for nutrition, strength and routine alongside prescribed GLP-1 medication. One priority, one realistic next step.",
      },
      { property: "og:title", content: "Welzea — support that adapts to the day you're having" },
      {
        property: "og:description",
        content:
          "UK early access now open. When your day changes, your plan should change with it. General wellness support only, not medical advice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const PILLS = [
  "No calorie counting",
  "No streaks to protect",
  "No dashboards to decode",
  "No guilt when life changes",
];

const FAQS = [
  {
    q: "What is Welzea?",
    a: "Welzea is an early-stage wellness-support product being explored for people using prescribed GLP-1 medication. It is designed around one simple question: “What is the most realistic and useful thing to focus on today?”",
  },
  {
    q: "What does “adaptive support” actually mean?",
    a: "It means the plan is expected to change when your day changes. If your appetite drops, your energy fades, or your schedule falls apart, you can tell Welzea your day changed and get a new priority — rather than being marked as off track.",
  },
  {
    q: "Is Welzea available now?",
    a: "Not yet. We are currently building the early-access community and testing the first version of the experience.",
  },
  {
    q: "Is Welzea medical advice?",
    a: "No. Welzea provides general wellness support only. It does not provide medical advice, diagnosis, prescribing, medication dosing, treatment recommendations, or emergency support.",
  },
  {
    q: "Will Welzea tell me how to take my medication?",
    a: "No. For medication questions, side effects, dosage questions, or medical concerns, speak to your prescriber, pharmacist, GP, or another appropriate healthcare professional.",
  },
  {
    q: "Will I need to track calories or log every meal?",
    a: "No. Welzea is being designed to reduce tracking burden, not create more of it. The goal is to explore how little information is needed to provide useful daily support.",
  },
  {
    q: "Do I need a wearable such as Apple Watch, Oura, Fitbit, Garmin, or WHOOP?",
    a: "No. The first experience should be useful without a wearable. Optional integrations may be explored later only if they clearly improve the product.",
  },
  {
    q: "Who can join the early-access list?",
    a: "The first Welzea community is focused on adults aged 18+ living in the UK. We are especially interested in people who are currently using prescribed GLP-1 medication and want to build sustainable routines alongside treatment.",
  },
];

const COMMUNITY_INVITES = [
  "Share a short survey",
  "Take part in a research conversation",
  "Test an early Today Plan experience",
  "Give honest feedback on what feels useful, unrealistic, or missing",
  "Receive first access when Welzea is ready",
];

function LandingPage() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main>
        {/* CHAPTER 1 — RECOGNITION */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="drift-slow pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-aqua/15 blur-3xl"
          />
          <div
            aria-hidden
            className="drift-slow pointer-events-none absolute top-1/3 -right-28 size-[22rem] rounded-full bg-amber/12 blur-3xl"
          />

          <div className="container-page relative grid items-center gap-16 py-14 lg:grid-cols-12 lg:py-20">
            <div className="flex flex-col gap-9 lg:col-span-7">
              <Reveal className="flex flex-col gap-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                  <span aria-hidden className="size-2 rounded-full bg-teal" />
                  UK early access · now open
                </span>
                <h1 className="display-hero text-[2.7rem] text-balance-tight sm:text-7xl lg:text-[5.25rem]">
                  Some days go
                  <br />
                  to plan.
                  <br />
                  <span className="text-teal">Most days don&rsquo;t.</span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Welzea is being built as adaptive support for adults using prescribed GLP-1 medication — nutrition,
                  strength and routine that adjust to the day you are actually having.
                </p>

                <ul className="flex flex-col gap-3.5">
                  <li className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-10 shrink-0 bg-aqua sm:w-14" />
                    <p className="text-lg font-medium sm:text-2xl">
                      Your appetite <span className="text-aqua italic">changed</span>.
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-10 shrink-0 bg-berry sm:w-14" />
                    <p className="text-lg font-medium sm:text-2xl">
                      Your energy <span className="text-berry italic">dipped</span>.
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <span aria-hidden className="h-px w-10 shrink-0 bg-amber sm:w-14" />
                    <p className="text-lg font-medium sm:text-2xl">
                      Your plan should <span className="text-amber italic">follow</span>.
                    </p>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={140} className="flex flex-col gap-6">
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="min-h-13 rounded-full px-9 text-base font-bold">
                    <a href="#early-access">Claim your early-access place</a>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="group min-h-12 justify-start text-base font-semibold text-primary hover:bg-transparent"
                  >
                    <Link to="/today-plan-demo">
                      <span className="border-b-2 border-teal/30 pb-0.5 transition-colors group-hover:border-teal">
                        Try the adaptive demo
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="ml-2 size-4 text-teal transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </Button>
                </div>
                <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
                  For adults aged 18+ living in the UK. Welzea is in early development and provides general wellness
                  support only — not medical advice.
                </p>
              </Reveal>
            </div>

            <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
              <Reveal delay={120} className="relative w-full max-w-[27rem]">
                <div className="offset-card relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <img
                    src={heroImage}
                    alt="An adult standing at a sunlit home kitchen counter with a warm drink, thinking about the day ahead"
                    width={1024}
                    height={1280}
                    className="size-full object-cover"
                  />
                </div>

                <div className="float-slow relative mx-auto -mt-12 w-full max-w-[19rem] lg:absolute lg:-bottom-14 lg:-left-24 lg:mt-0 lg:w-[17rem] lg:rotate-2">
                  <CheckInPanel />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CHAPTER 2 — IMMERSION: real moments */}
        <section id="why-welzea" className="py-16 sm:py-24 lg:pt-28">
          <div className="container-page flex flex-col gap-12">
            <Reveal className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.22em] text-berry uppercase">Real life, not linear</span>
                <h2 className="display-hero text-4xl text-balance-tight sm:text-[3.25rem]">
                  Your medication doesn&rsquo;t live in a vacuum.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                GLP-1 treatment is a powerful tool — it is not a whole routine. Between the clinic and the kitchen, real
                life happens. These are the moments where good intentions quietly fall apart.
              </p>
            </Reveal>

            <RecognitionScenes />
          </div>
        </section>

        {/* CHAPTER 3 — THE DIFFERENCE: noise to clarity */}
        <section className="border-y border-border bg-sand-soft py-16 sm:py-24">
          <div className="container-page grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-7">
              <span className="eyebrow">The difference</span>
              <h2 className="display-hero text-4xl text-balance-tight sm:text-[3.25rem]">
                Everything you need. Nothing you have to log.
              </h2>
              <div className="flex max-w-xl flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Most tools answer a question you did not ask: how well did you perform yesterday? They add numbers,
                  targets and streaks — and a quiet sense of falling behind.
                </p>
                <p className="text-foreground">
                  Welzea is being explored around one question instead: what is realistic and useful for you today?
                </p>
              </div>
              <ul className="flex flex-wrap gap-3">
                {PILLS.map((pill) => (
                  <li key={pill} className="rounded-full border border-input bg-card px-4 py-2 text-sm font-medium">
                    {pill}
                  </li>
                ))}
              </ul>
            </Reveal>
            <NoiseToClarity />
          </div>
        </section>

        {/* EARLY CONVERSION BAND */}
        <section className="py-12 sm:py-16">
          <div className="container-page">
            <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-12 shadow-lift sm:px-12 sm:py-14">
              <span aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-1.5" />
              <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-[0.22em] text-teal uppercase">Founding waitlist</span>
                  <h2 className="font-display text-3xl leading-[1.08] font-extrabold sm:text-[2.5rem]">
                    Two fields. No medication details. Nothing to log.
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    Be first in line for the UK early-access group — plus invitations to shape what Welzea becomes.
                    Unsubscribe anytime.
                  </p>
                </div>
                <div className="rounded-3xl bg-secondary/40 p-6 sm:p-8">
                  <WaitlistForm formId="hero" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CHAPTER 4 — PRODUCT STORY */}
        <ProductStory />

        {/* CHAPTER 5 — MY DAY CHANGED */}
        <DayChangedMoment />

        {/* CHAPTER 6 — TRY IT */}
        <section className="py-16 sm:py-24">
          <div className="container-page">
            <Reveal className="flex flex-col items-center gap-6 text-center">
              <span className="eyebrow">Interactive example</span>
              <h2 className="max-w-2xl display-hero text-4xl text-balance-tight sm:text-[3.25rem]">
                See how today would adapt to you.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Answer a few simple questions, get one priority and one realistic next step — then tell it your day
                changed and watch the plan move with you. Example only, not medical advice.
              </p>
              <Button asChild size="lg" className="min-h-13 rounded-full px-9 text-base font-bold">
                <Link to="/today-plan-demo">Try the adaptive demo</Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* CHAPTER 7 — PATTERNS */}
        <PatternsSection />

        {/* CHAPTER 8 — EVIDENCE */}
        <EvidenceSection />

        {/* FOUNDING COMMUNITY */}
        <section className="py-16 sm:py-24">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="flex flex-col gap-6">
              <span className="eyebrow">Founding community</span>
              <h2 className="max-w-xl display-hero text-4xl text-balance-tight sm:text-5xl">
                Built with you, not just for you.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                The earliest Welzea members will help us understand what is genuinely difficult about building
                sustainable routines alongside GLP-1 treatment.
              </p>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {COMMUNITY_INVITES.map((item) => (
                  <li key={item} className="flex gap-2 rounded-xl bg-secondary/60 p-3">
                    <span aria-hidden className="text-teal">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-fit rounded-full px-8">
                <a href="#early-access">Join the UK early-access list</a>
              </Button>
            </Reveal>

            <Reveal delay={140} className="relative">
              <div className="organic-frame aspect-[4/3] border-[10px] border-card shadow-lift">
                <img
                  src={communityImage}
                  alt="Two adults sitting at a kitchen table having a relaxed conversation with a notebook"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="size-full object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 -z-10 size-32 rounded-full border border-berry/20 bg-sand"
              />
            </Reveal>
          </div>
        </section>

        {/* EARLY ACCESS FORM */}
        <section id="early-access" className="border-t border-border bg-card/60 py-16 sm:py-24">
          <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="flex flex-col gap-4">
              <span className="eyebrow">Join Welzea</span>
              <h2 className="display-hero text-4xl text-balance-tight sm:text-5xl">Get in before the doors open.</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Get early access updates, opportunities to shape the product, and invitations to test the first version
                of Welzea.
              </p>
              <p className="text-xs text-muted-foreground">
                No spam. Early access, product research invitations, and launch updates only. Unsubscribe anytime.
              </p>
            </Reveal>
            <Reveal delay={120} className="surface-card p-6 sm:p-8">
              <WaitlistForm formId="footer" />
            </Reveal>
          </div>
        </section>

        {/* FOUNDER NOTE */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden
            className="drift-slow pointer-events-none absolute top-10 -left-24 size-[24rem] rounded-full bg-teal/10 blur-3xl"
          />
          <div className="container-page relative max-w-3xl">
            <Reveal className="flex flex-col gap-6">
              <Quote aria-hidden className="size-14 text-teal/25" strokeWidth={1.25} />
              <h2 className="display-hero text-4xl sm:text-5xl">Why we&rsquo;re building Welzea.</h2>
              <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Health routines often fail not because people lack information, but because real life changes faster
                  than their plan.
                </p>
                <p>
                  When appetite changes, routines break down, energy is low, or a busy week gets in the way, another
                  dashboard rarely solves the problem.
                </p>
                <p className="text-foreground">
                  Welzea is being explored around a simpler idea: helping people decide what is realistic and useful
                  today.
                </p>
                <p>
                  The early-access community will help shape what Welzea becomes — and help us learn what it should not
                  become.
                </p>
              </div>
              <p className="font-display text-xl font-semibold text-primary italic">— Team Welzea</p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t border-border py-16 sm:py-24">
          <div className="container-page max-w-3xl">
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow">FAQ</span>
              <h2 className="display-hero text-4xl sm:text-5xl">Straight answers, no fine print.</h2>
              <span aria-hidden className="brand-gradient mt-2 h-0.5 w-20 rounded-full opacity-70" />
            </Reveal>
            <Reveal delay={100}>
              <Accordion type="single" collapsible className="mt-8">
                {FAQS.map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q} className="border-border">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
