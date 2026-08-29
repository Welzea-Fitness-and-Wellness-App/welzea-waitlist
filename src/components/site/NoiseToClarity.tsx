import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Chapter 3 — abstract "noise" fragments drift outward and fade as the
 * section enters view, leaving one calm Welzea decision in the centre.
 * All fragments are original abstract elements, never competitor interfaces.
 */
const FRAGMENTS = [
  { text: "Log every meal", x: "-9rem", y: "-11rem", tone: "text-berry" },
  { text: "3 goals behind", x: "8rem", y: "-9.5rem", tone: "text-coral" },
  { text: "Streak at risk", x: "-11rem", y: "-3rem", tone: "text-amber" },
  { text: "Daily target 68%", x: "10.5rem", y: "-1rem", tone: "text-berry" },
  { text: "Weekly review due", x: "-9.5rem", y: "9rem", tone: "text-coral" },
  { text: "Hydration reminder", x: "8.5rem", y: "10.5rem", tone: "text-amber" },
  { text: "Steps below average", x: "-1rem", y: "-13.5rem", tone: "text-berry" },
  { text: "Plan missed", x: "2rem", y: "13.5rem", tone: "text-coral" },
];

export function NoiseToClarity({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setCalm(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCalm(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative flex min-h-[30rem] items-center justify-center", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FRAGMENTS.map((fragment) => (
          <span
            key={fragment.text}
            className={cn(
              "noise-fragment absolute top-1/2 left-1/2 rounded-full border border-current/25 bg-card/80 px-3 py-1.5 text-[0.7rem] font-semibold whitespace-nowrap",
              fragment.tone,
              calm && "noise-fragment-out",
            )}
            style={
              {
                "--fx": fragment.x,
                "--fy": fragment.y,
              } as React.CSSProperties
            }
          >
            {fragment.text}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "relative w-full max-w-[19rem] rounded-[1.75rem] border border-border bg-card p-6 text-center shadow-lift transition-all duration-1000 sm:p-8",
          calm ? "scale-100 opacity-100" : "scale-95 opacity-70",
        )}
      >
        <span aria-hidden className="brand-gradient mx-auto mb-4 block h-1 w-12 rounded-full" />
        <p className="font-display text-2xl leading-tight font-extrabold text-primary sm:text-3xl">One priority.</p>
        <p className="font-display text-2xl leading-tight font-extrabold text-teal sm:text-3xl">
          One realistic next step.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Not everything has to be solved today.</p>
      </div>
    </div>
  );
}
