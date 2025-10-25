import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
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
  Moon
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const FuturisticDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [healthPulse, setHealthPulse] = useState(72)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

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

    return () => clearInterval(pulseInterval)
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

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX)
    mouseY.set(event.clientY)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-emerald-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
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
      </div>

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-lg border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-slate-300" />
        )}
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Cinematic Hero Zone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* AI Avatar Orb */}
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-sm opacity-60"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi <span className="text-emerald-400">{user?.email?.split('@')[0] || 'User'}</span> 👋
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Nutrition AI is analyzing your week...
          </motion.p>
          
          <motion.p 
            className="text-lg text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Here's how you're doing today based on your scans.
          </motion.p>
        </motion.div>

        {/* AI Health Pulse Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full border border-emerald-400/30 backdrop-blur-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                  '0 0 40px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-emerald-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  {Math.round(healthPulse)}
                </motion.div>
                <div className="text-sm text-slate-300">Health Pulse</div>
              </div>
            </motion.div>
            
            {/* Pulse Rings */}
            <motion.div
              className="absolute inset-0 border border-emerald-400/20 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 border border-emerald-400/10 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Pro Upgrade Hero Banner */}
        <section className="relative max-w-6xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] shadow-lg hover:shadow-emerald-400/50 transition-all duration-500"
          >
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Text Section */}
              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  ✨ Unlock <span className="text-emerald-600 dark:text-emerald-400">AI-Powered Nutrition</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">
                  Go Pro to access deep AI health insights, sodium tracking, family sharing, and unlimited scans.  
                  Let NutriSight guide you toward your healthiest self.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white text-lg px-8 py-4 rounded-full shadow-md flex items-center gap-2"
                  >
                    <Crown className="w-5 h-5" /> Upgrade Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-lg px-8 py-4 rounded-full border-2"
                  >
                    View Pro Plans
                  </motion.button>
                </div>
              </div>

              {/* Animated Right Visual */}
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-purple-400 blur-[1px] flex items-center justify-center shadow-2xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-32 h-32 md:w-40 md:h-40 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20"
                >
                  <Crown className="w-10 h-10 text-emerald-500 dark:text-emerald-300" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Glowing Blur Effect */}
          <motion.div
            className="absolute -z-10 inset-0 blur-[100px] bg-gradient-to-r from-emerald-400/30 via-cyan-400/20 to-purple-400/30"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
        </section>

        {/* Futuristic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Free Scans',
              value: '0',
              subtitle: 'used / 50 total',
              icon: Camera,
              color: 'emerald',
              glow: 'emerald',
              cta: 'Upgrade to Pro'
            },
            {
              title: 'Health Score',
              value: '60',
              subtitle: 'Keep scanning to improve',
              icon: Heart,
              color: 'cyan',
              glow: 'cyan'
            },
            {
              title: 'Total Scans',
              value: scans.length.toString(),
              subtitle: 'Products analyzed',
              icon: BarChart3,
              color: 'blue',
              glow: 'blue'
            },
            {
              title: 'Goal Progress',
              value: '0%',
              subtitle: 'towards your health goal',
              icon: TrendingUp,
              color: 'purple',
              glow: 'purple'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-slate-800/40 backdrop-blur-lg border border-${stat.glow}-400/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              {/* Glowing Background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r from-${stat.glow}-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  {stat.cta && (
                    <motion.div 
                      className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Crown className="w-3 h-3" />
                      Pro
                    </motion.div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-sm text-slate-300 mb-4">{stat.subtitle}</p>
                
                {stat.cta && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {stat.cta}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Health Insights - Glowing Research Pods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="bg-slate-800/40 backdrop-blur-lg border border-emerald-400/20 rounded-2xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-6 h-6 text-emerald-400" />
            </motion.div>
            AI Health Insights
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: '⚡ Sodium Trend',
                description: 'Your sodium intake increased by 8% this week.',
                color: 'amber',
                icon: TrendingUp
              },
              {
                title: '💚 Heart Health',
                description: 'Great job avoiding trans fats in recent scans!',
                color: 'emerald',
                icon: Heart
              },
              {
                title: '🧠 AI Insight',
                description: 'Consider more whole foods for better nutrition.',
                color: 'indigo',
                icon: Brain
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-xl bg-${insight.color}-500/10 border border-${insight.color}-400/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <insight.icon className={`w-5 h-5 text-${insight.color}-400`} />
                  <p className="font-semibold text-white">{insight.title}</p>
                </div>
                <p className="text-sm text-slate-300">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        {scans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="bg-slate-800/40 backdrop-blur-lg border border-emerald-400/20 rounded-2xl p-8 shadow-lg mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-400" />
                Recent Scans
              </h3>
              <Link to="/scan-history">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
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
                  transition={{ duration: 0.6, delay: 2.0 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-slate-700/40 hover:bg-slate-700/60 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                      {scan.product_name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{scan.product_name || 'Unknown Product'}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
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
                        className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
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
          transition={{ duration: 0.8, delay: 2.2 }}
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
              className="w-full border border-slate-600 text-slate-300 px-6 py-4 rounded-xl font-semibold hover:bg-slate-700/40 transition-colors flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              View History
            </motion.button>
          </Link>
        </motion.div>

        {/* Premium CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="relative text-center p-12 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-lg shadow-2xl overflow-hidden"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1))',
                'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium text-white">Ready to Go Pro?</span>
            </motion.div>

            <h3 className="text-4xl font-bold text-white mb-4">Unlock Your Full Potential 🚀</h3>
            <p className="text-lg mb-8 text-slate-300 max-w-2xl mx-auto">
              Get unlimited scans, advanced AI insights, family sharing, and priority support.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Upgrade Now →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FuturisticDashboard
