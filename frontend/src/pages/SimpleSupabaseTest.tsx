import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const SimpleSupabaseTest: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    setTestResult(null)
    
    try {
      console.log('🧪 Starting simple Supabase test...')
      
      // Step 1: Get current user
      console.log('Step 1: Getting current user...')
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('User result:', { user, userError })
      
      if (userError) {
        setTestResult({ step: 'auth', error: userError.message, success: false })
        return
      }
      
      if (!user) {
        setTestResult({ step: 'auth', error: 'No user found', success: false })
        return
      }
      
      // Step 2: Test profiles table query
      console.log('Step 2: Testing profiles table...')
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      console.log('Profiles result:', { profileData, profileError })
      
      if (profileError) {
        setTestResult({ 
          step: 'profiles', 
          error: profileError.message,
          errorCode: profileError.code,
          errorDetails: profileError.details,
          success: false 
        })
        return
      }
      
      // Step 3: Test analyses table query
      console.log('Step 3: Testing analyses table...')
      const { data: analysesData, error: analysesError } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .limit(5)
      
      console.log('Analyses result:', { analysesData, analysesError })
      
      setTestResult({
        step: 'complete',
        success: true,
        user: { id: user.id, email: user.email },
        profile: profileData,
        analyses: analysesData,
        profileError: profileError?.message,
        analysesError: analysesError?.message
      })
      
    } catch (error) {
      console.error('💥 Test error:', error)
      setTestResult({ step: 'error', error: error.message, success: false })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runTest()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Simple Supabase Test
        </h1>
        
        <div className="space-y-6">
          {/* Test Button */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <button
              onClick={runTest}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Testing...' : 'Run Test'}
            </button>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Test Results
              </h2>
              
              {testResult.success ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="text-green-800 dark:text-green-300 font-semibold mb-2">
                      ✅ Test Passed!
                    </h3>
                    <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <div><strong>User:</strong> {testResult.user?.email}</div>
                      <div><strong>Profile Data:</strong> {testResult.profile ? 'Found' : 'Not found'}</div>
                      <div><strong>Analyses Count:</strong> {testResult.analyses?.length || 0}</div>
                      <div><strong>Scans Used:</strong> {testResult.profile?.scans_used || 0}</div>
                    </div>
                  </div>
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                      Raw Data
                    </summary>
                    <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-700 rounded text-xs overflow-auto">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <h3 className="text-red-800 dark:text-red-300 font-semibold mb-2">
                    ❌ Test Failed at Step: {testResult.step}
                  </h3>
                  <div className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <div><strong>Error:</strong> {testResult.error}</div>
                    {testResult.errorCode && <div><strong>Code:</strong> {testResult.errorCode}</div>}
                    {testResult.errorDetails && <div><strong>Details:</strong> {testResult.errorDetails}</div>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              What This Test Does
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li>Gets the current authenticated user</li>
              <li>Queries the profiles table for your data</li>
              <li>Queries the analyses table for your scans</li>
              <li>Shows any errors that occur</li>
            </ol>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              If this test passes, the issue is in the dashboard component logic. 
              If it fails, the issue is with Supabase configuration or permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleSupabaseTest
