-- Fix health_profiles table by adding missing columns
-- Run this in your Supabase SQL Editor

-- Add missing health condition columns
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS diabetes BOOLEAN DEFAULT FALSE;
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS blood_pressure BOOLEAN DEFAULT FALSE;
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS pcos_thyroid BOOLEAN DEFAULT FALSE;
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS heart_conditions BOOLEAN DEFAULT FALSE;
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS digestive_issues BOOLEAN DEFAULT FALSE;
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS allergies TEXT[];
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS secondary_goals TEXT[];
ALTER TABLE health_profiles ADD COLUMN IF NOT EXISTS restrictions TEXT[];

-- Update the conditions column to be an array if it's not already
-- (This might fail if conditions is already an array, that's okay)
ALTER TABLE health_profiles ALTER COLUMN conditions TYPE TEXT[] USING CASE 
  WHEN conditions IS NULL THEN NULL 
  ELSE ARRAY[conditions] 
END;


