import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Camera, 
  Crown, 
  BarChart3, 
  TrendingUp, 
  Heart, 
  Brain, 
  Zap, 
  Shield,
  ArrowRight,
  Calendar,
  Eye,
  Share2,
  Download,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const UpgradedDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          
          // Fetch recent scans
          const { data: scansData } = await supabase
            .from('analyses')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
          
          setScans(scansData || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-200'
    if (score >= 60) return 'bg-blue-50 border-blue-200'
    if (score >= 40) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-emerald-600" />
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-blue-600" />
    if (score >= 40) return <AlertTriangle className="w-4 h-4 text-amber-600" />
    return <AlertTriangle className="w-4 h-4 text-red-600" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-emerald-600">{user?.email?.split('@')[0] || 'User'}!</span> 👋
          </h1>
          <p className="text-xl text-gray-600">
            Time to upgrade! Unlock unlimited scans and advanced features.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Free Scans',
              value: '0',
              subtitle: 'used / 50 total',
              icon: Camera,
              color: 'emerald',
              cta: 'Upgrade to Pro'
            },
            {
              title: 'Health Score',
              value: '60',
              subtitle: 'Keep scanning to improve',
              icon: Heart,
              color: 'blue'
            },
            {
              title: 'Total Scans',
              value: scans.length.toString(),
              subtitle: 'Products analyzed',
              icon: BarChart3,
              color: 'cyan'
            },
            {
              title: 'Goal Progress',
              value: '0%',
              subtitle: 'towards your health goal',
              icon: TrendingUp,
              color: 'purple'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {stat.cta && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    Pro
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <p className="text-sm text-gray-600 mb-4">{stat.subtitle}</p>
              {stat.cta && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {stat.cta}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* AI Health Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-emerald-600" />
            AI Health Insights
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: '⚡ Sodium Trend',
                description: 'Your sodium intake increased by 8% this week.',
                color: 'amber'
              },
              {
                title: '💚 Heart Health',
                description: 'Great job avoiding trans fats in recent scans!',
                color: 'emerald'
              },
              {
                title: '🧠 AI Insight',
                description: 'Consider more whole foods for better nutrition.',
                color: 'indigo'
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className={`p-6 rounded-xl bg-${insight.color}-50 border border-${insight.color}-100`}
              >
                <p className="font-semibold text-gray-900 mb-2">{insight.title}</p>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-600" />
                Recent Scans
              </h3>
              <Link to="/scan-history">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
            <div className="space-y-4">
              {scans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold">
                      {scan.product_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{scan.product_name || 'Unknown Product'}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(scan.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl border ${getScoreBg(scan.ai_score)}`}>
                      <div className="flex items-center gap-2">
                        {getScoreIcon(scan.ai_score)}
                        <span className={`text-lg font-bold ${getScoreColor(scan.ai_score)}`}>
                          {scan.ai_score}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          <Link to="/research">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <Camera className="w-5 h-5" />
              Scan New Product
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
          >
            <Crown className="w-5 h-5" />
            Upgrade to Pro
          </motion.button>
          <Link to="/scan-history">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              View History
            </motion.button>
          </Link>
        </motion.div>

        {/* Pro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center p-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Go Pro? 🚀</h3>
          <p className="text-lg mb-6 opacity-90">
            Unlock unlimited scans, AI insights, and family sharing.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Upgrade Now →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default UpgradedDashboard
