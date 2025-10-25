-- Complete Supabase Setup for NutriSight
-- Run this in your Supabase SQL Editor

-- 1. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'user' NOT NULL,
  plan TEXT DEFAULT 'free' NOT NULL,
  scans_used INTEGER DEFAULT 0,
  onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile." ON profiles;
CREATE POLICY "Users can view their own profile." ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON profiles;
CREATE POLICY "Users can update their own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Create health_profiles table
CREATE TABLE IF NOT EXISTS health_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic info
  gender TEXT,
  age_range TEXT,
  activity_level TEXT,
  
  -- Health conditions
  diabetes BOOLEAN DEFAULT FALSE,
  blood_pressure BOOLEAN DEFAULT FALSE,
  pcos_thyroid BOOLEAN DEFAULT FALSE,
  heart_conditions BOOLEAN DEFAULT FALSE,
  digestive_issues BOOLEAN DEFAULT FALSE,
  allergies TEXT[],
  
  -- Health goals
  primary_goal TEXT,
  secondary_goals TEXT[],
  
  -- Dietary preferences
  diet_type TEXT,
  restrictions TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable RLS for health_profiles
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for health_profiles
DROP POLICY IF EXISTS "Users can view their own health profile." ON health_profiles;
CREATE POLICY "Users can view their own health profile." ON health_profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own health profile." ON health_profiles;
CREATE POLICY "Users can update their own health profile." ON health_profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own health profile." ON health_profiles;
CREATE POLICY "Users can insert their own health profile." ON health_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. Create scans table
CREATE TABLE IF NOT EXISTS scans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredients TEXT[],
  score INTEGER,
  personalized_insight TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Enable RLS for scans
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for scans
DROP POLICY IF EXISTS "Users can view their own scans." ON scans;
CREATE POLICY "Users can view their own scans." ON scans
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own scans." ON scans;
CREATE POLICY "Users can insert their own scans." ON scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, plan, onboarding_completed)
  VALUES (NEW.id, NEW.email, 'user', 'free', FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create trigger to call handle_new_user function on auth.users inserts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated, service_role;

-- 13. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 14. Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_health_profiles_updated_at ON health_profiles;
CREATE TRIGGER update_health_profiles_updated_at 
    BEFORE UPDATE ON health_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();


