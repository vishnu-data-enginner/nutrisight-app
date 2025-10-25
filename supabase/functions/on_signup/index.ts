import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { record } = await req.json()
    
    if (!record?.id) {
      throw new Error('No user record provided')
    }

    console.log('Creating profile for user:', record.id)

    // Create health profile with default values
    const { data: profileData, error: profileError } = await supabase
      .from('health_profiles')
      .insert({
        user_id: record.id,
        scans_left: 50,
        terms_accepted: false,
        consent_version: 'v1.0',
        marketing_opt_in: true,
        total_scans_used: 0
      })
      .select()
      .single()

    if (profileError) {
      console.error('Error creating health profile:', profileError)
      throw profileError
    }

    // Create user profile
    const { data: userProfileData, error: userProfileError } = await supabase
      .from('profiles')
      .insert({
        id: record.id,
        email: record.email,
        full_name: record.user_metadata?.full_name || record.email?.split('@')[0] || 'User',
        avatar_url: record.user_metadata?.avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (userProfileError) {
      console.error('Error creating user profile:', userProfileError)
      // Don't throw here as health profile was created successfully
    }

    console.log('Successfully created profiles for user:', record.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        health_profile: profileData,
        user_profile: userProfileData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in on_signup function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})


