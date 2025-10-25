import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../utils/supabaseClient'
import HealthOnboarding from '../components/HealthOnboarding'

const TestOnboarding: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [user, setUser] = useState<any>(null)

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        console.log('Current user:', user)
      } else {
        console.log('No user found')
      }
    } catch (error) {
      console.error('Error getting user:', error)
    }
  }

  const clearHealthProfile = async () => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('health_profiles')
        .delete()
        .eq('user_id', user.id)
      
      if (error) {
        console.error('Error clearing health profile:', error)
        alert('Error clearing health profile: ' + error.message)
      } else {
        console.log('✅ Health profile cleared - onboarding should show on next dashboard visit')
        alert('Health profile cleared! Visit /dashboard to see onboarding.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error: ' + error)
    }
  }

  const checkHealthProfile = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('health_profiles')
        .select('*')
        .eq('user_id', user.id)
      
      if (error) {
        console.error('Error checking health profile:', error)
        alert('Error checking health profile: ' + error.message)
      } else {
        console.log('📊 Health profile data:', data)
        alert('Health profile data: ' + JSON.stringify(data, null, 2))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error: ' + error)
    }
  }

  const handleOnboardingComplete = () => {
    console.log('✅ Onboarding completed!')
    setShowOnboarding(false)
    alert('Onboarding completed! Check your health profile in Supabase.')
  }

  const handleOnboardingSkip = () => {
    console.log('⏭️ Onboarding skipped!')
    setShowOnboarding(false)
    alert('Onboarding skipped!')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Onboarding Test Page
        </h1>
        
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Current User Status
              </h2>
              {user ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <p className="text-emerald-800 dark:text-emerald-300">
                    ✅ Logged in as: {user.email}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    User ID: {user.id}
                  </p>
                </div>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-orange-800 dark:text-orange-300">
                    ⚠️ No user logged in
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkUser}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Check Current User
              </motion.button>

              {user && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOnboarding(true)}
                    className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Test Onboarding Flow
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearHealthProfile}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Clear Health Profile (Reset)
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={checkHealthProfile}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Check Health Profile
                  </motion.button>
                </>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                How to Test:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Make sure you're logged in</li>
                <li>Click "Clear Health Profile" to reset your profile</li>
                <li>Go to <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">/dashboard</code> - you should see onboarding</li>
                <li>Or click "Test Onboarding Flow" to test directly</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestOnboarding
