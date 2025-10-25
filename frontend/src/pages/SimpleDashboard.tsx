import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Camera, 
  Crown, 
  BarChart3, 
  Heart, 
  Zap, 
  Target, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Activity,
  Sparkles,
  Share2,
  ArrowRight,
  Calendar,
  Eye,
  CheckCircle,
  AlertTriangle,
  Flame,
  Shield,
  Cpu,
  Battery,
  Wifi
} from 'lucide-react'
import { supabase } from '../utils/supabaseClient'

// Circular Progress Component
const CircularProgress: React.FC<{ 
  value: number; 
  max: number; 
  size?: number; 
  strokeWidth?: number; 
  color?: string;
  label?: string;
}> = ({ value, max, size = 120, strokeWidth = 8, color = "#00C982", label }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / max) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
          {label && <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>}
        </div>
      </div>
    </div>
  )
}

// Progress Bar Component
const ProgressBar: React.FC<{ 
  value: number; 
  max: number; 
  color?: string;
  label?: string;
}> = ({ value, max, color = "#00C982", label }) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

const SimpleDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

  const fetchUserData = async () => {
    try {
      if (user) {
        console.log('🔍 Fetching data for user:', user.id)
        
        // Fetch user data from profiles table (your existing table)
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        console.log('📊 Profile data response:', { profileData, profileError })
        
        if (profileError) {
          console.log('❌ Profile data error:', profileError)
          console.log('🔍 Profile error details:', {
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
            code: profileError.code
          })
          
          // Create default user data if not exists
          const defaultData = {
            free_scans: 50,
            total_scans: 0,
            average_health_score: 0,
            scans_used: 0,
            username: user.email?.split('@')[0] || 'User'
          }
          setUserData(defaultData)
          console.log('✅ Using default user data:', defaultData)
        } else {
          // Convert profile data to userData format
          const userData = {
            free_scans: 50 - (profileData.scans_used || 0),
            total_scans: profileData.scans_used || 0,
            average_health_score: 0, // We'll calculate this from scans
            scans_used: profileData.scans_used || 0,
            username: profileData.name || user.email?.split('@')[0] || 'User'
          }
          setUserData(userData)
          console.log('✅ Profile data loaded:', userData)
          
          // Show success toast if this is a refresh after a scan
          if (userData.total_scans > 0) {
            setShowSuccessToast(true)
            setTimeout(() => setShowSuccessToast(false), 3000)
          }
        }

        // Fetch user analyses from analyses table
        const { data: analysesData, error: analysesError } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)
        
        console.log('📈 Analyses data response:', { analysesData, analysesError })
        
        if (analysesError) {
          console.log('❌ Analyses error:', analysesError)
          setScans([])
        } else {
          setScans(analysesData || [])
          console.log('✅ Analyses loaded:', analysesData?.length || 0, 'analyses')
          
          // Calculate average health score from analyses
          if (analysesData && analysesData.length > 0) {
            const avgScore = Math.round(analysesData.reduce((sum, analysis) => sum + (analysis.ai_score || 0), 0) / analysesData.length)
            setUserData(prev => ({ ...prev, average_health_score: avgScore }))
            console.log('📊 Calculated average health score:', avgScore)
          }
        }
      }
    } catch (error) {
      console.error('💥 Error fetching user data:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Starting data fetch...')
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        console.log('👤 Auth user result:', { user })
        
        if (user) {
          setUser(user)
          console.log('✅ User found:', user.email)
          console.log('🔄 Calling fetchUserData...')
          await fetchUserData()
        } else {
          console.log('❌ No user found')
        }
      } catch (error) {
        console.error('💥 Error fetching data:', error)
        // Set fallback data
        setUser({ email: 'user@example.com' })
        setUserData({
          free_scans: 50,
          total_scans: 0,
          average_health_score: 0
        })
        setScans([])
      } finally {
        setLoading(false)
        console.log('🏁 Data fetch completed')
      }
    }

    console.log('🎯 useEffect triggered - fetching data')
    fetchData()


    // Show floating CTA on scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Real-time updates and auto-refresh
  useEffect(() => {
    if (!user) return

    // Auto-refresh when page becomes visible (user returns from scan)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible, refreshing data...')
        fetchUserData()
      }
    }

    // Auto-refresh when user navigates back to dashboard
    const handleFocus = () => {
      console.log('Window focused, refreshing data...')
      fetchUserData()
    }

    // Set up real-time subscription to analyses and profiles tables
    const analysesSubscription = supabase
      .channel('analyses-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'analyses',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          console.log('New analysis detected:', payload)
          fetchUserData()
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log('Profile data updated:', payload)
          fetchUserData()
        }
      )
      .subscribe()

    // Periodic refresh as fallback (every 10 seconds)
    const intervalId = setInterval(() => {
      console.log('Periodic refresh...')
      fetchUserData()
    }, 10000)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
      supabase.removeChannel(analysesSubscription)
    }
  }, [user])


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Calculate metrics from Supabase data
  const totalScans = userData?.total_scans || 0
  const averageScore = Math.round(userData?.average_health_score || 0)
  const freeScansRemaining = userData?.free_scans || 50
  const goalProgress = Math.min(100, Math.round((totalScans / 10) * 100)) // 10 scans = 100% goal
  const shouldShowUpgradePrompt = freeScansRemaining <= 5

  // Debug info
  console.log('🔍 Dashboard Debug Info:', {
    user: user?.email,
    userData,
    scans: scans.length,
    totalScans,
    averageScore,
    freeScansRemaining,
    shouldShowUpgradePrompt,
    loading
  })

  // Show debug info in UI for testing
  const debugInfo = {
    userEmail: user?.email,
    userData: userData,
    scansCount: scans.length,
    totalScans,
    freeScansRemaining,
    loading
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
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

      {/* Futuristic Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with AI Glow */}
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
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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
                      {userData?.username || user?.email?.split('@')[0] || 'User'}
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
                    <Link to="/dashboard" className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Brain className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Dashboard</span>
                    </Link>
                    <Link to="/settings" className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Profile & Settings</span>
                    </Link>
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
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                ✨ Unlock <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">AI-Powered Nutrition</span>
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
            {/* Debug Panel - Remove in production */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700"
            >
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4">
                🐛 Debug Info (Remove in production)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>User Email:</strong> {debugInfo.userEmail || 'Not loaded'}
                </div>
                <div>
                  <strong>Loading:</strong> {debugInfo.loading ? 'Yes' : 'No'}
                </div>
                <div>
                  <strong>User Data:</strong> {userData ? 'Loaded' : 'Not loaded'}
                </div>
                <div>
                  <strong>Scans Count:</strong> {debugInfo.scansCount}
                </div>
                <div>
                  <strong>Total Scans:</strong> {debugInfo.totalScans}
                </div>
                <div>
                  <strong>Free Scans:</strong> {debugInfo.freeScansRemaining}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={fetchUserData}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  🔄 Refresh Data
                </button>
                <button
                  onClick={async () => {
                    console.log('🧪 Testing direct Supabase query...')
                    try {
                      const { data: { user } } = await supabase.auth.getUser()
                      console.log('👤 Current user:', user)
                      
                      if (user) {
                        const { data, error } = await supabase
                          .from('profiles')
                          .select('*')
                          .eq('id', user.id)
                          .single()
                        console.log('📊 Direct profiles query:', { data, error })
                        alert(`Direct query result: ${JSON.stringify({ data, error }, null, 2)}`)
                      }
                    } catch (err) {
                      console.error('💥 Direct query error:', err)
                      alert('Error: ' + err.message)
                    }
                  }}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors"
                >
                  🧪 Test Direct Query
                </button>
                <button
                  onClick={() => window.location.href = '/supabase-diagnostic'}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                >
                  🔍 Run Diagnostic
                </button>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-yellow-700 dark:text-yellow-300 font-medium">
                  Raw Debug Data
                </summary>
                <pre className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded text-xs overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Welcome to Your Dashboard, {userData?.username || user?.email?.split('@')[0] || 'User'} 👋
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
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{totalScans}</div>
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
                  value={averageScore || 0} 
                  max={100} 
                  color="#00C982" 
                  label="Score"
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Average score</p>
              {averageScore > 0 && (
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
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{freeScansRemaining}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Scans remaining</p>
              {shouldShowUpgradePrompt && (
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
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{goalProgress}%</div>
              <ProgressBar value={goalProgress} max={100} color="#00C982" label="Health Goal" />
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
          <Link to="/research">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Camera className="w-5 h-5" />
              📸 Scan New Product
            </motion.button>
          </Link>
          
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                shouldShowUpgradePrompt 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white animate-pulse' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white'
              }`}
            >
              <Crown className="w-5 h-5" />
              👑 Upgrade to Pro
            </motion.button>
          </Link>
          
          <Link to="/scan-history">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors flex items-center justify-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              📊 View History
            </motion.button>
          </Link>
        </motion.div>
      </div>

          {/* Success Toast */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-6 left-6 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Scan completed! Dashboard updated.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating CTA */}
          <AnimatePresence>
            {showFloatingCTA && (
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
    </div>
  )
}

export default SimpleDashboard
