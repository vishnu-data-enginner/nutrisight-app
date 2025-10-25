import React, { useState } from 'react'
import { healthCheck } from '../lib/api'

const TestBackendConnection: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('🔍 Testing backend connection...')
      const response = await healthCheck()
      console.log('✅ Backend response:', response)
      setResult(response)
    } catch (err: any) {
      console.error('💥 Connection failed:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Test Backend Connection
        </h1>
        
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Test Backend Health Check
          </h2>
          
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors mb-4"
          >
            {loading ? 'Testing...' : 'Test Backend Connection'}
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
                <div>Status: {result.status}</div>
                <div>Message: {result.message}</div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What This Tests:</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
              <li>Connects to backend at http://localhost:8000</li>
              <li>Calls the /health endpoint</li>
              <li>Verifies the backend is running and responding</li>
              <li>Tests the API configuration in the frontend</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Backend Status
          </h2>
          <div className="space-y-2 text-slate-700 dark:text-slate-300">
            <div>✅ Backend should be running on port 8000</div>
            <div>✅ Health endpoint should return status: "healthy"</div>
            <div>✅ CORS should be configured for localhost:8080</div>
            <div>✅ Analyze endpoint should accept file uploads</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestBackendConnection
