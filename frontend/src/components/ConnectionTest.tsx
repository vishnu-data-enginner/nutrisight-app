import React, { useState } from 'react'
import { analyzeImage } from '../lib/api'

const ConnectionTest = () => {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setTesting(true)
    setError(null)
    setResult(null)

    try {
      // Create a dummy file for testing
      const dummyFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      
      // Test the API connection
      const response = await fetch('http://localhost:8000/test-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        setError(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Backend Connection Test</h3>
      
      <button
        onClick={testConnection}
        disabled={testing}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Test Backend Connection'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          <strong>Success!</strong> Backend is connected.
          <pre className="mt-2 text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ConnectionTest


