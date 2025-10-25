import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthTest = () => {
  const [email, setEmail] = useState('netrikanncctv@gmail.com')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testSignIn = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Testing sign in with:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setResult({ success: false, error: error.message })
      } else {
        setResult({ 
          success: true, 
          user: data.user?.email,
          session: !!data.session 
        })
      }
    } catch (err: any) {
      setResult({ success: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    setResult(null)

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        setResult({ success: false, error: error.message })
      } else {
        setResult({ success: true, message: 'Supabase connection working' })
      }
    } catch (err: any) {
      setResult({ success: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold">Auth Test</h3>
      
      <div className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-x-2">
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button
          onClick={testSignIn}
          disabled={loading || !password}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Test Sign In'}
        </button>
      </div>

      {result && (
        <div className={`p-3 rounded ${
          result.success 
            ? 'bg-green-100 border border-green-300 text-green-700' 
            : 'bg-red-100 border border-red-300 text-red-700'
        }`}>
          <strong>{result.success ? 'Success:' : 'Error:'}</strong> 
          {result.error || result.message || JSON.stringify(result)}
        </div>
      )}
    </div>
  )
}

export default AuthTest


