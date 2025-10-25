-- Supabase RPC function to atomically decrement free scans and increment total scans
CREATE OR REPLACE FUNCTION decrement_free_scan(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    free_scans = GREATEST(free_scans - 1, 0),
    total_scans = total_scans + 1,
    average_health_score = (
      SELECT AVG(health_score) 
      FROM user_scans 
      WHERE user_id = user_uuid
    )
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION decrement_free_scan(UUID) TO authenticated;
