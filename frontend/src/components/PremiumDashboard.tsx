import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import ScanCounter from './ScanCounter'
import UpgradeModal from './UpgradeModal'
import { 
  Camera, 
  TrendingUp, 
  Target, 
  Award, 
  BarChart3,
  Crown,
  Zap,
  Heart,
  Leaf,
  ArrowRight,
  Activity,
  Brain,
  Shield,
  Sparkles,
  Users,
  Clock
} from 'lucide-react'

const PremiumDashboard: React.FC = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [scansLeft, setScansLeft] = useState<number>(0)
  const [totalUsed, setTotalUsed] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeTrigger, setUpgradeTrigger] = useState<'low_scans' | 'feature_limit' | 'manual'>('manual')

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('health_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
        return
      }

      setProfile(data)
      setScansLeft(data?.scans_left || 0)
      setTotalUsed(data?.total_scans_used || 0)

      // Show upgrade modal if scans are low
      if (data?.scans_left <= 5 && data?.scans_left > 0) {
        setUpgradeTrigger('low_scans')
        setShowUpgradeModal(true)
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getMotivationalMessage = () => {
    if (scansLeft > 30) return "You're doing great! Keep exploring healthy options."
    if (scansLeft > 15) return "Nice progress! You're building healthy habits."
    if (scansLeft > 5) return "You're getting the hang of it! Consider upgrading for unlimited access."
    if (scansLeft > 0) return "Almost there! Upgrade now to continue your health journey."
    return "Time to upgrade! Unlock unlimited scans and advanced features."
  }

  const getHealthScore = () => {
    // Mock health score based on usage
    const baseScore = Math.min(60 + (totalUsed * 2), 95)
    return Math.round(baseScore)
  }

  const getAchievements = () => {
    const achievements = []
    if (totalUsed >= 10) achievements.push({ icon: '🎯', title: 'First 10 Scans', description: 'You\'re getting started!', color: 'emerald' })
    if (totalUsed >= 25) achievements.push({ icon: '🏆', title: 'Health Explorer', description: '25 scans completed!', color: 'blue' })
    if (totalUsed >= 50) achievements.push({ icon: '👑', title: 'Nutrition Master', description: '50 scans completed!', color: 'purple' })
    return achievements
  }

  const getHealthInsights = () => {
    const insights = [
      {
        icon: TrendingUp,
        title: "Sodium Trend",
        description: "Your sodium intake increased by 8% this week",
        type: "warning",
        color: "amber"
      },
      {
        icon: Heart,
        title: "Heart Health",
        description: "Great job avoiding trans fats in recent scans!",
        type: "positive",
        color: "emerald"
      },
      {
        icon: Brain,
        title: "AI Insight",
        description: "Consider more whole foods for better nutrition",
        type: "info",
        color: "blue"
      }
    ]
    return insights
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health cockpit...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -25, 0],
            y: [0, 25, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-emerald-200"
          >
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Your Health Intelligence Hub</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {user?.email?.split('@')[0] || 'User'}
            </span>
            ! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{getMotivationalMessage()}</p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Scan Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ScanCounter 
              onUpgradeClick={() => {
                setUpgradeTrigger('low_scans')
                setShowUpgradeModal(true)
              }}
            />
          </motion.div>

          {/* Health Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Health Score</h3>
                <p className="text-sm text-gray-600">Based on your scans</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-emerald-600 mb-4">{getHealthScore()}/100</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getHealthScore()}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full shadow-lg"
              />
            </div>
            <p className="text-sm text-gray-600">Keep scanning to improve!</p>
          </motion.div>

          {/* Total Scans */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Camera className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Total Scans</h3>
                <p className="text-sm text-gray-600">Products analyzed</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-teal-600 mb-4">{totalUsed}</div>
            <p className="text-sm text-gray-600">Building your nutrition knowledge!</p>
          </motion.div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Target className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Goal Progress</h3>
                <p className="text-sm text-gray-600">{profile?.primary_goal || 'General wellness'}</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-cyan-600 mb-4">
              {Math.min(Math.round((totalUsed / 50) * 100), 100)}%
            </div>
            <p className="text-sm text-gray-600">Towards your health goal</p>
          </motion.div>
        </div>

        {/* Health Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Brain className="h-6 w-6 text-emerald-600" />
            AI Health Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {getHealthInsights().map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-6 rounded-2xl border-2 ${
                  insight.type === 'positive' ? 'bg-emerald-50 border-emerald-200' :
                  insight.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                  'bg-blue-50 border-blue-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <insight.icon className={`h-6 w-6 ${
                    insight.type === 'positive' ? 'text-emerald-600' :
                    insight.type === 'warning' ? 'text-amber-600' :
                    'text-blue-600'
                  }`} />
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-emerald-600" />
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/research'}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Camera className="h-8 w-8" />
              <div className="text-left">
                <h4 className="font-semibold text-lg">Scan New Product</h4>
                <p className="text-emerald-100 text-sm">Analyze ingredients instantly</p>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setUpgradeTrigger('feature_limit')
                setShowUpgradeModal(true)
              }}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Crown className="h-8 w-8" />
              <div className="text-left">
                <h4 className="font-semibold text-lg">Upgrade to Pro</h4>
                <p className="text-purple-100 text-sm">Unlock unlimited scans</p>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard/history'}
              className="flex items-center gap-4 p-6 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BarChart3 className="h-8 w-8" />
              <div className="text-left">
                <h4 className="font-semibold text-lg">View History</h4>
                <p className="text-gray-500 text-sm">Track your progress</p>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Achievements */}
        {getAchievements().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-yellow-500" />
              Your Achievements
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {getAchievements().map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{achievement.title}</h4>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upgrade CTA */}
        {scansLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Go Pro? 🚀</h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Unlock unlimited scans, advanced AI insights, health analytics, and family sharing.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setUpgradeTrigger('low_scans')
                setShowUpgradeModal(true)
              }}
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto shadow-lg"
            >
              <Crown className="h-6 w-6" />
              Upgrade Now
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        trigger={upgradeTrigger}
        scansLeft={scansLeft}
      />
    </div>
  )
}

export default PremiumDashboard


