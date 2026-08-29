import { cn } from "@/lib/utils";

/**
 * The moment Welzea turns context into one clear decision.
 * No scores, no charts, no "AI analysed your data" language.
 */
export function PriorityPanel({
  noticed = "Your appetite is lower today and your schedule is already full.",
  priority = "Keep nourishment simple.",
  priorityNote = "You do not need to solve everything at once.",
  nextStep = "Choose one manageable food or drink option first. Then reassess what movement feels right.",
  why = "Lower appetite and a full day make big plans harder to keep. Starting with something achievable usually works better than trying to rescue the whole day at once.",
  label = "Today",
  className,
}: {
  noticed?: string;
  priority?: string;
  priorityNote?: string;
  nextStep?: string;
  why?: string;
  label?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-6 rounded-[1.75rem] border border-border bg-card p-6 shadow-lift sm:p-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="brand-gradient absolute inset-x-6 top-0 h-1 rounded-full opacity-80 sm:inset-x-8"
      />

      <div className="flex flex-col gap-2">
        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
          What Welzea noticed
        </span>
        <p className="text-sm leading-relaxed">{noticed}</p>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-teal-soft/70 p-5">
        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-primary uppercase">
          {label}&rsquo;s priority
        </span>
        <p className="font-display text-2xl leading-tight font-extrabold text-primary">{priority}</p>
        <p className="text-sm text-muted-foreground">{priorityNote}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
          One realistic next step
        </span>
        <p className="text-base leading-relaxed">{nextStep}</p>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-5">
        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
          Why this may help
        </span>
        <p className="text-sm leading-relaxed text-muted-foreground">{why}</p>
      </div>
    </article>
  );
}
