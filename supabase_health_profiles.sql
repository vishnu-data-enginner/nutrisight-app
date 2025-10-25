-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' NOT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL;

-- Health profiles table for personalized recommendations
CREATE TABLE IF NOT EXISTS health_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
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

-- Enable RLS for health_profiles
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to view and update their own health profile
CREATE POLICY "Users can view their own health profile." ON health_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own health profile." ON health_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health profile." ON health_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_health_profiles_updated_at 
    BEFORE UPDATE ON health_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();


