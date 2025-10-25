import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const SupabaseDiagnostic: React.FC = () => {
  const [diagnosticData, setDiagnosticData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('👤 Current user:', { user, userError })

      if (!user) {
        setDiagnosticData({ error: 'No user logged in' })
        return
      }

      const results: any = {
        user: { id: user.id, email: user.email },
        tables: {}
      }

      // Check profiles table
      try {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        results.tables.profiles = { data: profilesData, error: profilesError }
        console.log('📊 Profiles table:', { data: profilesData, error: profilesError })
      } catch (error) {
        results.tables.profiles = { error: error.message }
      }

      // Check users table
      try {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        
        results.tables.users = { data: usersData, error: usersError }
        console.log('📊 Users table:', { data: usersData, error: usersError })
      } catch (error) {
        results.tables.users = { error: error.message }
      }

      // Check health_profiles table
      try {
        const { data: healthData, error: healthError } = await supabase
          .from('health_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        results.tables.health_profiles = { data: healthData, error: healthError }
        console.log('📊 Health profiles table:', { data: healthData, error: healthError })
      } catch (error) {
        results.tables.health_profiles = { error: error.message }
      }

      // Check analyses table
      try {
        const { data: analysesData, error: analysesError } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)
        
        results.tables.analyses = { data: analysesData, error: analysesError }
        console.log('📊 Analyses table:', { data: analysesData, error: analysesError })
      } catch (error) {
        results.tables.analyses = { error: error.message }
      }

      // Check user_scans table (legacy)
      try {
        const { data: userScansData, error: userScansError } = await supabase
          .from('user_scans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)
        
        results.tables.user_scans = { data: userScansData, error: userScansError }
        console.log('📊 User scans table (legacy):', { data: userScansData, error: userScansError })
      } catch (error) {
        results.tables.user_scans = { error: error.message }
      }

      setDiagnosticData(results)

    } catch (error) {
      console.error('💥 Diagnostic error:', error)
      setDiagnosticData({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testScanIncrement = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('No user logged in')
        return
      }

      // Test incrementing scans_used in profiles table
      // First get current value
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('scans_used')
        .eq('id', user.id)
        .single()
      
      if (fetchError) {
        console.error('❌ Error fetching current scans_used:', fetchError)
        throw fetchError
      }
      
      const newScansUsed = (currentProfile?.scans_used || 0) + 1
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ scans_used: newScansUsed })
        .eq('id', user.id)
        .select()

      if (error) {
        console.error('❌ Error incrementing scans:', error)
        alert('Error: ' + error.message)
      } else {
        console.log('✅ Scans incremented:', data)
        alert('Scans incremented! Check the diagnostic again.')
        runDiagnostic()
      }
    } catch (error) {
      console.error('💥 Error:', error)
      alert('Error: ' + error.message)
    }
  }

  const resetScans = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('No user logged in')
        return
      }

      // Reset scans_used to 0
      const { data, error } = await supabase
        .from('profiles')
        .update({ scans_used: 0 })
        .eq('id', user.id)
        .select()

      if (error) {
        console.error('❌ Error resetting scans:', error)
        alert('Error: ' + error.message)
      } else {
        console.log('✅ Scans reset:', data)
        alert('Scans reset to 0! Check the diagnostic again.')
        runDiagnostic()
      }
    } catch (error) {
      console.error('💥 Error:', error)
      alert('Error: ' + error.message)
    }
  }

  useEffect(() => {
    runDiagnostic()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Supabase Diagnostic Tool
        </h1>
        
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={runDiagnostic}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Running...' : 'Run Diagnostic'}
              </button>
              
              <button
                onClick={testScanIncrement}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Test Increment Scans
              </button>
              
              <button
                onClick={resetScans}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Reset Scans to 0
              </button>
            </div>
          </div>

          {/* Diagnostic Results */}
          {diagnosticData && (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Diagnostic Results
              </h2>
              <pre className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-sm overflow-auto max-h-96">
                {JSON.stringify(diagnosticData, null, 2)}
              </pre>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              How to Fix Scan Counting
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li>Run diagnostic to see your current table structure</li>
              <li>Check which table has the scans_used column (likely 'profiles')</li>
              <li>Test incrementing scans to see if it works</li>
              <li>Update the scan saving logic to use the correct table</li>
              <li>Update dashboard to read from the correct table</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupabaseDiagnostic
