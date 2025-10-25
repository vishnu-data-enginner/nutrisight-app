import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testSupabaseConnection = async () => {
    setLoading(true)
    try {
      // Test 1: Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('👤 User test:', { user, userError })

      // Test 2: Check if users table exists
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      console.log('👥 Users table test:', { usersData, usersError })

      // Test 3: Check if user_scans table exists
      const { data: scansData, error: scansError } = await supabase
        .from('user_scans')
        .select('count')
        .limit(1)
      console.log('📊 User scans table test:', { scansData, scansError })

      // Test 4: Check if RPC function exists
      if (user) {
        const { data: rpcData, error: rpcError } = await supabase.rpc('decrement_free_scan', {
          user_uuid: user.id
        })
        console.log('🔧 RPC function test:', { rpcData, rpcError })
      }

      setTestResults({
        user: user ? { id: user.id, email: user.email } : null,
        userError,
        usersError,
        scansError,
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('💥 Supabase test error:', error)
      setTestResults({ error: error.message, timestamp: new Date().toISOString() })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testSupabaseConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={testSupabaseConnection}
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 mb-6"
          >
            {loading ? 'Testing...' : 'Test Supabase Connection'}
          </button>

          {testResults && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Test Results:</h2>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Required Setup:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Run the SQL setup script in Supabase SQL Editor</li>
              <li>Check that environment variables are set in .env.local</li>
              <li>Verify Supabase project URL and anon key are correct</li>
              <li>Ensure RLS policies are enabled</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupabaseTest
