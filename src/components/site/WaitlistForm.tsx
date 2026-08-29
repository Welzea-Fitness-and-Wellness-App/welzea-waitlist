import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { generateReferralCode, logEvent, readAttribution, saveLead } from "@/lib/tracking";

export function WaitlistForm({ formId = "waitlist" }: { formId?: string }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!firstName.trim()) return setError("Please add your first name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError("Please add a valid email address.");
    if (!confirmed) return setError("Please confirm you are aged 18 or over to continue.");

    setSubmitting(true);
    const attribution = readAttribution() ?? {};
    const referralCode = generateReferralCode();

    const { error: insertError } = await supabase.from("waitlist_leads").insert({
      first_name: firstName.trim(),
      email: email.trim().toLowerCase(),
      marketing_opt_in: marketingOptIn,
      confirmed_terms: true,
      referral_code: referralCode,
      ...attribution,
    });

    setSubmitting(false);

    if (insertError && !insertError.message.toLowerCase().includes("duplicate")) {
      setError("Something went wrong. Please try again in a moment.");
      return;
    }

    saveLead({ firstName: firstName.trim(), email: email.trim().toLowerCase(), referralCode });
    logEvent("waitlist_joined", { form_id: formId, marketing_opt_in: marketingOptIn });
    void navigate({ to: "/thank-you" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-first-name`}>First name</Label>
          <Input
            id={`${formId}-first-name`}
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Sam"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-email`}>Email address</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <Checkbox
          checked={marketingOptIn}
          onCheckedChange={(v) => setMarketingOptIn(v === true)}
          className="mt-0.5"
          aria-label="Email updates opt in"
        />
        <span>
          I would like to receive email updates about Welzea, early access, product research, and launch news. I
          understand that I can unsubscribe at any time.
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <Checkbox
          checked={confirmed}
          onCheckedChange={(v) => setConfirmed(v === true)}
          className="mt-0.5"
          aria-label="Age and wellness confirmation"
          required
        />
        <span>
          I confirm that I am aged 18 or over and understand that Welzea provides general wellness information only,
          not medical advice.{" "}
          <Link to="/privacy" className="font-medium text-primary underline underline-offset-2">
            Privacy Notice
          </Link>{" "}
          and{" "}
          <Link to="/terms" className="font-medium text-primary underline underline-offset-2">
            Terms of Use
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Joining…" : "Join the UK early-access list"}
      </Button>

      <p className="text-xs text-muted-foreground">We will never sell your personal information.</p>
    </form>
  );
}
