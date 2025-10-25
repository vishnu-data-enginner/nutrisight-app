import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const FixProfile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const createProfile = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setResult({ error: 'No user found' })
        return
      }

      console.log('👤 Creating profile for user:', user.id, user.email)

      // Create profile record
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          name: user.email?.split('@')[0] || 'User',
          plan: 'free',
          scans_used: 0
        })
        .select()
        .single()

      console.log('📊 Profile creation result:', { data, error })

      if (error) {
        setResult({ error: error.message, errorCode: error.code })
      } else {
        setResult({ success: true, data })
      }

    } catch (err) {
      console.error('💥 Error:', err)
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const testProfileQuery = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setResult({ error: 'No user found' })
        return
      }

      // Test query after creation
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      console.log('📊 Profile query test:', { data, error })
      setResult({ success: true, data, error: error?.message })

    } catch (err) {
      console.error('💥 Error:', err)
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Fix Profile Issue
        </h1>
        
        <div className="space-y-6">
          {/* Problem Description */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700 p-6">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4">
              🚨 Problem Identified
            </h2>
            <p className="text-red-700 dark:text-red-300">
              Your user account exists in Supabase auth, but there's no corresponding record in the `profiles` table. 
              This is why the dashboard can't load your data.
            </p>
          </div>

          {/* Solution */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Solution
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              We need to create a profile record for your user account.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={createProfile}
                disabled={loading}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Profile Record'}
              </button>
              
              <button
                onClick={testProfileQuery}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                Test Profile Query
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Results
              </h2>
              
              {result.success ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">
                    ✅ Success!
                  </h3>
                  <pre className="text-sm text-green-700 dark:text-green-300 overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <h3 className="text-red-800 dark:text-red-300 font-semibold mb-2">
                    ❌ Error
                  </h3>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    <div><strong>Message:</strong> {result.error}</div>
                    {result.errorCode && <div><strong>Code:</strong> {result.errorCode}</div>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 p-6">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
              Next Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
              <li>Click "Create Profile Record" to fix the issue</li>
              <li>Click "Test Profile Query" to verify it works</li>
              <li>Go back to the dashboard - it should now show your data</li>
              <li>If you have scans_used data elsewhere, we can migrate it</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FixProfile
