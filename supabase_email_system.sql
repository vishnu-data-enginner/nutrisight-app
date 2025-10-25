-- Email notification system for NutriSight
-- Run this in your Supabase SQL Editor

-- Create email logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL, -- 'low_scans', 'welcome', 'upgrade_reminder'
  scans_left INTEGER,
  status TEXT NOT NULL, -- 'sent', 'failed', 'pending'
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for email_logs
CREATE POLICY "Users can view their own email logs" ON email_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all email logs" ON email_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to handle low scan notifications
CREATE OR REPLACE FUNCTION handle_low_scan_notification()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
BEGIN
  -- Only trigger on specific scan counts
  IF NEW.scans_left IN (10, 5, 0) AND OLD.scans_left > NEW.scans_left THEN
    
    -- Get user email and name
    SELECT profiles.email, profiles.full_name
    INTO user_email, user_name
    FROM profiles
    WHERE profiles.id = NEW.user_id;
    
    -- Only send if user has email and hasn't been notified recently
    IF user_email IS NOT NULL THEN
      -- Check if we've already sent a notification for this scan count recently
      IF NOT EXISTS (
        SELECT 1 FROM email_logs 
        WHERE user_id = NEW.user_id 
        AND email_type = 'low_scans' 
        AND scans_left = NEW.scans_left
        AND created_at > NOW() - INTERVAL '24 hours'
      ) THEN
        -- Call the email function
        PERFORM net.http_post(
          url := current_setting('app.supabase_url') || '/functions/v1/send_low_scan_email',
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
          ),
          body := jsonb_build_object(
            'user_id', NEW.user_id,
            'scans_left', NEW.scans_left,
            'total_used', NEW.total_scans_used,
            'user_email', user_email,
            'user_name', user_name
          )
        );
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_low_scan_notification ON health_profiles;
CREATE TRIGGER trigger_low_scan_notification
  AFTER UPDATE ON health_profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_low_scan_notification();

-- Create function to send welcome email
CREATE OR REPLACE FUNCTION send_welcome_email(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
BEGIN
  -- Get user details
  SELECT profiles.email, profiles.full_name
  INTO user_email, user_name
  FROM profiles
  WHERE profiles.id = user_uuid;
  
  IF user_email IS NOT NULL THEN
    -- Call the email function
    PERFORM net.http_post(
      url := current_setting('app.supabase_url') || '/functions/v1/send_welcome_email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
      ),
      body := jsonb_build_object(
        'user_id', user_uuid,
        'user_email', user_email,
        'user_name', user_name
      )
    );
    
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create function to send upgrade reminder (for users who haven't upgraded after 7 days)
CREATE OR REPLACE FUNCTION send_upgrade_reminder()
RETURNS VOID AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Find users who signed up 7 days ago, have used most of their scans, but haven't upgraded
  FOR user_record IN
    SELECT 
      hp.user_id,
      p.email,
      p.full_name,
      hp.scans_left,
      hp.total_scans_used,
      hp.created_at
    FROM health_profiles hp
    JOIN profiles p ON hp.user_id = p.id
    WHERE hp.created_at < NOW() - INTERVAL '7 days'
    AND hp.scans_left <= 10
    AND hp.total_scans_used >= 30
    AND NOT EXISTS (
      SELECT 1 FROM email_logs 
      WHERE user_id = hp.user_id 
      AND email_type = 'upgrade_reminder'
      AND created_at > NOW() - INTERVAL '7 days'
    )
  LOOP
    -- Send upgrade reminder
    PERFORM net.http_post(
      url := current_setting('app.supabase_url') || '/functions/v1/send_upgrade_reminder',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key')
      ),
      body := jsonb_build_object(
        'user_id', user_record.user_id,
        'user_email', user_record.email,
        'user_name', user_record.full_name,
        'scans_left', user_record.scans_left,
        'total_used', user_record.total_scans_used
      )
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type_status ON email_logs(email_type, status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- Grant permissions
GRANT EXECUTE ON FUNCTION send_welcome_email(UUID) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION send_upgrade_reminder() TO service_role;


