import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import HealthOnboarding from './HealthOnboarding'
import { Brain, Sparkles, ArrowRight } from 'lucide-react'

interface OnboardingWrapperProps {
  children: React.ReactNode
}

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({ children }) => {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserOnboarding = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setLoading(false)
          return
        }

        setUser(user)
        console.log('🔍 Checking onboarding status for user:', user.id)

        // Check if user has a health profile
        const { data: healthProfile, error } = await supabase
          .from('health_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        console.log('📊 Health profile check:', { healthProfile, error })

        if (error && error.code === 'PGRST116') {
          // No health profile found - show onboarding
          console.log('✅ New user detected - showing onboarding')
          setShowOnboarding(true)
        } else if (healthProfile) {
          // User has health profile - skip onboarding
          console.log('✅ User has health profile - skipping onboarding')
          setShowOnboarding(false)
        } else {
          // Some other error
          console.log('⚠️ Error checking health profile:', error)
          setShowOnboarding(false)
        }

      } catch (error) {
        console.error('💥 Error in onboarding check:', error)
        setShowOnboarding(false)
      } finally {
        setLoading(false)
      }
    }

    checkUserOnboarding()
  }, [])

  const handleOnboardingComplete = () => {
    console.log('✅ Onboarding completed - redirecting to dashboard')
    setShowOnboarding(false)
    navigate('/dashboard')
  }

  const handleOnboardingSkip = () => {
    console.log('⏭️ Onboarding skipped - redirecting to dashboard')
    setShowOnboarding(false)
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-emerald-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (showOnboarding && user) {
    return (
      <HealthOnboarding
        userId={user.id}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    )
  }

  return <>{children}</>
}

export default OnboardingWrapper
