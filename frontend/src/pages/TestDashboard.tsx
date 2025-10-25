import React from 'react'

const TestDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard Test</h1>
        <p className="text-gray-300">If you can see this, the dashboard route is working!</p>
      </div>
    </div>
  )
}

export default TestDashboard
