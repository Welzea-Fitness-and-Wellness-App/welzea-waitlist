import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Abstract "too much information → one calm priority" visual.
 * Original abstract shapes only — no real or identifiable app interfaces.
 */
export function ClutterToClarity() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setClear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setClear(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fragment = "absolute rounded-xl border border-forest-foreground/15 bg-forest-foreground/[0.06]";
  const drift = "transition-all duration-[1400ms] ease-out";

  return (
    <div ref={ref} aria-hidden className="relative h-72 w-full sm:h-80">
      {/* scattered abstract fragments that move outward and fade */}
      <div
        className={cn(
          fragment,
          drift,
          "top-2 left-2 h-16 w-32",
          clear ? "-translate-x-6 -translate-y-4 opacity-0" : "opacity-100",
        )}
      >
        <div className="flex h-full items-end gap-1.5 p-3">
          {[40, 70, 30, 85, 55].map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-full bg-forest-foreground/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          fragment,
          drift,
          "top-24 left-10 h-20 w-40",
          clear ? "-translate-x-10 translate-y-4 opacity-0" : "opacity-100",
        )}
      >
        <div className="flex h-full flex-col justify-center gap-2 p-3">
          {[90, 70, 50].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full bg-forest-foreground/25" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <div
        className={cn(
          fragment,
          drift,
          "top-6 left-44 h-24 w-24",
          clear ? "-translate-y-8 translate-x-4 opacity-0" : "opacity-100",
        )}
      >
        <div className="grid h-full grid-cols-4 grid-rows-4 gap-1 p-2.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="rounded-[3px] bg-forest-foreground/20" />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "absolute size-9 rounded-full border border-coral/40 bg-coral/25",
          drift,
          "top-40 left-52",
          clear ? "translate-x-8 translate-y-6 opacity-0" : "opacity-100",
        )}
      />
      <div
        className={cn(
          "absolute size-6 rounded-full border border-amber/40 bg-amber/25",
          drift,
          "top-12 left-2",
          clear ? "-translate-x-6 translate-y-10 opacity-0" : "opacity-100",
        )}
      />
      <div
        className={cn(
          fragment,
          drift,
          "top-52 left-4 h-14 w-28",
          clear ? "translate-y-10 opacity-0" : "opacity-100",
        )}
      >
        <div className="flex h-full flex-col justify-center gap-1.5 p-3">
          {[1, 2].map((i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="size-2 rounded-[2px] border border-forest-foreground/30" />
              <span className="h-1 w-14 rounded-full bg-forest-foreground/25" />
            </span>
          ))}
        </div>
      </div>

      {/* the one calm card */}
      <div
        className={cn(
          "absolute top-1/2 right-0 w-64 -translate-y-1/2 rounded-3xl border border-forest-foreground/20 bg-forest-foreground/[0.09] p-5 backdrop-blur-sm transition-all duration-[1400ms] ease-out sm:w-72",
          clear ? "scale-100 opacity-100 blur-0" : "scale-95 opacity-60 blur-[2px]",
        )}
      >
        <span className="text-[0.68rem] font-bold tracking-[0.18em] uppercase opacity-70">Today Plan</span>
        <p className="mt-3 font-display text-lg leading-snug font-bold">One priority. One next step.</p>
        <div className="mt-4 flex flex-col gap-2">
          <span className="h-1.5 w-full rounded-full bg-aqua/60" />
          <span className="h-1.5 w-3/5 rounded-full bg-forest-foreground/25" />
        </div>
      </div>
    </div>
  );
}
