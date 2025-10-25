import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const TestSupabaseConnection: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      console.log('🔍 Testing Supabase connection...')
      
      // Test 1: Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('👤 User test:', { user, userError })

      // Test 2: Test profiles table
      let profilesData = null
      let profilesError = null
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        profilesData = data
        profilesError = error
        console.log('📊 Profiles test:', { data, error })
      }

      // Test 3: Test analyses table
      let analysesData = null
      let analysesError = null
      if (user) {
        const { data, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .limit(5)
        analysesData = data
        analysesError = error
        console.log('📊 Analyses test:', { data, error })
      }

      setConnectionStatus({
        user: user ? { id: user.id, email: user.email } : null,
        userError,
        profiles: { data: profilesData, error: profilesError },
        analyses: { data: analysesData, error: analysesError },
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('💥 Connection test error:', error)
      setConnectionStatus({ error: error.message, timestamp: new Date().toISOString() })
    } finally {
      setLoading(false)
    }
  }

  const testIncrementScans = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('No user logged in')
        return
      }

      console.log('🔄 Testing scan increment...')
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          scans_used: 1  // Test increment
        })
        .eq('id', user.id)
        .select()

      console.log('📈 Increment result:', { data, error })
      
      if (error) {
        alert('Error: ' + error.message)
      } else {
        alert('Success! Scans incremented. Check dashboard.')
        testConnection() // Refresh the test
      }
    } catch (error) {
      console.error('💥 Error:', error)
      alert('Error: ' + error.message)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Supabase Connection Test
        </h1>
        
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={testConnection}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Testing...' : 'Test Connection'}
              </button>
              
              <button
                onClick={testIncrementScans}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Test Increment Scans
              </button>
            </div>
          </div>

          {/* Connection Results */}
          {connectionStatus && (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Connection Test Results
              </h2>
              <pre className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-sm overflow-auto max-h-96">
                {JSON.stringify(connectionStatus, null, 2)}
              </pre>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Troubleshooting Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li>Check if you're logged in (user should be shown above)</li>
              <li>Check if profiles table exists and has your data</li>
              <li>Check if analyses table exists</li>
              <li>Test incrementing scans to see if it works</li>
              <li>Go back to dashboard and click "Refresh Data"</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestSupabaseConnection
