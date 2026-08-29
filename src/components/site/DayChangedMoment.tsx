import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const CHANGES = [
  { id: "food", label: "I haven't eaten much" },
  { id: "tired", label: "I'm more tired than expected" },
  { id: "schedule", label: "My schedule changed" },
  { id: "movement", label: "Movement doesn't feel realistic" },
  { id: "other", label: "Something else" },
];

const ADAPTED: Record<string, { priority: string; step: string }> = {
  food: {
    priority: "Refuel and reset.",
    step: "Choose something easy to eat or drink before deciding what the rest of the day needs.",
  },
  tired: {
    priority: "Protect your energy.",
    step: "Have something simple to drink, then choose rest or a short, gentle walk — whichever feels kinder.",
  },
  schedule: {
    priority: "Shrink the plan, keep the habit.",
    step: "Pick the ten-minute version of what you had planned and let that be enough today.",
  },
  movement: {
    priority: "Nourish instead of push.",
    step: "Swap today's movement for one manageable food or drink step, and revisit movement tomorrow.",
  },
  other: {
    priority: "Steady the day.",
    step: "Choose one small thing you can finish comfortably, then reassess how you feel.",
  },
};

/**
 * Chapter 5 — the signature Welzea moment: "My day changed."
 * Immersive Deep Teal environment; the plan adapts rather than the person failing.
 */
export function DayChangedMoment() {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const adapted = selected ? ADAPTED[selected] : null;

  return (
    <section className="relative overflow-hidden bg-forest py-20 text-forest-foreground sm:py-28">
      <div
        aria-hidden
        className="drift-slow pointer-events-none absolute -top-24 -left-20 size-[26rem] rounded-full bg-aqua/12 blur-3xl"
      />
      <div
        aria-hidden
        className="drift-slow pointer-events-none absolute -right-24 bottom-0 size-[22rem] rounded-full bg-berry/12 blur-3xl"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="flex flex-col gap-7">
          <span className="text-[0.7rem] font-bold tracking-[0.24em] text-aqua uppercase">
            The signature Welzea moment
          </span>
          <h2 className="display-hero text-[2.75rem] sm:text-6xl">
            My day
            <br />
            <span className="text-aqua">changed.</span>
          </h2>
          <div className="flex max-w-md flex-col gap-4 text-base leading-relaxed opacity-85">
            <p>
              This morning the priority was to move in a way that felt good. Then a meeting ran late, you have barely
              eaten, and you are more tired than you expected.
            </p>
            <p>Most plans treat that as a failure. Welzea is being built to treat it as new information.</p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-aqua/60 pl-5">
            <p className="font-display text-2xl leading-tight font-extrabold sm:text-3xl">You did not fail the plan.</p>
            <p className="font-display text-2xl leading-tight font-extrabold text-aqua sm:text-3xl">
              The plan adapted to you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-4">
          {/* Morning plan */}
          <article className="rounded-[1.5rem] border border-forest-foreground/15 bg-forest-foreground/[0.06] p-6">
            <span className="text-[0.68rem] font-bold tracking-[0.22em] uppercase opacity-65">This morning</span>
            <p className="mt-2 font-display text-lg font-bold">Today&rsquo;s priority: move in a way that feels good.</p>
          </article>

          {/* The interaction */}
          <div className="rounded-[1.75rem] bg-card p-6 text-card-foreground shadow-lift sm:p-8">
            {!open ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Later in the day, the original plan no longer fits. Tap below to see what happens next.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  <RotateCcw aria-hidden className="size-4" />
                  My day changed
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                    What changed?
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CHANGES.map((change) => {
                      const active = selected === change.id;
                      return (
                        <button
                          key={change.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelected(change.id)}
                          className={cn(
                            "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                            active
                              ? "border-teal bg-teal-soft text-primary"
                              : "border-border bg-secondary/50 hover:border-teal/60",
                          )}
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
                        New priority
                      </span>
                      <p className="mt-1 font-display text-2xl leading-tight font-extrabold text-primary">
                        {adapted.priority}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                        One realistic next step
                      </span>
                      <p className="mt-1 text-base leading-relaxed">{adapted.step}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Example only. General wellness support, not medical advice.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Choose one to see how the plan adapts.</p>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
