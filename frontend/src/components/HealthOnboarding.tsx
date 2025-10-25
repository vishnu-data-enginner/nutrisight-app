import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Heart, 
  Target, 
  Utensils, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Brain,
  Shield
} from 'lucide-react'
import { supabase } from '../utils/supabaseClient'

interface HealthOnboardingProps {
  userId: string
  onComplete: () => void
  onSkip: () => void
}

const HealthOnboarding: React.FC<HealthOnboardingProps> = ({ userId, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    gender: '',
    age_range: '',
    activity_level: '',
    primary_goal: '',
    diet_type: '',
    diabetes: false,
    blood_pressure: false,
    pcos_thyroid: false,
    heart_conditions: false,
    digestive_issues: false,
    allergies: [] as string[],
    secondary_goals: [] as string[],
    restrictions: [] as string[]
  })

  const steps = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-binary" },
            { value: "prefer-not-to-say", label: "Prefer not to say" }
          ]
        },
        {
          name: "age_range",
          label: "Age Range",
          type: "select",
          options: [
            { value: "18-25", label: "18-25" },
            { value: "26-35", label: "26-35" },
            { value: "36-45", label: "36-45" },
            { value: "46-55", label: "46-55" },
            { value: "56-65", label: "56-65" },
            { value: "65+", label: "65+" }
          ]
        }
      ]
    },
    {
      title: "Health Goals",
      icon: Target,
      fields: [
        {
          name: "primary_goal",
          label: "Primary Health Goal",
          type: "select",
          options: [
            { value: "weight_loss", label: "Weight Loss" },
            { value: "muscle_gain", label: "Muscle Gain" },
            { value: "clean_eating", label: "Clean Eating" },
            { value: "heart_health", label: "Heart Health" },
            { value: "sugar_management", label: "Sugar Management" },
            { value: "general_wellness", label: "General Wellness" }
          ]
        },
        {
          name: "secondary_goals",
          label: "Secondary Goals (Optional)",
          type: "multiselect",
          options: [
            { value: "energy_boost", label: "Energy Boost" },
            { value: "better_sleep", label: "Better Sleep" },
            { value: "immune_support", label: "Immune Support" },
            { value: "digestive_health", label: "Digestive Health" },
            { value: "mental_clarity", label: "Mental Clarity" }
          ]
        }
      ]
    },
    {
      title: "Lifestyle & Diet",
      icon: Utensils,
      fields: [
        {
          name: "activity_level",
          label: "Activity Level",
          type: "select",
          options: [
            { value: "sedentary", label: "Sedentary (Little to no exercise)" },
            { value: "light", label: "Lightly Active (Light exercise 1-3 days/week)" },
            { value: "moderate", label: "Moderately Active (Moderate exercise 3-5 days/week)" },
            { value: "active", label: "Very Active (Hard exercise 6-7 days/week)" },
            { value: "very_active", label: "Extremely Active (Physical job + exercise)" }
          ]
        },
        {
          name: "diet_type",
          label: "Diet Type",
          type: "select",
          options: [
            { value: "omnivore", label: "Omnivore" },
            { value: "vegetarian", label: "Vegetarian" },
            { value: "vegan", label: "Vegan" },
            { value: "pescatarian", label: "Pescatarian" },
            { value: "keto", label: "Keto" },
            { value: "paleo", label: "Paleo" },
            { value: "mediterranean", label: "Mediterranean" }
          ]
        }
      ]
    },
    {
      title: "Health Conditions",
      icon: Heart,
      fields: [
        {
          name: "diabetes",
          label: "Diabetes",
          type: "checkbox"
        },
        {
          name: "blood_pressure",
          label: "High Blood Pressure",
          type: "checkbox"
        },
        {
          name: "pcos_thyroid",
          label: "PCOS/Thyroid Issues",
          type: "checkbox"
        },
        {
          name: "heart_conditions",
          label: "Heart Conditions",
          type: "checkbox"
        },
        {
          name: "digestive_issues",
          label: "Digestive Issues",
          type: "checkbox"
        },
        {
          name: "allergies",
          label: "Food Allergies (Optional)",
          type: "multiselect",
          options: [
            { value: "nuts", label: "Nuts" },
            { value: "dairy", label: "Dairy" },
            { value: "gluten", label: "Gluten" },
            { value: "soy", label: "Soy" },
            { value: "eggs", label: "Eggs" },
            { value: "shellfish", label: "Shellfish" }
          ]
        }
      ]
    }
  ]

  const handleChange = (name: string, value: any) => {
    console.log('🔄 Form field changed:', { name, value })
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      }
      console.log('📊 Updated form data:', newData)
      return newData
    })
  }

  const handleMultiSelect = (name: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
    }))
  }

  const nextStep = () => {
    console.log('🔄 Moving to next step. Current step:', currentStep)
    console.log('📊 Current form data:', formData)
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      console.log('✅ Moved to step:', currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      console.log('🚀 Submitting health profile...')
      console.log('📊 Final form data:', formData)
      
      // Prepare health profile data
      const healthProfile = {
        user_id: userId,
        gender: formData.gender,
        age_range: formData.age_range,
        activity_level: formData.activity_level,
        primary_goal: formData.primary_goal,
        diet_type: formData.diet_type,
        diabetes: formData.diabetes,
        blood_pressure: formData.blood_pressure,
        pcos_thyroid: formData.pcos_thyroid,
        heart_conditions: formData.heart_conditions,
        digestive_issues: formData.digestive_issues,
        allergies: formData.allergies,
        secondary_goals: formData.secondary_goals,
        restrictions: formData.restrictions
      }

      console.log('💾 Saving health profile:', healthProfile)

      const { data, error } = await supabase
        .from('health_profiles')
        .insert(healthProfile)
        .select()
        .single()

      if (error) {
        console.error('❌ Error saving health profile:', error)
        throw error
      }

      console.log('✅ Health profile saved:', data)
      setShowSuccess(true)
      
      setTimeout(() => {
        onComplete()
      }, 2000)

    } catch (error) {
      console.error('💥 Error in health onboarding:', error)
      alert('Failed to save health profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Let's Personalize Your Experience! 🎯
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Help us understand your health goals for better AI recommendations
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={`step-${currentStep}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
        >
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center">
              <currentStepData.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentStepData.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Step {currentStep + 1} of {steps.length} • {currentStepData.fields.length} question{currentStepData.fields.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Debug Panel - Remove in production */}
          <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Debug Info:</h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div>Current Step: {currentStep + 1} / {steps.length}</div>
              <div>Form Data: {JSON.stringify(formData, null, 2)}</div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {currentStepData.fields.map((field, index) => (
              <div key={index}>
                <label className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {field.label}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData[field.name as keyof typeof formData] as boolean}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600 mr-3"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{field.label}</span>
                  </label>
                ) : field.type === 'multiselect' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {field.options?.map((option) => (
                      <label key={option.value} className="flex items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={(formData[field.name as keyof typeof formData] as string[]).includes(option.value)}
                          onChange={(e) => handleMultiSelect(field.name, option.value, e.target.checked)}
                          className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600 mr-3"
                        />
                        <span className="text-slate-700 dark:text-slate-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div>
              {!isFirstStep && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </motion.button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSkip}
                className="px-6 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                Skip for now
              </motion.button>

              {!isLastStep ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/40 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {loading ? 'Saving...' : 'Complete Setup'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center max-w-md mx-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Profile Complete! 🎉
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Your health profile has been saved. Redirecting to dashboard...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HealthOnboarding
