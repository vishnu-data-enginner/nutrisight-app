-- Update your profile to have 50 scans used (to test the upgrade prompt)
UPDATE profiles 
SET scans_used = 50 
WHERE email = 'anjana.swapna@gmail.com';

-- Verify the update
SELECT id, email, name, scans_used, 
       (50 - scans_used) as free_scans,
       CASE 
         WHEN scans_used >= 50 THEN 'Upgrade Soon!'
         ELSE 'Scans remaining'
       END as status
FROM profiles 
WHERE email = 'anjana.swapna@gmail.com';
