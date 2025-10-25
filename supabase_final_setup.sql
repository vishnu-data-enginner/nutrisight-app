-- Final Supabase Database Setup for NutriSight
-- Run this in your Supabase SQL Editor

-- 1. Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' NOT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL;

-- 2. Create health_profiles table with proper foreign key
CREATE TABLE IF NOT EXISTS health_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic info
  gender TEXT, -- 'male', 'female', 'other', 'prefer_not_to_say'
  age_range TEXT, -- '18-25', '26-35', '36-50', '50+'
  
  -- Health conditions
  diabetes BOOLEAN DEFAULT FALSE,
  blood_pressure BOOLEAN DEFAULT FALSE,
  pcos_thyroid BOOLEAN DEFAULT FALSE,
  heart_conditions BOOLEAN DEFAULT FALSE,
  digestive_issues BOOLEAN DEFAULT FALSE,
  allergies TEXT[], -- Array of allergies
  
  -- Health goals
  primary_goal TEXT, -- 'sugar_management', 'weight_loss', 'muscle_gain', 'clean_eating', 'heart_health', 'wellness'
  secondary_goals TEXT[], -- Array of secondary goals
  
  -- Dietary preferences
  diet_type TEXT, -- 'omnivore', 'vegetarian', 'vegan', 'pescatarian'
  restrictions TEXT[], -- 'gluten_free', 'dairy_free', 'low_sodium', 'low_sugar', 'keto', 'paleo'
  
  -- Activity level
  activity_level TEXT, -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable RLS for health_profiles
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for health_profiles
CREATE POLICY "Users can view their own health profile." ON health_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own health profile." ON health_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health profile." ON health_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_health_profiles_updated_at ON health_profiles;
CREATE TRIGGER update_health_profiles_updated_at 
    BEFORE UPDATE ON health_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, plan, onboarding_completed)
  VALUES (NEW.id, NEW.email, 'user', 'free', FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger to call handle_new_user function on auth.users inserts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated, service_role;


