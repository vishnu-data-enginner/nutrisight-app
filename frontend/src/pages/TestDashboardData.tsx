import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, User, ChevronDown, Settings, LogOut, Camera, Crown, BarChart3, Heart, Zap, Target, Activity, TrendingUp } from 'lucide-react'
import CircularProgress from '../components/CircularProgress'
import ProgressBar from '../components/ProgressBar'

const TestDashboardData: React.FC = () => {
  const [testData, setTestData] = useState({
    username: 'anjana.swapna',
    total_scans: 40,
    free_scans: 10,
    average_health_score: 75,
    goal_progress: 80,
    isProUser: false,
    shouldShowUpgradePrompt: true
  })

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const handleLogout = async () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              NutriSight
            </span>
          </motion.div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* AI Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-200 dark:border-emerald-700"
            >
              <motion.div 
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI Active</span>
            </motion.div>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-900 dark:text-white font-medium">
                  {testData.username}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Brain className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Dashboard</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Profile & Settings</span>
                    </button>
                    <hr className="my-2 border-slate-200 dark:border-slate-700" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 dark:text-red-400">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pro Upgrade Hero Banner */}
      {testData.shouldShowUpgradePrompt && (
        <section className="relative max-w-6xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[2px] shadow-lg hover:shadow-pink-400/50 transition-all duration-500"
          >
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  ⚡ Upgrade Soon!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">
                  You're running low on free scans. Upgrade to Pro for unlimited scans, 
                  advanced AI insights, and priority support.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white text-lg px-8 py-4 rounded-full shadow-md flex items-center gap-2"
                  >
                    <Crown className="w-5 h-5" /> Upgrade Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Your Dashboard, {testData.username} 👋
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Your AI-powered nutrition insights await.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Scans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Total Scans</h3>
                <BarChart3 className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{testData.total_scans}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Products analyzed</p>
            </div>
          </motion.div>

          {/* Health Score with Circular Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Health Score</h3>
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div className="flex items-center justify-center mb-4">
                <CircularProgress 
                  value={testData.average_health_score} 
                  max={100} 
                  color="#00C982" 
                  label="Score"
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Average score</p>
              {testData.average_health_score > 0 && (
                <div className="flex items-center justify-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="font-medium text-emerald-600">Improving</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Free Scans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Free Scans</h3>
                <Zap className="w-6 h-6 text-cyan-500" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {testData.isProUser ? (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Unlimited
                  </span>
                ) : (
                  testData.free_scans
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {testData.isProUser ? 'Pro Plan Active' : 'Scans remaining'}
              </p>
              {testData.shouldShowUpgradePrompt && (
                <div className="mt-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs rounded-full text-center">
                  Upgrade Soon!
                </div>
              )}
            </div>
          </motion.div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Goal Progress</h3>
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{testData.goal_progress}%</div>
              <ProgressBar value={testData.goal_progress} max={100} color="#00C982" label="Health Goal" />
            </div>
          </motion.div>
        </div>

        {/* AI Health Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">AI Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">⚡ Sodium Trend</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Your sodium intake increased by 8% this week. Consider reducing processed foods.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">💚 Heart Health</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Good job avoiding trans fats in recent scans. Keep up the excellent work!</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">🧠 AI Insight</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Try more whole foods for balanced nutrition density.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Footer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
            <Camera className="w-5 h-5" />
            📸 Scan New Product
          </button>
          
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl animate-pulse">
            <Crown className="w-5 h-5" />
            👑 Upgrade to Pro
          </button>
          
          <button className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors flex items-center justify-center gap-3">
            <BarChart3 className="w-5 h-5" />
            📊 View History
          </button>
        </motion.div>

        {/* Test Data Display */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4">
            🧪 Test Data (This shows what the dashboard should look like with real data)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Username:</strong> {testData.username}</div>
            <div><strong>Total Scans:</strong> {testData.total_scans}</div>
            <div><strong>Free Scans:</strong> {testData.free_scans}</div>
            <div><strong>Health Score:</strong> {testData.average_health_score}</div>
            <div><strong>Goal Progress:</strong> {testData.goal_progress}%</div>
            <div><strong>Should Upgrade:</strong> {testData.shouldShowUpgradePrompt ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestDashboardData
