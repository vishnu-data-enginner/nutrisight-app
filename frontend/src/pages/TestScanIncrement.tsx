import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const TestScanIncrement: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testScanIncrement = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('No user logged in')
      }

      console.log('👤 Testing with user:', user.email)

      // First, get the current scans_used value
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('scans_used')
        .eq('id', user.id)
        .single()
      
      if (fetchError) {
        throw new Error(`Error fetching current scans_used: ${fetchError.message}`)
      }
      
      console.log('📊 Current scans_used:', currentProfile?.scans_used)
      
      // Increment the scans_used value
      const newScansUsed = (currentProfile?.scans_used || 0) + 1
      
      console.log('🔄 Updating scans_used to:', newScansUsed)
      
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          scans_used: newScansUsed
        })
        .eq('id', user.id)
        .select()

      if (updateError) {
        throw new Error(`Error updating scans_used: ${updateError.message}`)
      }

      console.log('✅ Successfully updated scans_used!')
      setResult({
        success: true,
        previousScansUsed: currentProfile?.scans_used || 0,
        newScansUsed: newScansUsed,
        updateData
      })

    } catch (err: any) {
      console.error('💥 Test failed:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Test Scan Increment Fix
        </h1>
        
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Test the Fixed Scan Increment Logic
          </h2>
          
          <button
            onClick={testScanIncrement}
            disabled={loading}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors mb-4"
          >
            {loading ? 'Testing...' : 'Test Scan Increment'}
          </button>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-4">
              <strong>Success!</strong>
              <div className="mt-2 text-sm">
                <div>Previous scans_used: {result.previousScansUsed}</div>
                <div>New scans_used: {result.newScansUsed}</div>
                <div>Increment: +1</div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What This Tests:</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
              <li>Fetches current scans_used value from profiles table</li>
              <li>Increments the value by 1 (simulating a scan)</li>
              <li>Updates the profiles table with the new value</li>
              <li>Uses the correct Supabase syntax (no supabase.raw)</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Expected Results
          </h2>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
            <li>✅ No more "supabase.raw is not a function" error</li>
            <li>✅ scans_used increments by 1 each time</li>
            <li>✅ Dashboard will show updated free scans (50 - scans_used)</li>
            <li>✅ Real-time updates will work when scanning products</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestScanIncrement
