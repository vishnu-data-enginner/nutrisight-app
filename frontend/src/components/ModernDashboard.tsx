import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  Brain, 
  Zap, 
  Shield, 
  Target,
  ArrowUp,
  ArrowDown,
  Activity,
  Clock,
  Star
} from 'lucide-react'

interface Metric {
  id: string
  title: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: React.ComponentType<any>
  color: string
  description: string
}

const ModernDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: '1',
      title: 'Health Score',
      value: 85,
      change: 12,
      trend: 'up',
      icon: Heart,
      color: 'emerald',
      description: 'Your overall health rating'
    },
    {
      id: '2',
      title: 'AI Insights',
      value: 23,
      change: -3,
      trend: 'down',
      icon: Brain,
      color: 'blue',
      description: 'Personalized recommendations'
    },
    {
      id: '3',
      title: 'Risk Factors',
      value: 7,
      change: -2,
      trend: 'up',
      icon: Shield,
      color: 'red',
      description: 'Ingredients to avoid'
    },
    {
      id: '4',
      title: 'Goal Progress',
      value: 68,
      change: 8,
      trend: 'up',
      icon: Target,
      color: 'purple',
      description: 'Towards your health goals'
    }
  ])

  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Animate values on mount
    metrics.forEach(metric => {
      let current = 0
      const increment = metric.value / 30
      const timer = setInterval(() => {
        current += increment
        if (current >= metric.value) {
          current = metric.value
          clearInterval(timer)
        }
        setAnimatedValues(prev => ({ ...prev, [metric.id]: Math.floor(current) }))
      }, 50)
    })
  }, [])

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-teal-500',
      blue: 'from-blue-500 to-cyan-500',
      red: 'from-red-500 to-pink-500',
      purple: 'from-purple-500 to-violet-500'
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-emerald-500" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const animatedValue = animatedValues[metric.id] || 0
        
        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(metric.color)} rounded-2xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-emerald-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <motion.div
                className="text-3xl font-bold text-gray-900"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {animatedValue}
                {metric.id === '1' || metric.id === '4' ? '/100' : ''}
              </motion.div>
              <p className="text-sm text-gray-600">{metric.title}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 bg-gradient-to-r ${getColorClasses(metric.color)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500">{metric.description}</p>

            {/* Animated Elements */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className={`w-2 h-2 bg-gradient-to-r ${getColorClasses(metric.color)} rounded-full opacity-30`} />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ModernDashboard
