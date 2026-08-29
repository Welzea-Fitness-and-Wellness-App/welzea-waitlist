import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice | Welzea early access" },
      {
        name: "description",
        content:
          "How Welzea collects, uses, and protects the information you share when joining the UK early-access list.",
      },
      { property: "og:title", content: "Privacy Notice | Welzea" },
      {
        property: "og:description",
        content: "How Welzea handles early-access signup and research information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="container-page flex max-w-3xl flex-col gap-10 py-16">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Privacy Notice</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {siteConfig.privacyLastUpdated}. This is an editable template and should be reviewed by a
            qualified adviser before launch.
          </p>
        </header>

        <Section title="Who we are">
          <p>
            {siteConfig.brand} is an early-stage wellness-support product being developed in the UK. You can contact us
            at <a className="text-primary underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </Section>

        <Section title="What we collect">
          <p>
            When you join the early-access list we collect your first name, email address, your marketing preference,
            and campaign information such as UTM parameters, referring website, and referral code.
          </p>
          <p>
            If you choose to complete the optional qualification form, we collect the answers you voluntarily provide.
            Some of these answers may relate to your health. We only use them with your explicit consent, to understand
            suitability for product research and early testing.
          </p>
        </Section>

        <Section title="Why we use it">
          <p>
            To operate the early-access list, send you product updates where you have opted in, invite you to research
            activities, and improve what we build. We do not use your information for automated decision-making.
          </p>
        </Section>

        <Section title="Legal bases">
          <p>
            We rely on consent for marketing emails and for any health-related information you share, and on legitimate
            interests for operating and improving the early-access programme.
          </p>
        </Section>

        <Section title="Sharing and retention">
          <p>
            We will never sell your personal information. We share it only with service providers who help us run the
            waitlist and email updates. We keep early-access information for as long as the programme runs, or until you
            ask us to delete it.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can access, correct, delete, or port your information, object to processing, and withdraw consent at any
            time by emailing us. You can also unsubscribe from any email we send. You may complain to the Information
            Commissioner's Office (ICO).
          </p>
        </Section>

        <Section title="Not medical advice">
          <p>
            {siteConfig.brand} provides general wellness information only. We do not provide medical advice, diagnosis,
            treatment, prescribing, or medication guidance.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
