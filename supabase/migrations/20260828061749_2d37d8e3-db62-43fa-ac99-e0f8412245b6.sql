CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.waitlist_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text NOT NULL UNIQUE,
  marketing_opt_in boolean NOT NULL DEFAULT false,
  confirmed_terms boolean NOT NULL DEFAULT true,
  referral_code text NOT NULL UNIQUE,
  referred_by text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.waitlist_leads TO anon, authenticated;
GRANT SELECT ON public.waitlist_leads TO authenticated;
GRANT ALL ON public.waitlist_leads TO service_role;
ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the waitlist" ON public.waitlist_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.waitlist_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.qualification_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  lives_in_uk text,
  uses_glp1 text,
  glp1_duration text,
  hardest_now text[] NOT NULL DEFAULT '{}',
  current_support text[] NOT NULL DEFAULT '{}',
  routine_story text,
  one_decision text,
  research_interest text,
  consent_given boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.qualification_responses TO anon, authenticated;
GRANT SELECT ON public.qualification_responses TO authenticated;
GRANT ALL ON public.qualification_responses TO service_role;
ALTER TABLE public.qualification_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit qualification answers" ON public.qualification_responses FOR INSERT TO anon, authenticated WITH CHECK (consent_given = true);
CREATE POLICY "Admins can view qualification answers" ON public.qualification_responses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.demo_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  felt_realistic boolean,
  interest_level text,
  answers jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.demo_feedback TO anon, authenticated;
GRANT SELECT ON public.demo_feedback TO authenticated;
GRANT ALL ON public.demo_feedback TO service_role;
ALTER TABLE public.demo_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send demo feedback" ON public.demo_feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view demo feedback" ON public.demo_feedback FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));