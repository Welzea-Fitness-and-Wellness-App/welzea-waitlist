import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LIMITATIONS = [
  "Lean mass is not the same as a direct measure of muscle function or strength.",
  "Individual outcomes vary considerably between people.",
  "Outcomes can be influenced by medication, nutrition, activity, starting health, age, and other factors.",
  "Welzea is not a treatment, diagnosis, prescribing, or medical advice service.",
];

const SOURCES = [
  {
    label: "Ida Jensen S. et al. — Lean body mass changes with GLP-1 receptor agonist treatment (meta-analysis)",
    href: "https://pubmed.ncbi.nlm.nih.gov/38724000/",
  },
  {
    label: "NICE — Overweight and obesity management guideline (NG246)",
    href: "https://www.nice.org.uk/guidance/ng246",
  },
  {
    label: "NHS — Physical activity guidelines for adults",
    href: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-adults-19-to-64/",
  },
];

/**
 * Chapter 8 — a calm, honest editorial data moment. Credible, never fear-based.
 */
export function EvidenceSection() {
  return (
    <section className="border-y border-border bg-sand-soft py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="flex flex-col gap-6">
          <span className="eyebrow">Why routine matters alongside treatment</span>
          <h2 className="display-hero text-4xl text-balance-tight sm:text-5xl">
            Being honest about what is known.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              GLP-1 treatment can affect appetite, food preferences, routine, and everyday movement. That can make
              daily decisions harder — especially when you are trying to build habits that last.
            </p>
            <p>
              This is why Welzea focuses on nutrition, strength, and routine support rather than on medication itself.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-9">
            <p className="display-hero text-6xl text-teal sm:text-7xl">~25%</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Average proportion of total weight loss represented by lean mass in one GLP-1 receptor agonist
              meta-analysis. Individual outcomes vary.
            </p>
          </div>

          <Accordion type="single" collapsible className="rounded-[1.5rem] border border-border bg-card px-5">
            <AccordionItem value="research" className="border-none">
              <AccordionTrigger className="py-5 text-left text-sm font-bold">
                View research and limitations
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5 pb-6 text-sm leading-relaxed text-muted-foreground">
                <ul className="flex flex-col gap-2">
                  {LIMITATIONS.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <span className="text-[0.68rem] font-bold tracking-[0.22em] text-primary uppercase">Sources</span>
                  {SOURCES.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-teal/40 underline-offset-4 hover:decoration-teal"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
