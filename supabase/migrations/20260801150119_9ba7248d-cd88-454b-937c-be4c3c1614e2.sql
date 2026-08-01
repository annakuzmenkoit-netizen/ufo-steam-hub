CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

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

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TABLE public.demo_day_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL DEFAULT 'UFO DEMO DAY',
  event_date text NOT NULL,
  event_time text NOT NULL,
  workshop_id text NOT NULL,
  workshop_title text NOT NULL,
  workshop_audience text NOT NULL,
  participant_name text NOT NULL,
  child_age integer,
  phone text NOT NULL,
  personal_data_consent boolean NOT NULL DEFAULT false,
  photo_video_consent boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'Головна сторінка',
  status text NOT NULL DEFAULT 'new',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT demo_day_registrations_status_check
    CHECK (status IN ('new', 'confirmed', 'contacted', 'cancelled', 'attended'))
);

CREATE INDEX demo_day_registrations_created_at_idx ON public.demo_day_registrations (created_at DESC);
CREATE INDEX demo_day_registrations_lookup_idx ON public.demo_day_registrations (workshop_id, event_date);

GRANT SELECT, UPDATE ON public.demo_day_registrations TO authenticated;
GRANT ALL ON public.demo_day_registrations TO service_role;
ALTER TABLE public.demo_day_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view registrations"
ON public.demo_day_registrations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update registrations"
ON public.demo_day_registrations FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));