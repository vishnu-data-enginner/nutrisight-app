-- Add scans_left column to profiles table
-- Run this in your Supabase SQL Editor

-- Add scans_left column with default value of 50 for free users
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS scans_left INTEGER DEFAULT 50;

-- Update existing users to have 50 scans
UPDATE profiles SET scans_left = 50 WHERE scans_left IS NULL;

-- Create function to decrement scans
CREATE OR REPLACE FUNCTION decrement_scans(uid UUID)
RETURNS INTEGER AS $$
DECLARE
  remaining_scans INTEGER;
BEGIN
  UPDATE profiles 
  SET scans_left = GREATEST(scans_left - 1, 0)
  WHERE id = uid
  RETURNING scans_left INTO remaining_scans;
  
  RETURN COALESCE(remaining_scans, 0);
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION decrement_scans(UUID) TO anon, authenticated, service_role;


