import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Welzea early access" },
      {
        name: "description",
        content:
          "The terms that apply when you use the Welzea early-access website and join the UK waitlist community.",
      },
      { property: "og:title", content: "Terms of Use | Welzea" },
      { property: "og:description", content: "Terms for using the Welzea early-access website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="container-page flex max-w-3xl flex-col gap-10 py-16">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Terms of Use</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {siteConfig.termsLastUpdated}. This is an editable template and should be reviewed by a
            qualified adviser before launch.
          </p>
        </header>

        <Section title="About this website">
          <p>
            This website describes {siteConfig.brand}, a product in early development, and allows adults aged 18 or over
            living in the UK to join an early-access list. Features described here may change or may not be released.
          </p>
        </Section>

        <Section title="No medical advice">
          <p>
            {siteConfig.brand} provides general wellness information only. Nothing on this website is medical advice,
            diagnosis, treatment, prescribing, medication dosing guidance, or emergency support. Always speak to your
            prescriber, pharmacist, GP, or another appropriate healthcare professional about medication or medical
            questions. If you have severe or urgent symptoms, seek urgent medical help.
          </p>
        </Section>

        <Section title="Example content">
          <p>
            The example Today Plan is a demonstration of a possible experience. It is fictional, is not based on your
            personal data, and must not be relied on as guidance.
          </p>
        </Section>

        <Section title="Using the early-access list">
          <p>
            Please provide accurate information and only join if you are aged 18 or over and live in the UK. Do not
            submit anyone else's personal information. You can unsubscribe or ask us to remove your details at any time.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Do not misuse this website, attempt to disrupt it, or use it for unlawful purposes. We may suspend access
            where necessary to protect the service or other people.
          </p>
        </Section>

        <Section title="Liability">
          <p>
            The website is provided on an "as is" basis while in development. To the extent permitted by law, we exclude
            liability for loss arising from reliance on general wellness information provided here. Nothing in these
            terms limits liability that cannot be limited by law.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Email{" "}
            <a className="text-primary underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
