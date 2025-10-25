-- NutriSight Dashboard Tables Setup
-- Run this in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT,
  email TEXT UNIQUE NOT NULL,
  free_scans INTEGER DEFAULT 50,
  total_scans INTEGER DEFAULT 0,
  average_health_score FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_scans table
CREATE TABLE IF NOT EXISTS user_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  health_score FLOAT NOT NULL,
  detected_ingredients JSONB,
  scan_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_scans_user_id ON user_scans(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scans_created_at ON user_scans(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own scans" ON user_scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans" ON user_scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create the decrement_free_scan function
CREATE OR REPLACE FUNCTION decrement_free_scan(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    free_scans = GREATEST(free_scans - 1, 0),
    total_scans = total_scans + 1,
    average_health_score = (
      SELECT COALESCE(AVG(health_score), 0) 
      FROM user_scans 
      WHERE user_id = user_uuid
    )
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION decrement_free_scan(UUID) TO authenticated;

-- Create a trigger to automatically create user record on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, username)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
