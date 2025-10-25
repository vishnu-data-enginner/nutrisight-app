import React from 'react'

const TestDashboardSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          🎉 Dashboard is Working!
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          If you can see this, the dashboard route is working properly.
        </p>
      </div>
    </div>
  )
}

export default TestDashboardSimple
