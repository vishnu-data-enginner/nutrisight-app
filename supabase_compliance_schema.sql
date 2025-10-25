-- Enhanced health_profiles table with compliance and growth features
-- Run this in your Supabase SQL Editor

-- Add compliance and marketing columns
ALTER TABLE health_profiles 
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS consent_version TEXT DEFAULT 'v1.0',
ADD COLUMN IF NOT EXISTS scans_left INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS consent_revoked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS last_scan_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS total_scans_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS upgrade_prompted_at TIMESTAMPTZ;

-- Update existing users to have default values
UPDATE health_profiles 
SET 
  terms_accepted = FALSE,
  scans_left = 50,
  consent_version = 'v1.0',
  marketing_opt_in = TRUE,
  total_scans_used = 0
WHERE terms_accepted IS NULL;

-- Create function to decrement scans with notifications
CREATE OR REPLACE FUNCTION decrement_scans_with_notification(uid UUID)
RETURNS JSON AS $$
DECLARE
  remaining_scans INTEGER;
  user_email TEXT;
  should_notify BOOLEAN := FALSE;
BEGIN
  -- Get current scans and user email
  SELECT scans_left, profiles.email 
  INTO remaining_scans, user_email
  FROM health_profiles 
  JOIN profiles ON health_profiles.user_id = profiles.id
  WHERE health_profiles.user_id = uid;
  
  -- Decrement scans
  UPDATE health_profiles 
  SET 
    scans_left = GREATEST(scans_left - 1, 0),
    total_scans_used = total_scans_used + 1,
    last_scan_at = NOW()
  WHERE user_id = uid
  RETURNING scans_left INTO remaining_scans;
  
  -- Check if we should send notification
  IF remaining_scans = 10 OR remaining_scans = 5 OR remaining_scans = 0 THEN
    should_notify := TRUE;
  END IF;
  
  RETURN json_build_object(
    'scans_left', COALESCE(remaining_scans, 0),
    'should_notify', should_notify,
    'user_email', user_email
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to accept terms
CREATE OR REPLACE FUNCTION accept_terms(uid UUID, version TEXT DEFAULT 'v1.0')
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE health_profiles 
  SET 
    terms_accepted = TRUE,
    terms_accepted_at = NOW(),
    consent_version = version
  WHERE user_id = uid;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create function to revoke consent
CREATE OR REPLACE FUNCTION revoke_consent(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE health_profiles 
  SET 
    terms_accepted = FALSE,
    consent_revoked_at = NOW()
  WHERE user_id = uid;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT EXECUTE ON FUNCTION decrement_scans_with_notification(UUID) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION accept_terms(UUID, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION revoke_consent(UUID) TO anon, authenticated, service_role;

-- Create trigger for low scan notifications
CREATE OR REPLACE FUNCTION notify_low_scans()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify when scans drop to 10, 5, or 0
  IF NEW.scans_left IN (10, 5, 0) AND OLD.scans_left > NEW.scans_left THEN
    PERFORM pg_notify('low_scans', json_build_object(
      'user_id', NEW.user_id,
      'scans_left', NEW.scans_left,
      'total_used', NEW.total_scans_used
    )::text);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS scans_low_notify ON health_profiles;
CREATE TRIGGER scans_low_notify
  AFTER UPDATE ON health_profiles
  FOR EACH ROW
  EXECUTE FUNCTION notify_low_scans();

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_health_profiles_user_id ON health_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_health_profiles_scans_left ON health_profiles(scans_left);
CREATE INDEX IF NOT EXISTS idx_health_profiles_terms_accepted ON health_profiles(terms_accepted);


