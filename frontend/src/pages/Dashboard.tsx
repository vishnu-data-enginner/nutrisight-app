import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserProfile, getUserAnalyses, incrementScansUsed, createUserProfile, getHealthProfile } from '../lib/supabase'
import { createCheckoutSession } from '../lib/stripe'
import Header from '../components/Header'
import ConnectionTest from '../components/ConnectionTest'
import SimpleDashboard from '../components/SimpleDashboard'
import StatCard from '../components/StatCard'
import ModernDashboard from '../components/ModernDashboard'
import ModernDashboardTable from '../components/ModernDashboardTable'
import UserScansDisplay from '../components/UserScansDisplay'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Camera, 
  Crown,
  BarChart3,
  Clock,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Target,
  Leaf,
  Activity,
  Sparkles,
  Upload,
  CheckCircle2
} from 'lucide-react'
import { motion } from 'framer-motion'

interface UserProfile {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro' | 'yearly'
  scans_used: number
  created_at: string
}

interface Analysis {
  id: string
  user_id: string
  image_url: string
  ai_score: number
  ingredients: string[]
  health_risks: any[]
  nutritional_insights: {
    summary: string
    recommendations: string[]
    tags: string[]
    risk_ingredients: string[]
    allergen_warnings: any[]
    target_demographics: any[]
    alternative_suggestions: any[]
    sustainability_score: number
    cost_effectiveness: number
    processing_level: number
    analysis_type: string
  }
  created_at: string
}

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [healthProfile, setHealthProfile] = useState<any>(null)
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload')

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      console.log('Loading user data for:', user.id)
      
      // Add timeout to prevent infinite loading
      const loadPromise = Promise.all([
        getUserProfile(user.id),
        getHealthProfile(user.id),
        getUserAnalyses(user.id)
      ])
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data loading timeout')), 10000)
      )
      
      const [profileResult, healthProfileResult, analysesResult] = await Promise.race([
        loadPromise,
        timeoutPromise
      ]) as any

      console.log('Profile result:', profileResult)
      console.log('Health profile result:', healthProfileResult)
      console.log('Analyses result:', analysesResult)

      // If profile doesn't exist, create one
      if (!profileResult.data && profileResult.error?.code === 'PGRST116') {
        console.log('Profile not found, creating one...')
        const { data: newProfile, error: createError } = await createUserProfile(
          user.id, 
          user.email || '', 
          user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]
        )
        
        if (newProfile && !createError) {
          setProfile(newProfile)
          console.log('Profile created successfully:', newProfile)
        } else {
          console.error('Error creating profile:', createError)
        }
      } else if (profileResult.data) {
        setProfile(profileResult.data)
        console.log('Profile loaded:', profileResult.data)
      } else {
        console.error('Profile error:', profileResult.error)
      }
      
      if (healthProfileResult.data) {
        setHealthProfile(healthProfileResult.data)
        console.log('Health profile loaded:', healthProfileResult.data)
      } else {
        console.log('No health profile found or error:', healthProfileResult.error)
      }
      
      if (analysesResult.data) {
        setAnalyses(analysesResult.data)
        console.log('Analyses loaded:', analysesResult.data.length, 'items')
      } else {
        console.log('No analyses found or error:', analysesResult.error)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      // Set default values to prevent infinite loading
      setProfile({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        plan: 'free',
        scans_used: 0,
        created_at: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planType: 'pro' | 'yearly') => {
    if (!user) return
    
    setUpgradeLoading(true)
    try {
      await createCheckoutSession(planType, user.id)
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setUpgradeLoading(false)
    }
  }

  const getScansRemaining = () => {
    if (!profile) return 0
    if (profile.plan === 'pro') return Math.max(0, 1000 - profile.scans_used)
    if (profile.plan === 'yearly') return 'Unlimited'
    return Math.max(0, 50 - profile.scans_used) // Free plan
  }

  const getAverageScore = () => {
    if (analyses.length === 0) return 0
    const total = analyses.reduce((sum, analysis) => sum + analysis.ai_score, 0)
    return Math.round(total / analyses.length)
  }

  const getHighRiskCount = () => {
    return analyses.filter(analysis => 
      analysis.health_risks?.some((risk: any) => risk.severity === 'high')
    ).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          <button 
            onClick={() => setLoading(false)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Skip Loading
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return <SimpleDashboard />
  }

  const scansRemaining = getScansRemaining()
  const averageScore = getAverageScore()
  const highRiskCount = getHighRiskCount()
  const totalIngredients = analyses.reduce((sum, analysis) => sum + analysis.ingredients.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header />
      
      {/* Progress Timeline */}
      <ProgressTimeline currentStep={currentStep} />
      
      <div className="container mx-auto px-6 py-12">
        {/* Modern Header */}
        <section className="bg-gradient-to-b from-emerald-50/60 to-white py-16">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm font-medium text-emerald-700 mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Your Health Intelligence Hub
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="text-emerald-600">{profile.name}</span> 👋
            </h1>
            <p className="text-gray-600">Track progress, analyze insights, and upgrade for unlimited scans.</p>
          </div>
        </section>

        {/* Upgrade Banner for Free Users */}
        {profile.plan === 'free' && profile.scans_used >= 45 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 You're almost at your limit!</h3>
                <p className="text-purple-100">
                  You've used {profile.scans_used} of 50 free scans. Unlock unlimited AI scans and personalized insights.
                </p>
              </div>
              <button
                onClick={() => handleUpgrade('pro')}
                disabled={upgradeLoading}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
              >
                {upgradeLoading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
            </div>
          </motion.div>
        )}

        {/* User Scans Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <UserScansDisplay />
        </motion.div>

        {/* Modern Dashboard Widgets */}
        <div className="mb-12">
          <ModernDashboard />
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          <StatCard 
            title="Free Scans" 
            value={scansRemaining === 'Unlimited' ? '∞' : scansRemaining.toString()} 
            subtitle={scansRemaining === 'Unlimited' ? 'Pro plan active' : 'No scans remaining'} 
            color="rose" 
            cta={scansRemaining !== 'Unlimited' ? "Upgrade to Pro" : undefined}
            onClick={scansRemaining !== 'Unlimited' ? () => handleUpgrade('pro') : undefined}
          />
          <StatCard 
            title="Health Score" 
            value={`${averageScore}/100`} 
            subtitle="Keep scanning to improve" 
            color="emerald" 
          />
          <StatCard 
            title="Total Scans" 
            value={analyses.length.toString()} 
            subtitle="Products analyzed" 
            color="cyan" 
          />
          <StatCard 
            title="Goal Progress" 
            value="0%" 
            subtitle="Towards your goal" 
            color="blue" 
          />
        </div>

        {/* Modern Dashboard Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ModernDashboardTable />
        </motion.div>

        {/* Connection Test - Temporary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <ConnectionTest />
        </motion.div>

        {/* Quick Scan Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to scan your next product?</h2>
              <p className="text-emerald-100">
                Get instant AI-powered health insights for any food product
              </p>
            </div>
            <button 
              onClick={() => navigate('/research')}
              className="group px-6 py-3 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold"
            >
              <Camera className="h-5 w-5" />
              Start Scanning
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Personalized Insights */}
        {healthProfile && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personalized Health Insights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Primary Goal:</span>
                  <span className="text-blue-700 capitalize">{healthProfile.primary_goal?.replace('_', ' ') || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Diet Type:</span>
                  <span className="text-green-700 capitalize">{healthProfile.diet_type || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Activity Level:</span>
                  <span className="text-purple-700 capitalize">{healthProfile.activity_level?.replace('_', ' ') || 'Not set'}</span>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Health Conditions</h3>
                <div className="space-y-1">
                  {['diabetes', 'blood_pressure', 'pcos_thyroid', 'heart_conditions', 'digestive_issues'].map((condition) => (
                    healthProfile[condition] && (
                      <div key={condition} className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-700 capitalize">{condition.replace('_', ' ')}</span>
                      </div>
                    )
                  ))}
                  {!['diabetes', 'blood_pressure', 'pcos_thyroid', 'heart_conditions', 'digestive_issues'].some(condition => healthProfile[condition]) && (
                    <span className="text-sm text-gray-500">No conditions reported</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-white/60 rounded-xl">
              <p className="text-gray-700">
                <strong>Personalized Recommendations:</strong> Based on your {healthProfile.primary_goal?.replace('_', ' ') || 'wellness'} goal and {healthProfile.diet_type || 'dietary'} preferences, 
                NutriSight will highlight foods that align with your health journey and warn you about ingredients that may impact your specific conditions.
              </p>
            </div>
          </motion.div>
        )}

        {/* AI Health Insights Section */}
        <section className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Sodium Trend", desc: "Your sodium intake increased by 8% this week", color: "amber", icon: "📈" },
            { title: "Heart Health", desc: "Great job avoiding trans fats!", color: "emerald", icon: "💚" },
            { title: "AI Insight", desc: "Consider more whole foods for better nutrition", color: "blue", icon: "🧠" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl p-6 bg-gradient-to-br from-${card.color}-50 to-white border border-${card.color}-200 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-1">{card.title}</h4>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/research')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg text-white rounded-2xl py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Camera className="h-5 w-5" />
              Scan New Product
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUpgrade('pro')}
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:shadow-lg text-white rounded-2xl py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Crown className="h-5 w-5" />
              Upgrade to Pro
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-gray-200 hover:shadow-md rounded-2xl py-4 font-semibold text-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              View History
            </motion.button>
          </div>
        </section>

        {/* Recent Scans */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Scans</h2>
              {analyses.length === 0 ? (
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No scans yet</h3>
                  <p className="text-gray-500 mb-4">Start your health journey by scanning your first product!</p>
                  <button 
                    onClick={() => navigate('/research')}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-colors"
                  >
                    Scan Your First Product
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.slice(0, 10).map((analysis, index) => (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          analysis.ai_score >= 80 ? 'bg-green-100' : 
                          analysis.ai_score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-lg font-bold ${
                            analysis.ai_score >= 80 ? 'text-green-600' : 
                            analysis.ai_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {analysis.ai_score}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {analysis.ingredients.slice(0, 3).join(', ')}
                            {analysis.ingredients.length > 3 && '...'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(analysis.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis.health_risks?.some((risk: any) => risk.severity === 'high') ? (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                            High Risk
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                            Safe
                          </span>
                        )}
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pro Banner */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center rounded-3xl bg-gradient-to-r from-violet-500/90 to-pink-500/90 p-8 text-white shadow-lg relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Ready to Go Pro? 🚀</h2>
                <p className="text-white/90 mb-6 text-sm">Unlock unlimited scans, AI trends, and family health sharing.</p>
                <button 
                  onClick={() => handleUpgrade('pro')}
                  disabled={upgradeLoading}
                  className="bg-white text-pink-600 font-semibold px-6 py-2 rounded-full hover:bg-pink-100 transition-all duration-200 text-sm"
                >
                  {upgradeLoading ? 'Loading...' : 'Upgrade Now'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Progress Timeline Component
const ProgressTimeline: React.FC<{ currentStep: 'upload' | 'analyzing' | 'results' }> = ({ currentStep }) => {
  const steps = [
    { id: 'upload', label: 'Upload', icon: Upload, description: 'Select your image' },
    { id: 'analyzing', label: 'Analyzing', icon: Brain, description: 'AI processing' },
    { id: 'results', label: 'Results', icon: CheckCircle2, description: 'View insights' }
  ]

  const getStepIndex = (step: string) => steps.findIndex(s => s.id === step)
  const currentIndex = getStepIndex(currentStep)

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 py-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: "0%" }}
              animate={{ 
                width: currentIndex === 0 ? "0%" : 
                       currentIndex === 1 ? "50%" : "100%" 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentIndex === index
            const isCompleted = currentIndex > index
            const isUpcoming = currentIndex < index

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center relative z-10"
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : isActive 
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-600' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.div
                  className="mt-3 text-center"
                  animate={isActive ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                >
                  <div className={`
                    text-sm font-semibold transition-colors duration-300
                    ${isCompleted || isActive ? 'text-emerald-600' : 'text-gray-400'}
                  `}>
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                </motion.div>

                {/* Active Step Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
