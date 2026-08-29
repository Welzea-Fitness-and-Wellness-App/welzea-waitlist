import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Mail, MessageCircle, Share2 } from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Button } from "@/components/ui/button";
import { readLead, type StoredLead } from "@/lib/tracking";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "You're on the Welzea early-access list" },
      {
        name: "description",
        content:
          "Thanks for joining the Welzea UK early-access list. Share what you find difficult, try an example Today Plan, or invite a friend.",
      },
      { property: "og:title", content: "You're on the Welzea early-access list" },
      {
        property: "og:description",
        content: "Help shape a simpler kind of support for difficult GLP-1 days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYouPage,
});

const REFERRAL_MESSAGE =
  "I just joined the Welzea early-access list. It is being built for people using GLP-1 medication who want simpler support for nutrition, strength, and routine — without tracking everything.";

function ThankYouPage() {
  const [lead, setLead] = useState<StoredLead | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLead(readLead());
  }, []);

  const referralLink = `${siteConfig.publicUrl}/?ref=${lead?.referralCode ?? ""}`;
  const shareText = `${REFERRAL_MESSAGE} ${referralLink}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      <main className="container-page flex max-w-3xl flex-col gap-12 py-16">
        <header className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase">
            You're in
          </span>
          <h1 className="text-3xl font-extrabold text-balance-tight sm:text-4xl">
            You're on the Welzea early-access list{lead?.firstName ? `, ${lead.firstName}` : ""}.
          </h1>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>Thank you for joining us early.</p>
            <p>
              Welzea is being built around a simple idea: when life, appetite, routine, and fitness plans do not line
              up, you should not need another complicated tracker to decide what to do next.
            </p>
            <p>We will email you with early-access updates and opportunities to shape the product.</p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <Button asChild size="lg">
            <Link to="/qualify">Tell us what you find difficult</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/today-plan-demo">Try an example Today Plan</Link>
          </Button>
        </div>

        <section className="surface-card flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Know someone who may find Welzea useful?</h2>
            <p className="text-sm text-muted-foreground">
              Invite a friend to join the early-access list. Help us grow the early Welzea community.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="referral-link" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Your referral link
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="referral-link"
                readOnly
                value={referralLink}
                className="flex-1 rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground"
              />
              <Button type="button" onClick={copyLink} variant="secondary">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> Share on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href={`mailto:?subject=${encodeURIComponent("Welzea early access")}&body=${encodeURIComponent(shareText)}`}
              >
                <Mail className="size-4" /> Share by email
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(REFERRAL_MESSAGE)}&url=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noreferrer"
              >
                <Share2 className="size-4" /> Share on X
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">{REFERRAL_MESSAGE}</p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
