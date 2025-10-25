import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, User, ChevronDown, Settings, LogOut, Camera, Crown, BarChart3,
  Heart, Zap, Target, Activity, TrendingUp, CheckCircle
} from 'lucide-react'
import { supabase } from '../utils/supabaseClient'
import { createClient } from '@supabase/supabase-js'

// Create a fresh Supabase client instance for dashboard
const dashboardSupabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://wbhvqovehnlcjodbmcul.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
)
import CircularProgress from '../components/CircularProgress'
import ProgressBar from '../components/ProgressBar'

const ProductionDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  const fetchUserData = async () => {
    try {
      if (!user) {
        console.log('❌ No user found in fetchUserData')
        return
      }

      console.log('🔍 Fetching data for user:', user.id, user.email)

      // Fetch all user data in a single Promise.all for instant loading
      const [profilesResult, analysesResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(),
        
        supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ])

      console.log('📊 Profile data:', profilesResult.data, profilesResult.error)
      console.log('📈 Analyses data:', analysesResult.data?.length || 0, 'analyses')

      const profileData = profilesResult.data
      const analysesData = analysesResult.data || []

      // Calculate metrics from the profiles table
      const scansUsed = profileData?.scans_used || 0
      const freeScans = Math.max(50 - scansUsed, 0)
      const averageHealthScore = analysesData.length > 0 
        ? Math.round(analysesData.reduce((sum, analysis) => sum + (analysis.ai_score || 0), 0) / analysesData.length)
        : 0
      
      const dashboardData = {
        username: profileData?.name || user.email?.split('@')[0] || 'User',
        total_scans: scansUsed,
        free_scans: freeScans,
        average_health_score: averageHealthScore,
        goal_progress: scansUsed >= 50 ? 100 : Math.round((scansUsed / 50) * 100),
        isProUser: false, // No subscription system yet
        shouldShowUpgradePrompt: freeScans <= 5
      }

      console.log('📊 Real Supabase data:', {
        totalScans: dashboardData.total_scans,
        freeScans: dashboardData.free_scans,
        goalProgress: dashboardData.goal_progress,
        username: dashboardData.username
      })

      console.log('✅ Calculated dashboard data:', dashboardData)
      setUserData(dashboardData)
      setSubscription(null) // No subscription system yet

    } catch (error) {
      console.error('💥 Error fetching user data:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🚀 Starting dashboard data fetch...')
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        console.log('👤 Auth result:', { user, userError })
        
        if (user) {
          setUser(user)
          console.log('✅ User found:', user.email)
          await fetchUserData()
        } else {
          console.log('❌ No user found, fetching real data without authentication...')
          
          // Fetch user data with proper scan logic
          try {
            console.log('🔄 Fetching user data with proper scan logic...');
            
            // 1. Fetch user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('email', 'anjana.swapna@gmail.com')
              .single();

            if (profileError) {
              console.error('Profile Error:', profileError.message);
              throw profileError;
            }

            // 2. Fetch total scans from analyses table
            console.log('🔍 Fetching scans for user ID:', profile.id);
            const { count: totalScans, error: scansError } = await supabase
              .from('analyses')
              .select('id', { count: 'exact', head: true })
              .eq('user_id', profile.id);
            
            console.log('📊 Scans result:', { totalScans, scansError });

            if (scansError) {
              console.error('Scans Error:', scansError.message);
              throw scansError;
            }

            // 3. Fetch subscription status
            const { data: subscription } = await supabase
              .from('subscriptions')
              .select('plan_type, status')
              .eq('user_id', profile.id)
              .single();

            // 4. Calculate values with proper logic
            // Use analyses count if available, otherwise fall back to profiles.scans_used
            const actualTotalScans = totalScans || profile.scans_used || 0;
            const planType = subscription?.plan_type || 'free';
            const isProUser = planType === 'pro' && subscription?.status === 'active';
            
            console.log('📊 Using scans data:', {
              fromAnalyses: totalScans,
              fromProfile: profile.scans_used,
              finalTotal: actualTotalScans
            });
            
            // Free Plan Logic
            const freeScans = isProUser ? 'Unlimited' : Math.max(50 - actualTotalScans, 0);
            const goalProgress = isProUser ? 100 : Math.min(100, Math.round((actualTotalScans / 50) * 100));
            const shouldShowUpgradePrompt = !isProUser && actualTotalScans >= 50;

            console.log('✅ Calculated values:', {
              actualTotalScans,
              planType,
              isProUser,
              freeScans,
              goalProgress,
              shouldShowUpgradePrompt
            });
            
            const newUserData = {
              username: profile.name,
              total_scans: actualTotalScans,
              free_scans: freeScans,
              average_health_score: 0,
              goal_progress: goalProgress,
              isProUser: isProUser,
              shouldShowUpgradePrompt: shouldShowUpgradePrompt
            };
            
            console.log('🎯 Setting user data:', newUserData);
            setUserData(newUserData);
            console.log('✅ User data set successfully');
            return;
          } catch (err: any) {
            console.error('💥 Error:', err);
          }

          // Fallback data if no real data found
          console.log('⚠️ Using fallback data');
          setUserData({
            username: 'Guest User',
            total_scans: 0,
            free_scans: 50,
            average_health_score: 0,
            goal_progress: 0,
            isProUser: false,
            shouldShowUpgradePrompt: false
          })
        }
      } catch (error) {
        console.error('💥 Error fetching data:', error)
        // Set fallback data on error
        setUserData({
          username: 'Guest User',
          total_scans: 0,
          free_scans: 50,
          average_health_score: 0,
          goal_progress: 0,
          isProUser: false,
          shouldShowUpgradePrompt: false
        })
      } finally {
        setLoading(false)
        console.log('🏁 Dashboard data fetch completed')
      }
    }

    fetchData()

    // Show floating CTA on scroll
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Real-time updates without toast spam
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'analyses',
          filter: `user_id=eq.${user.id}`
        }, 
        () => fetchUserData()
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        () => fetchUserData()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
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
                  {userData?.username || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
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
              </AnimatePresence>
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
          className="text-center py-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Your Dashboard, {userData?.username || 'User'} 👋
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
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{userData?.total_scans || 0}</div>
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
                  value={userData?.average_health_score || 0} 
                  max={100} 
                  color="#00C982" 
                  label="Score"
                />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Average score</p>
              {userData?.average_health_score > 0 && (
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
              
              {userData?.isProUser ? (
                // Pro User - Unlimited Scans
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Unlimited
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Pro Plan Active</p>
                </div>
              ) : userData?.free_scans === 0 ? (
                // Out of Scans - Upgrade prompt
                <div className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-red-500 mb-2">0</div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    Upgrade to Pro for unlimited scans, advanced AI insights, and priority support.
                  </p>
                  <Link to="/pricing">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Upgrade Now
                    </motion.button>
                  </Link>
                </div>
              ) : (
                // Has Scans Left - Progress Bar
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {userData?.free_scans || 50}
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        userData?.goal_progress > 75
                          ? 'bg-green-500'
                          : userData?.goal_progress > 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${userData?.goal_progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {userData?.total_scans || 0} / 50 scans used
                  </p>
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
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{userData?.goal_progress || 0}%</div>
              <ProgressBar value={userData?.goal_progress || 0} max={100} color="#00C982" label="Health Goal" />
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

        {/* Single Upgrade Banner - Only show when out of scans */}
        {!userData?.isProUser && userData?.free_scans === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8"
          >
            <div className="bg-red-900/30 border border-red-500/40 text-red-300 p-6 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-bold">⚡ You're out of free scans!</h3>
              </div>
              <p className="text-red-200 mb-4">
                Upgrade to Pro for unlimited scans, advanced AI insights, and priority support.
              </p>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Upgrade Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* CTA Footer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className={`grid gap-6 mb-12 ${userData?.free_scans === 0 && !userData?.isProUser ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}
        >
          {/* Only show Scan New Product if user has free scans or is Pro */}
          {(!userData?.shouldShowUpgradePrompt || userData?.isProUser) && (
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
          )}
          
          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                userData?.shouldShowUpgradePrompt 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white animate-pulse' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white'
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

export default ProductionDashboard
