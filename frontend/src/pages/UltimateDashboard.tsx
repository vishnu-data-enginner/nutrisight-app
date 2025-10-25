import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  User,
  Settings,
  LogOut,
  ChevronDown,
  Star,
  Award,
  Users,
  Clock,
  ArrowUpRight,
  Flame,
  TrendingDown,
  Info
} from 'lucide-react'
import { supabase } from '../utils/supabaseClient'


// Stat Card Component
const StatCard: React.FC<{
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<any>
  color: string
  trend?: string
  isPro?: boolean
  delay?: number
}> = ({ title, value, subtitle, icon: Icon, color, trend, isPro, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`w-12 h-12 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center shadow-lg`}
            whileHover={{ rotate: 5 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="flex items-center gap-2">
            {isPro && (
              <motion.div 
                className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="w-3 h-3" />
                Pro
              </motion.div>
            )}
            {trend && (
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                {trend}
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <motion.div 
          className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {value}
        </motion.div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  )
}

// Insight Card Component
const InsightCard: React.FC<{
  title: string
  description: string
  color: string
  icon: React.ComponentType<any>
  status: 'good' | 'warning' | 'info'
  delay?: number
}> = ({ title, description, color, icon: Icon, status, delay = 0 }) => {
  const statusColors = {
    good: 'emerald',
    warning: 'amber',
    info: 'blue'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 rounded-xl bg-${statusColors[status]}-500/10 border border-${statusColors[status]}-400/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 text-${statusColors[status]}-500`} />
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  )
}

// Pro Banner Component
const ProBanner: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
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
        
        {/* Pro Perks Glow Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: '🧠', text: 'AI Insights' },
            { icon: '💚', text: 'Personalized Health' },
            { icon: '⚡', text: 'Instant Scans' }
          ].map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.5 + index * 0.1 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <span className="text-lg">{perk.icon}</span>
              <span className="text-sm font-medium text-white">{perk.text}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Upgrade Now →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
          >
            View Plans
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Floating CTA Component
const FloatingCTA: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
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
    </AnimatePresence>
  )
}

const UltimateDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

  useEffect(() => {
    // Set mock data immediately - no Supabase calls
    setUser({ email: 'user@example.com' })
    setProfile({ username: 'User' })
    setScans([])
    setInsights([])
    setLoading(false)

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Show floating CTA on scroll
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // Calculate metrics
  const totalScans = scans.length
  const averageScore = scans.length > 0 ? Math.round(scans.reduce((sum, scan) => sum + (scan.scan_score || 0), 0) / scans.length) : 0
  const freeScansUsed = Math.min(totalScans, 50)
  const freeScansRemaining = Math.max(0, 50 - freeScansUsed)
  const goalProgress = Math.min(100, Math.round((totalScans / 10) * 100)) // 10 scans = 100% goal

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-emerald-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
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


      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">NutriSight</span>
          </motion.div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}

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
                  {profile?.username || user?.email?.split('@')[0] || 'User'}
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
            Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{profile?.username || user?.email?.split('@')[0] || 'User'}</span> 👋
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Track your health progress powered by AI and science.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Free Scans"
            value={`${freeScansRemaining} / 50`}
            subtitle="scans remaining"
            icon={Camera}
            color="emerald"
            trend="+12%"
            delay={0.6}
          />
          <StatCard
            title="Health Score"
            value={averageScore || 0}
            subtitle="average score"
            icon={Heart}
            color="cyan"
            trend="+5%"
            delay={0.7}
          />
          <StatCard
            title="Total Scans"
            value={totalScans}
            subtitle="products analyzed"
            icon={BarChart3}
            color="blue"
            trend="+8%"
            delay={0.8}
          />
          <StatCard
            title="Goal Progress"
            value={`${goalProgress}%`}
            subtitle="towards your goal"
            icon={TrendingUp}
            color="purple"
            trend="+3%"
            isPro={true}
            delay={0.9}
          />
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
            {insights.length > 0 ? insights.map((insight, index) => (
              <InsightCard
                key={index}
                title={insight.insight_type || 'AI Insight'}
                description={insight.summary || 'Personalized health recommendation'}
                color="indigo"
                icon={Brain}
                status="info"
                delay={1.2 + index * 0.1}
              />
            )) : (
              <>
                <InsightCard
                  title="Sodium Trend"
                  description="Your sodium intake increased by 8% this week."
                  color="amber"
                  icon={TrendingUp}
                  status="warning"
                  delay={1.2}
                />
                <InsightCard
                  title="Heart Health"
                  description="Great job avoiding trans fats in recent scans!"
                  color="emerald"
                  icon={Heart}
                  status="good"
                  delay={1.3}
                />
                <InsightCard
                  title="AI Recommendation"
                  description="Consider more whole foods for better nutrition."
                  color="indigo"
                  icon={Brain}
                  status="info"
                  delay={1.4}
                />
              </>
            )}
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
              {scans.slice(0, 5).map((scan, index) => (
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
                    <div className="px-4 py-2 rounded-xl border bg-emerald-500/20 border-emerald-400/30">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-emerald-400">
                          {scan.scan_score || 0}/100
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
          
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </motion.button>
          </Link>
          
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

        {/* Pro Banner */}
        <ProBanner delay={2.0} />
      </div>

      {/* Floating CTA */}
      <FloatingCTA show={showFloatingCTA} />
    </div>
  )
}

export default UltimateDashboard
