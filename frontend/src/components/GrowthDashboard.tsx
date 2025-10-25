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
  ArrowRight
} from 'lucide-react'

const GrowthDashboard: React.FC = () => {
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
    if (totalUsed >= 10) achievements.push({ icon: '🎯', title: 'First 10 Scans', description: 'You\'re getting started!' })
    if (totalUsed >= 25) achievements.push({ icon: '🏆', title: 'Health Explorer', description: '25 scans completed!' })
    if (totalUsed >= 50) achievements.push({ icon: '👑', title: 'Nutrition Master', description: '50 scans completed!' })
    return achievements
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">{getMotivationalMessage()}</p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Health Score</h3>
                <p className="text-sm text-gray-600">Based on your scans</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">{getHealthScore()}/100</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getHealthScore()}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
              />
            </div>
          </motion.div>

          {/* Total Scans */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Scans</h3>
                <p className="text-sm text-gray-600">Products analyzed</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-teal-600 mb-2">{totalUsed}</div>
            <p className="text-sm text-gray-600">Keep scanning to improve your score!</p>
          </motion.div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Goal Progress</h3>
                <p className="text-sm text-gray-600">{profile?.primary_goal || 'General wellness'}</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-cyan-600 mb-2">
              {Math.min(Math.round((totalUsed / 50) * 100), 100)}%
            </div>
            <p className="text-sm text-gray-600">Towards your health goal</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => window.location.href = '/research'}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
            >
              <Camera className="h-5 w-5" />
              <span>Scan New Product</span>
            </button>
            <button
              onClick={() => {
                setUpgradeTrigger('feature_limit')
                setShowUpgradeModal(true)
              }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              <Crown className="h-5 w-5" />
              <span>Upgrade to Pro</span>
            </button>
            <button
              onClick={() => window.location.href = '/dashboard/history'}
              className="flex items-center gap-3 p-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <BarChart3 className="h-5 w-5" />
              <span>View History</span>
            </button>
          </div>
        </motion.div>

        {/* Achievements */}
        {getAchievements().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Achievements
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {getAchievements().map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upgrade CTA */}
        {scansLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Ready to Go Pro? 🚀</h3>
            <p className="text-purple-100 mb-6">
              Unlock unlimited scans, advanced AI insights, and health analytics.
            </p>
            <button
              onClick={() => {
                setUpgradeTrigger('low_scans')
                setShowUpgradeModal(true)
              }}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
            >
              <Crown className="h-5 w-5" />
              Upgrade Now
              <ArrowRight className="h-5 w-5" />
            </button>
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

export default GrowthDashboard


