import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  Activity,
  Sparkles,
  Target,
  Pulse,
  Cpu,
  Wifi,
  Battery,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Star,
  Award,
  Users,
  Clock,
  ArrowUpRight
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const ModernDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [healthPulse, setHealthPulse] = useState(72)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

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

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Animate health pulse
    const pulseInterval = setInterval(() => {
      setHealthPulse(prev => prev + (Math.random() - 0.5) * 4)
    }, 2000)

    // Show floating CTA on scroll
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(pulseInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-cyan-400'
    if (score >= 40) return 'text-amber-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/20 border-emerald-400/30'
    if (score >= 60) return 'bg-cyan-500/20 border-cyan-400/30'
    if (score >= 40) return 'bg-amber-500/20 border-amber-400/30'
    return 'bg-red-500/20 border-red-400/30'
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-emerald-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Health Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {['💚', '🧠', '🥦', '🍎', '💪', '🌟'].map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 3) * 25}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">NutriSight</span>
          </motion.div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </motion.button>

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
                  {user?.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Settings</span>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{user?.email?.split('@')[0] || 'User'}</span> 👋
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your AI nutrition assistant is ready to help you make healthier choices.
          </motion.p>
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
              trend: '+12%',
              isPro: false
            },
            {
              title: 'Health Score',
              value: '72',
              subtitle: 'Keep scanning to improve',
              icon: Heart,
              color: 'cyan',
              trend: '+5%',
              isPro: false
            },
            {
              title: 'Total Scans',
              value: scans.length.toString(),
              subtitle: 'Products analyzed',
              icon: BarChart3,
              color: 'blue',
              trend: '+8%',
              isPro: false
            },
            {
              title: 'Goal Progress',
              value: '0%',
              subtitle: 'towards your health goal',
              icon: TrendingUp,
              color: 'purple',
              trend: '+3%',
              isPro: true
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex items-center gap-2">
                    {stat.isPro && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <Crown className="w-3 h-3" />
                        Pro
                      </div>
                    )}
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{stat.title}</h3>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Health Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-lg mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">AI Health Insights</h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Sodium Trend',
                description: 'Your sodium intake increased by 8% this week.',
                color: 'amber',
                icon: TrendingUp,
                status: 'warning'
              },
              {
                title: 'Heart Health',
                description: 'Great job avoiding trans fats in recent scans!',
                color: 'emerald',
                icon: Heart,
                status: 'good'
              },
              {
                title: 'AI Insight',
                description: 'Consider more whole foods for better nutrition.',
                color: 'indigo',
                icon: Brain,
                status: 'info'
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-xl bg-${insight.color}-500/10 border border-${insight.color}-400/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <insight.icon className={`w-5 h-5 text-${insight.color}-500`} />
                  <p className="font-semibold text-slate-900 dark:text-white">{insight.title}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-lg mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Recent Scans
              </h3>
              <Link to="/scan-history">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
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
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/50 hover:bg-slate-100/50 dark:hover:bg-slate-600/50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                      {scan.product_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{scan.product_name || 'Unknown Product'}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(scan.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl border ${getScoreBg(scan.ai_score)}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getScoreColor(scan.ai_score)}`}>
                          {scan.ai_score}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          <Link to="/research">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Camera className="w-5 h-5" />
              Scan New Product
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Crown className="w-5 h-5" />
            Upgrade to Pro
          </motion.button>
          
          <Link to="/scan-history">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              View History
            </motion.button>
          </Link>
        </motion.div>

        {/* Pro Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] shadow-lg hover:shadow-emerald-400/50 transition-all duration-500"
        >
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-8 py-12 text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-white">Ready to Go Pro?</span>
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-4">Unlock Your Full Potential 🚀</h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Get unlimited scans, advanced AI insights, family sharing, and priority support.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Upgrade Now →
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Upgrade Now
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default ModernDashboard
