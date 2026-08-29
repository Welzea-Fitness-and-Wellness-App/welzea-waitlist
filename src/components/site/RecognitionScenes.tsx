import cardAppetite from "@/assets/card-appetite.jpg";
import cardMovement from "@/assets/card-movement.jpg";
import cardPriorities from "@/assets/card-priorities.jpg";
import cardRoutine from "@/assets/card-routine.jpg";
import { Reveal } from "@/components/site/Reveal";

/**
 * Chapter 2 — four real-life moments told as editorial scenes.
 * Deliberately varied: overlay, split, tall, and layered compositions.
 */
export function RecognitionScenes() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Scene 1 — large overlay composition */}
      <Reveal className="group relative overflow-hidden rounded-[2rem] lg:col-span-7">
        <img
          src={cardAppetite}
          alt="A glass of water and a small plain bowl on a sunlit dining table at home"
          loading="lazy"
          width={1024}
          height={768}
          className="media-zoom h-[22rem] w-full object-cover group-hover:scale-[1.04] sm:h-[26rem]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-forest-foreground sm:p-8">
          <span className="text-[0.68rem] font-bold tracking-[0.22em] uppercase opacity-80">Lower appetite</span>
          <h3 className="font-display text-2xl leading-tight font-extrabold sm:text-3xl">
            Your usual meals do not feel realistic.
          </h3>
          <p className="max-w-md text-sm leading-relaxed opacity-85">
            You still want to support your routine — the plan you made this morning just no longer fits your appetite.
          </p>
        </div>
      </Reveal>

      {/* Scene 2 — split layout */}
      <Reveal delay={120} className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card lg:col-span-5">
        <div className="overflow-hidden">
          <img
            src={cardRoutine}
            alt="An open laptop, packed bag and keys on a warm wooden table by a window"
            loading="lazy"
            width={1024}
            height={768}
            className="media-zoom h-48 w-full object-cover group-hover:scale-[1.04] sm:h-56"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6">
          <span className="text-[0.68rem] font-bold tracking-[0.22em] text-berry uppercase">
            The day got away from you
          </span>
          <h3 className="font-display text-xl leading-tight font-extrabold">Work, family, travel, fatigue.</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            An unexpectedly busy day quietly rewrote the plan you started with.
          </p>
        </div>
      </Reveal>

      {/* Scene 3 — text-led with offset image */}
      <Reveal delay={80} className="lg:col-span-5">
        <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] bg-secondary/60 p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <span className="text-[0.68rem] font-bold tracking-[0.22em] text-teal uppercase">
              Train, rest, or adapt?
            </span>
            <h3 className="font-display text-2xl leading-tight font-extrabold sm:text-[1.75rem]">
              You intended to move. Today does not feel like a normal day.
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pushing through and stopping altogether both feel wrong, so the decision gets postponed.
            </p>
          </div>
          <div className="group overflow-hidden rounded-2xl">
            <img
              src={cardMovement}
              alt="Everyday trainers and a light walking jacket by an open hallway door"
              loading="lazy"
              width={1024}
              height={768}
              className="media-zoom h-40 w-full object-cover group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </Reveal>

      {/* Scene 4 — layered wide composition */}
      <Reveal delay={160} className="group relative overflow-hidden rounded-[2rem] lg:col-span-7">
        <img
          src={cardPriorities}
          alt="A notebook, mug, phone, child's drawing and headphones arranged on a linen surface"
          loading="lazy"
          width={1024}
          height={768}
          className="media-zoom h-[20rem] w-full object-cover group-hover:scale-[1.04] sm:h-full"
        />
        <div className="absolute inset-0 flex items-end p-5 sm:p-7">
          <div className="max-w-sm rounded-2xl bg-card/92 p-5 shadow-lift backdrop-blur-sm">
            <span className="text-[0.68rem] font-bold tracking-[0.22em] text-amber uppercase">
              Too many things matter
            </span>
            <h3 className="mt-2 font-display text-xl leading-tight font-extrabold">
              Nutrition, hydration, strength, sleep, routine.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              All important. All asking for attention at the same time.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
