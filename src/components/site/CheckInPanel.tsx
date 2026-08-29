import { cn } from "@/lib/utils";

type Group = {
  label: string;
  options: string[];
  selected: string;
};

const MORNING_GROUPS: Group[] = [
  { label: "Appetite", options: ["Normal", "Lower", "Not sure"], selected: "Lower" },
  { label: "Energy", options: ["Good", "Low", "In between"], selected: "In between" },
  { label: "Your day", options: ["Manageable", "Busy", "Chaotic"], selected: "Busy" },
];

/**
 * Original Welzea check-in interface moment.
 * Warm, human, touch-friendly — deliberately not a medical questionnaire.
 */
export function CheckInPanel({
  className,
  greeting = "Good morning",
  question = "How is today looking?",
  groups = MORNING_GROUPS,
}: {
  className?: string;
  greeting?: string;
  question?: string;
  groups?: Group[];
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-5 rounded-[1.75rem] border border-border bg-card p-5 shadow-lift sm:p-6",
        className,
      )}
    >
      <header className="flex flex-col gap-1">
        <span className="text-[0.68rem] font-bold tracking-[0.22em] text-teal uppercase">{greeting}</span>
        <p className="font-display text-xl leading-tight font-extrabold">{question}</p>
      </header>

      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = option === group.selected;
                return (
                  <span
                    key={option}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      active
                        ? "border-teal bg-teal-soft text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground",
                    )}
                  >
                    {option}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="flex items-center gap-2 border-t border-border pt-4">
        <span aria-hidden className="brand-gradient h-1 w-10 rounded-full" />
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
          Example interface. General wellness support only.
        </p>
      </footer>
    </article>
  );
}
