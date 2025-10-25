import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

export interface ConsentStatus {
  hasConsent: boolean
  needsOnboarding: boolean
  scansLeft: number
  userProfile: any
}

export const checkConsentStatus = async (userId: string): Promise<ConsentStatus> => {
  try {
    const { data: profile, error } = await supabase
      .from('health_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching consent status:', error)
      return {
        hasConsent: false,
        needsOnboarding: true,
        scansLeft: 0,
        userProfile: null
      }
    }

    return {
      hasConsent: profile?.terms_accepted || false,
      needsOnboarding: !profile?.terms_accepted,
      scansLeft: profile?.scans_left || 0,
      userProfile: profile
    }
  } catch (error) {
    console.error('Error in checkConsentStatus:', error)
    return {
      hasConsent: false,
      needsOnboarding: true,
      scansLeft: 0,
      userProfile: null
    }
  }
}

export const acceptTerms = async (userId: string, version: string = 'v1.0'): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('accept_terms', {
      uid: userId,
      version: version
    })

    if (error) {
      console.error('Error accepting terms:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in acceptTerms:', error)
    return false
  }
}

export const revokeConsent = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('revoke_consent', {
      uid: userId
    })

    if (error) {
      console.error('Error revoking consent:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in revokeConsent:', error)
    return false
  }
}

export const decrementScans = async (userId: string): Promise<{ scansLeft: number; shouldNotify: boolean }> => {
  try {
    const { data, error } = await supabase.rpc('decrement_scans_with_notification', {
      uid: userId
    })

    if (error) {
      console.error('Error decrementing scans:', error)
      return { scansLeft: 0, shouldNotify: false }
    }

    return {
      scansLeft: data?.scans_left || 0,
      shouldNotify: data?.should_notify || false
    }
  } catch (error) {
    console.error('Error in decrementScans:', error)
    return { scansLeft: 0, shouldNotify: false }
  }
}


