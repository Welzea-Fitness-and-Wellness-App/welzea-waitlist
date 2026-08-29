import { ArrowDown } from "lucide-react";

import { CheckInPanel } from "@/components/site/CheckInPanel";
import { PriorityPanel } from "@/components/site/PriorityPanel";
import { Reveal } from "@/components/site/Reveal";

const STORY_GROUPS = [
  {
    label: "How's your appetite today?",
    options: ["Normal", "Lower than usual", "Nothing sounds appealing"],
    selected: "Lower than usual",
  },
  {
    label: "How much space do you have today?",
    options: ["I've got time", "Busy", "Everything is chaos"],
    selected: "Busy",
  },
  {
    label: "What were you hoping to do?",
    options: ["Move", "Rest", "Not sure yet"],
    selected: "Move",
  },
];

/**
 * Chapter 4 — one connected product narrative: context → understanding → clarity → action.
 */
export function ProductStory() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="drift-slow pointer-events-none absolute top-1/4 -left-32 size-[28rem] rounded-full bg-teal/10 blur-3xl"
      />

      <div className="container-page relative flex flex-col gap-14">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <span className="eyebrow">The Welzea loop</span>
          <h2 className="display-hero text-4xl text-balance-tight sm:text-[3.5rem]">
            Start with the day you are actually having.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Two short moments — one where you say how today feels, and one where today comes into focus.
          </p>
        </Reveal>

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_auto_1.15fr] lg:items-start lg:gap-8">
          <Reveal className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="display-hero text-5xl text-teal/30">01</span>
              <h3 className="font-display text-xl leading-tight font-extrabold">A short, human check-in</h3>
            </div>
            <CheckInPanel greeting="Step one" question="How is today going?" groups={STORY_GROUPS} />
          </Reveal>

          <div aria-hidden className="flex items-center justify-center lg:mt-40 lg:flex-col">
            <span className="hidden h-24 w-px bg-gradient-to-b from-transparent via-teal/50 to-transparent lg:block" />
            <ArrowDown className="size-6 rotate-0 text-teal lg:rotate-[-90deg]" />
            <span className="hidden h-24 w-px bg-gradient-to-b from-teal/50 via-transparent to-transparent lg:block" />
          </div>

          <Reveal delay={140} className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="display-hero text-5xl text-berry/30">02</span>
              <h3 className="font-display text-xl leading-tight font-extrabold">Today comes into focus</h3>
            </div>
            <PriorityPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
