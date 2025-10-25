import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseTest = () => {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testSupabaseConnection = async () => {
    setTesting(true)
    setError(null)
    setResult(null)

    try {
      // Test 1: Check if we can connect to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        setError(`Supabase connection error: ${error.message}`)
      } else {
        setResult('✅ Supabase connection successful!')
      }
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`)
    } finally {
      setTesting(false)
    }
  }

  const testAuth = async () => {
    setTesting(true)
    setError(null)
    setResult(null)

    try {
      // Test 2: Check auth status
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setError(`Auth error: ${error.message}`)
      } else if (session) {
        setResult(`✅ User is signed in: ${session.user.email}`)
      } else {
        setResult('ℹ️ No user is currently signed in')
      }
    } catch (err: any) {
      setError(`Auth test failed: ${err.message}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold">Supabase Connection Test</h3>
      
      <div className="space-x-2">
        <button
          onClick={testSupabaseConnection}
          disabled={testing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test Supabase Connection'}
        </button>
        
        <button
          onClick={testAuth}
          disabled={testing}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test Auth Status'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          {result}
        </div>
      )}
    </div>
  )
}

export default SupabaseTest


