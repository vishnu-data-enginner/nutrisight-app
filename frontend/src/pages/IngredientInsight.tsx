import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Brain, 
  Activity, 
  FlaskConical, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  RotateCcw
} from 'lucide-react'

type AnalysisState = 'analyzing' | 'results' | 'complete'
type IngredientStatus = 'safe' | 'caution' | 'risk'

interface Ingredient {
  name: string
  status: IngredientStatus
  description: string
  impact: string
}

interface AnalysisResult {
  healthScore: number
  healthLabel: string
  healthDescription: string
  ingredients: Ingredient[]
  processingLevel: number
  sustainability: number
  value: number
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ from: number; to: number; duration: number; delay?: number }> = ({ 
  from, 
  to, 
  duration, 
  delay = 0 
}) => {
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, { 
    stiffness: 100, 
    damping: 30 
  })
  const display = useTransform(springValue, (current) => Math.round(current))

  useEffect(() => {
    const timer = setTimeout(() => {
      motionValue.set(to)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [motionValue, to, delay])

  return <motion.span>{display}</motion.span>
}

const IngredientInsight: React.FC = () => {
  const { user } = useAuth()
  const [currentState, setCurrentState] = useState<AnalysisState>('analyzing')
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [analyzingPhrases] = useState([
    "Analyzing ingredient composition...",
    "Cross-referencing with 10,000+ studies...",
    "Calculating health risk factors...",
    "Generating personalized insights...",
    "Finalizing medical-grade assessment..."
  ])
  const [currentPhrase, setCurrentPhrase] = useState(0)

  // Mock analysis result
  const mockResult: AnalysisResult = {
    healthScore: 50,
    healthLabel: "Fair Health Profile",
    healthDescription: "This product has significant health concerns that should be considered",
    ingredients: [
      { name: "Sugar", status: "risk", description: "High sugar content", impact: "May cause blood sugar spikes and contribute to weight gain" },
      { name: "Sodium", status: "risk", description: "Elevated sodium levels", impact: "Can increase blood pressure and cardiovascular risk" },
      { name: "Caffeine", status: "caution", description: "Moderate caffeine content", impact: "May cause jitteriness in sensitive individuals" },
      { name: "Protein", status: "safe", description: "Good protein source", impact: "Supports muscle health and satiety" },
      { name: "Trans Fat", status: "risk", description: "Contains trans fats", impact: "Increases bad cholesterol and heart disease risk" },
      { name: "Vitamin C", status: "safe", description: "Natural vitamin C", impact: "Supports immune system and antioxidant function" }
    ],
    processingLevel: 2,
    sustainability: 3,
    value: 4
  }

  useEffect(() => {
    if (currentState === 'analyzing') {
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            setCurrentState('results')
            setAnalysisResult(mockResult)
            return 100
          }
          return prev + 2
        })
      }, 100)

      const phraseInterval = setInterval(() => {
        setCurrentPhrase(prev => (prev + 1) % analyzingPhrases.length)
      }, 2000)

      return () => {
        clearInterval(progressInterval)
        clearInterval(phraseInterval)
      }
    }
  }, [currentState, analyzingPhrases.length])

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-50 border-emerald-200'
    if (score >= 50) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getIngredientStatusConfig = (status: IngredientStatus) => {
    switch (status) {
      case 'safe':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          icon: CheckCircle,
          iconColor: 'text-emerald-600'
        }
      case 'caution':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          icon: AlertTriangle,
          iconColor: 'text-amber-600'
        }
      case 'risk':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: XCircle,
          iconColor: 'text-red-600'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 text-gray-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-white/70 backdrop-blur-lg border-b border-emerald-100 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-emerald-700">NutriSight</span>
          </div>
          <nav className="space-x-6 text-sm font-medium">
            <a className="text-emerald-700">Scan</a>
            <a className="text-gray-500 hover:text-emerald-600">Database</a>
            <a className="text-gray-500 hover:text-emerald-600">Pricing</a>
          </nav>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">{user?.email?.split('@')[0] || 'User'}</span>
            <button className="rounded-full bg-emerald-100 px-3 py-1 text-sm hover:bg-emerald-200 transition-colors">Logout</button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/60 backdrop-blur-sm rounded-full text-emerald-700 text-sm mb-6 shadow-lg border border-emerald-200"
        >
          <Activity size={16} />
          AI-Powered Health Intelligence
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Intelligent Ingredient{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Insight
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          AI-powered analysis backed by scientific research. Understand what you're consuming and its effect on your health.
        </p>
      </motion.section>

      {/* How It Works Cards */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 px-6">
        {[
          {
            title: "AI Research Analysis",
            desc: "Real-time review of scientific papers & studies.",
            link: "10,000+ studies analyzed",
            icon: Brain,
            gradient: "from-indigo-400 to-purple-500",
          },
          {
            title: "Instant Results",
            desc: "Comprehensive health insights in seconds.",
            link: "Results in 3 seconds",
            icon: Zap,
            gradient: "from-emerald-400 to-teal-500",
          },
          {
            title: "Medical-Grade Analysis",
            desc: "Professional health risk assessments & recommendations.",
            link: "Clinical-level precision",
            icon: FlaskConical,
            gradient: "from-pink-400 to-fuchsia-500",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-start hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-4 shadow-lg`}
            >
              <card.icon className="w-6 h-6" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{card.desc}</p>
            <span className="text-emerald-600 text-sm font-medium">{card.link}</span>
          </motion.div>
        ))}
      </section>

      {/* Analysis State */}
      <AnimatePresence mode="wait">
        {currentState === 'analyzing' && (
          <motion.section
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24"
          >
            <div className="relative">
              {/* Progress Ring */}
              <motion.div
                className="w-24 h-24 mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-emerald-500"
                    style={{
                      strokeDasharray: 251.2,
                      strokeDashoffset: 251.2 - (251.2 * analysisProgress) / 100
                    }}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * analysisProgress) / 100 }}
                    transition={{ duration: 0.1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-lg font-bold text-emerald-600"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {analysisProgress}%
                  </motion.span>
                </div>
              </motion.div>

              <motion.h2
                key={currentPhrase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-semibold mb-4 text-gray-900"
              >
                {analyzingPhrases[currentPhrase]}
              </motion.h2>
              
              <p className="text-gray-500 mb-8">Our AI is processing your image and searching research databases</p>
              
              {/* Loading Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-emerald-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {currentState === 'results' && analysisResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Health Score */}
            <motion.section
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-20 px-6 text-center"
            >
              <motion.div 
                className={`p-10 border-2 rounded-3xl shadow-xl ${getScoreBgColor(analysisResult.healthScore)} relative overflow-hidden`}
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(239, 68, 68, 0)",
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 0px rgba(239, 68, 68, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Animated Counter */}
                <motion.h2
                  className={`text-7xl font-bold ${getScoreColor(analysisResult.healthScore)} mb-4`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <AnimatedCounter 
                    from={0} 
                    to={analysisResult.healthScore} 
                    duration={1.5}
                    delay={0.6}
                  />
                  /100
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`${getScoreColor(analysisResult.healthScore)} font-semibold text-xl mb-2`}
                >
                  {analysisResult.healthLabel}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-600 text-lg"
                >
                  {analysisResult.healthDescription}
                </motion.p>
              </motion.div>
            </motion.section>

            {/* Ingredient Cards */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-20"
            >
              {analysisResult.ingredients.map((ingredient, i) => {
                const config = getIngredientStatusConfig(ingredient.status)
                const IconComponent = config.icon
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + i * 0.15,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className={`rounded-2xl p-6 border-2 ${config.bg} ${config.border} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Hover Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${config.bg} opacity-0`}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10 flex items-start gap-3">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 1 + i * 0.15,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <IconComponent className={`w-6 h-6 ${config.iconColor} mt-1 flex-shrink-0`} />
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 + i * 0.15 }}
                          className={`font-semibold text-lg mb-2 ${config.text}`}
                        >
                          {ingredient.name}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.15 }}
                          className={`text-sm mb-2 ${config.text} opacity-80`}
                        >
                          {ingredient.description}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.3 + i * 0.15 }}
                          className="text-xs text-gray-600 leading-relaxed"
                        >
                          {ingredient.impact}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.section>

            {/* Meta Scores */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-6 mb-16"
            >
              {[
                { 
                  title: "Processing Level", 
                  score: analysisResult.processingLevel, 
                  label: "Ultra-Processed", 
                  color: "blue",
                  description: "Highly processed with artificial additives"
                },
                { 
                  title: "Sustainability", 
                  score: analysisResult.sustainability, 
                  label: "Poor", 
                  color: "emerald",
                  description: "High environmental impact"
                },
                { 
                  title: "Value", 
                  score: analysisResult.value, 
                  label: "Below Average", 
                  color: "purple",
                  description: "Limited nutritional value for price"
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.5 + i * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="rounded-2xl p-6 bg-white border border-gray-200 shadow-lg hover:shadow-xl text-center transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r from-${card.color}-50 to-transparent opacity-0`}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 + i * 0.2 }}
                      className="text-gray-600 text-sm font-medium mb-2"
                    >
                      {card.title}
                    </motion.h4>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 1.8 + i * 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className={`text-${card.color}-600 text-4xl font-bold mb-2`}
                    >
                      <AnimatedCounter 
                        from={0} 
                        to={card.score} 
                        duration={1}
                        delay={1.8 + i * 0.2}
                      />
                      /10
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 + i * 0.2 }}
                      className="text-gray-500 text-sm font-medium mb-1"
                    >
                      {card.label}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.1 + i * 0.2 }}
                      className="text-xs text-gray-400"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center pb-20"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/research'}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <Camera className="w-5 h-5" />
            Scan Another Product
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/dashboard'}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <Shield className="w-5 h-5" />
            View Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default IngredientInsight
