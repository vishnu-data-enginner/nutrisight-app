import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, Leaf, AlertTriangle, CheckCircle } from 'lucide-react'

interface PersonalizedInsightProps {
  healthProfile?: {
    primary_goal?: string
    diet_type?: string
    conditions?: string[]
  }
  personalizedInsight?: string
  healthScore?: number
}

const PersonalizedInsight: React.FC<PersonalizedInsightProps> = ({
  healthProfile,
  personalizedInsight,
  healthScore
}) => {
  if (!healthProfile && !personalizedInsight) {
    return null
  }

  const getGoalIcon = (goal?: string) => {
    switch (goal) {
      case 'weight_loss': return <Target className="h-4 w-4 text-blue-600" />
      case 'heart_health': return <Heart className="h-4 w-4 text-red-600" />
      case 'muscle_gain': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'clean_eating': return <Leaf className="h-4 w-4 text-emerald-600" />
      default: return <Heart className="h-4 w-4 text-gray-600" />
    }
  }

  const getGoalLabel = (goal?: string) => {
    switch (goal) {
      case 'weight_loss': return 'Weight Loss'
      case 'heart_health': return 'Heart Health'
      case 'muscle_gain': return 'Muscle Gain'
      case 'clean_eating': return 'Clean Eating'
      case 'wellness': return 'General Wellness'
      default: return 'Health Goals'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <Heart className="h-4 w-4 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Personalized for You</h3>
      </div>

      {healthProfile && (
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {healthProfile.primary_goal && (
            <div className="flex items-center gap-2 bg-white/60 rounded-lg p-3">
              {getGoalIcon(healthProfile.primary_goal)}
              <div>
                <p className="text-sm font-medium text-gray-900">{getGoalLabel(healthProfile.primary_goal)}</p>
                <p className="text-xs text-gray-600">Primary Goal</p>
              </div>
            </div>
          )}

          {healthProfile.diet_type && (
            <div className="flex items-center gap-2 bg-white/60 rounded-lg p-3">
              <Leaf className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {healthProfile.diet_type.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-600">Diet Type</p>
              </div>
            </div>
          )}

          {healthProfile.conditions && healthProfile.conditions.length > 0 && (
            <div className="flex items-center gap-2 bg-white/60 rounded-lg p-3">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {healthProfile.conditions.length} Condition{healthProfile.conditions.length > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-600">Health Considerations</p>
              </div>
            </div>
          )}
        </div>
      )}

      {personalizedInsight && (
        <div className="bg-white/80 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="h-3 w-3 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">AI Recommendation</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{personalizedInsight}</p>
            </div>
          </div>
        </div>
      )}

      {healthScore && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">Personalized Health Score</span>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              healthScore >= 80 ? 'bg-green-500' :
              healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="font-semibold text-gray-900">{healthScore}/100</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default PersonalizedInsight


