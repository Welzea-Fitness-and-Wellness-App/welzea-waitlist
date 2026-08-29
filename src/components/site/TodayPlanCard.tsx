import { Sparkle } from "lucide-react";

import { EXAMPLE_ONLY } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Original Welzea Today Plan preview card.
 * One priority, one realistic next step. No charts, metrics or medical imagery.
 */
export function TodayPlanCard({
  priority = "Keep it simple today.",
  nextStep = "Choose one manageable nourishment and hydration option first, then reassess what movement feels right.",
  className,
}: {
  priority?: string;
  nextStep?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="brand-gradient absolute -inset-px rounded-[calc(var(--radius)+10px)] opacity-25 blur-[2px]"
      />
      <article className="surface-card relative flex flex-col gap-6 p-6 sm:p-8">
        <header className="flex items-center justify-between gap-4">
          <span className="eyebrow">Today Plan</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold text-accent-foreground">
            <Sparkle aria-hidden className="size-3" />
            Example
          </span>
        </header>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Today&rsquo;s priority
          </span>
          <p className="font-display text-2xl leading-snug font-bold text-foreground">{priority}</p>
        </div>

        <div className="relative flex flex-col gap-2 rounded-xl bg-secondary/70 p-4">
          <span aria-hidden className="absolute top-4 bottom-4 left-0 w-0.5 rounded-full bg-teal" />
          <span className="pl-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            One realistic next step
          </span>
          <p className="pl-3 text-[0.95rem] leading-relaxed text-foreground">{nextStep}</p>
        </div>

        <p className="text-xs text-muted-foreground">{EXAMPLE_ONLY}</p>
      </article>
    </div>
  );
}
