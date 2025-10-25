-- Add unique constraint to user_id in health_profiles table
-- Run this in your Supabase SQL Editor

-- First, check if there are any duplicate user_ids and clean them up
-- (This will keep only the most recent record for each user)
WITH duplicates AS (
  SELECT user_id, MAX(created_at) as max_created_at
  FROM health_profiles
  GROUP BY user_id
  HAVING COUNT(*) > 1
)
DELETE FROM health_profiles 
WHERE user_id IN (SELECT user_id FROM duplicates)
AND created_at NOT IN (SELECT max_created_at FROM duplicates);

-- Add unique constraint to user_id
ALTER TABLE health_profiles ADD CONSTRAINT health_profiles_user_id_unique UNIQUE (user_id);


