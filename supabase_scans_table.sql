-- Create scans table for personalized scan history
CREATE TABLE IF NOT EXISTS public.scans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ingredients TEXT[] NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  personalized_insight TEXT NOT NULL,
  health_profile_snapshot JSONB, -- Store health profile at time of scan
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own scans." ON public.scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans." ON public.scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scans." ON public.scans
  FOR UPDATE USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON public.scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON public.scans(created_at DESC);


