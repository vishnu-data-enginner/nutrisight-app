import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Camera, Crown, BarChart3, Heart, Brain, ArrowRight } from 'lucide-react'

const CleanDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-5xl mx-auto px-6 py-10"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-slate-800">
          Welcome back, <span className="text-emerald-600">User!</span> 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Time to upgrade! Unlock unlimited scans and advanced features.
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Scans</h3>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-emerald-600">0</p>
            <p className="text-sm text-gray-500 mb-4">used / 50 total</p>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Score</h3>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-emerald-600">60/100</p>
            <p className="text-sm text-gray-500">Keep scanning to improve</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Scans</h3>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-emerald-600">0</p>
            <p className="text-sm text-gray-500">Products analyzed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold text-emerald-600">0%</p>
            <p className="text-sm text-gray-500">towards your health goal</p>
          </div>
        </motion.div>
      </div>

      {/* AI Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600" />
          AI Health Insights
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="font-medium text-amber-800 mb-2">⚡ Sodium Trend</p>
            <p className="text-sm text-gray-600">
              Your sodium intake increased by 8% this week.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="font-medium text-emerald-800 mb-2">💚 Heart Health</p>
            <p className="text-sm text-gray-600">
              Great job avoiding trans fats in recent scans!
            </p>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <p className="font-medium text-indigo-800 mb-2">🧠 AI Insight</p>
            <p className="text-sm text-gray-600">
              Consider more whole foods for better nutrition.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid sm:grid-cols-3 gap-5"
      >
        <Link to="/research">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            Scan New Product
          </button>
        </Link>
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Crown className="w-4 h-4" />
          Upgrade to Pro
        </button>
        <Link to="/history">
          <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <BarChart3 className="w-4 h-4" />
            View History
          </button>
        </Link>
      </motion.div>

      {/* Footer banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center p-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
      >
        <h3 className="text-xl font-semibold">Ready to Go Pro? 🚀</h3>
        <p className="text-sm mt-1 opacity-90">
          Unlock unlimited scans, AI insights, and family sharing.
        </p>
        <button className="mt-4 bg-white text-purple-700 hover:bg-gray-100 px-6 py-2 rounded-xl transition-colors">
          Upgrade Now →
        </button>
      </motion.div>
    </motion.div>
  )
}

export default CleanDashboard
