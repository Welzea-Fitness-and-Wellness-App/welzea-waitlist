import { Reveal } from "@/components/site/Reveal";

const PATTERNS = [
  "On lower-appetite days, one simple option tends to work better for you than a full meal.",
  "Short movement after work seems to feel more realistic than morning sessions.",
  "When your day is chaotic, hydration is usually the first thing to slip.",
];

/**
 * Chapter 7 — quiet continuity. Human-readable observations, never a dashboard.
 */
export function PatternsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="flex flex-col gap-5">
          <span className="eyebrow">Over time</span>
          <h2 className="display-hero text-4xl text-balance-tight sm:text-5xl">
            Small patterns can become clearer.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Welzea is not being built to start from scratch every morning. As you use it, it is intended to remember
            what tends to work for you — in plain language, not scores or graphs.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These are illustrative examples of the kind of observation Welzea may offer. They are not predictions,
            diagnoses, or medical advice.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-4">
          {PATTERNS.map((pattern, index) => (
            <article
              key={pattern}
              className="flex gap-5 rounded-[1.5rem] border border-border bg-card p-6 shadow-soft"
            >
              <span
                aria-hidden
                className="mt-1 h-full w-1 shrink-0 rounded-full"
                style={{
                  background: ["var(--teal)", "var(--aqua)", "var(--amber)"][index % 3],
                }}
              />
              <div className="flex flex-col gap-2">
                <span className="text-[0.68rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
                  What Welzea may notice
                </span>
                <p className="text-base leading-relaxed">{pattern}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
