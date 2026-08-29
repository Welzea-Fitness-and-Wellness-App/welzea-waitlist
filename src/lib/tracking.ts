import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

const UTM_KEY = "welzea_attribution";
const LEAD_KEY = "welzea_lead";
const SESSION_KEY = "welzea_session_id";

export type Attribution = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referred_by?: string | null;
  referrer?: string | null;
  landing_page?: string | null;
};

export type StoredLead = {
  firstName: string;
  email: string;
  referralCode: string;
};

/** Capture UTM + referral params once per session. Call from a client effect. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const existing = readAttribution();
  const next: Attribution = {
    utm_source: params.get("utm_source") ?? existing?.utm_source ?? null,
    utm_medium: params.get("utm_medium") ?? existing?.utm_medium ?? null,
    utm_campaign: params.get("utm_campaign") ?? existing?.utm_campaign ?? null,
    utm_term: params.get("utm_term") ?? existing?.utm_term ?? null,
    utm_content: params.get("utm_content") ?? existing?.utm_content ?? null,
    referred_by: params.get("ref") ?? existing?.referred_by ?? null,
    referrer: existing?.referrer ?? (document.referrer || null),
    landing_page: existing?.landing_page ?? window.location.pathname,
  };
  try {
    window.sessionStorage.setItem(UTM_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

export function generateReferralCode(): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return out;
}

export function saveLead(lead: StoredLead): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(LEAD_KEY, JSON.stringify(lead));
  } catch {
    /* storage unavailable */
  }
}

export function readLead(): StoredLead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(LEAD_KEY);
    return raw ? (JSON.parse(raw) as StoredLead) : null;
  } catch {
    return null;
  }
}

/** One id per browser tab session, generated on first use and reused after. */
function getSessionId(): string {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const next = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * Log an analytics event to Supabase (`analytics_events` table). Fire-and-forget:
 * never throws, never blocks the caller. Call from client code only.
 */
export function logEvent(eventName: string, properties: Record<string, Json> = {}): void {
  if (typeof window === "undefined") return;
  const attribution = readAttribution() ?? {};
  void supabase
    .from("analytics_events")
    .insert({
      event_name: eventName,
      session_id: getSessionId(),
      page_path: window.location.pathname,
      properties,
      ...attribution,
    })
    .then(({ error }) => {
      if (error) console.error(`[tracking] failed to log "${eventName}"`, error);
    });
}
