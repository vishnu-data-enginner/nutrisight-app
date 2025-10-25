import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Target, 
  Leaf, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  User,
  Activity,
  Utensils
} from 'lucide-react'

interface HealthProfile {
  gender: string
  age_range: string
  diabetes: boolean
  blood_pressure: boolean
  pcos_thyroid: boolean
  heart_conditions: boolean
  digestive_issues: boolean
  allergies: string[]
  primary_goal: string
  secondary_goals: string[]
  diet_type: string
  restrictions: string[]
  activity_level: string
}

const OnboardingWizard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<HealthProfile>({
    gender: '',
    age_range: '',
    diabetes: false,
    blood_pressure: false,
    pcos_thyroid: false,
    heart_conditions: false,
    digestive_issues: false,
    allergies: [],
    primary_goal: '',
    secondary_goals: [],
    diet_type: '',
    restrictions: [],
    activity_level: ''
  })

  const totalSteps = 5

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateProfile = (field: keyof HealthProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: keyof HealthProfile, value: string) => {
    const currentArray = profile[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateProfile(field, newArray)
  }

  const handleSave = async () => {
    if (!user) {
      console.error('No user found')
      alert('Please sign in first')
      return
    }
    
    setLoading(true)
    try {
      console.log('Saving profile for user:', user.id)
      console.log('Profile data:', profile)
      
      // Ensure we have the current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
      if (userError || !currentUser) {
        throw new Error('User not authenticated')
      }
      
      // Prepare the payload with proper field mapping
      const payload = {
        user_id: currentUser.id,
        gender: profile.gender || null,
        age_range: profile.age_range || null,
        activity_level: profile.activity_level || null,
        primary_goal: profile.primary_goal || null,
        diet_type: profile.diet_type || null,
        diabetes: profile.diabetes || false,
        blood_pressure: profile.blood_pressure || false,
        pcos_thyroid: profile.pcos_thyroid || false,
        heart_conditions: profile.heart_conditions || false,
        digestive_issues: profile.digestive_issues || false,
        allergies: profile.allergies || [],
        restrictions: profile.restrictions || [],
        updated_at: new Date().toISOString()
      }
      
      console.log('Payload to save:', payload)
      
      // First try to update existing profile, then insert if not found
      const { data: existingProfile, error: selectError } = await supabase
        .from('health_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single()

      let savedProfile
      if (existingProfile && !selectError) {
        // Update existing profile
        const { data, error: updateError } = await supabase
          .from('health_profiles')
          .update(payload)
          .eq('user_id', currentUser.id)
          .select()
          .single()
        
        if (updateError) {
          throw new Error(`Failed to update profile: ${updateError.message}`)
        }
        savedProfile = data
      } else {
        // Insert new profile
        const { data, error: insertError } = await supabase
          .from('health_profiles')
          .insert(payload)
          .select()
          .single()
        
        if (insertError) {
          throw new Error(`Failed to insert profile: ${insertError.message}`)
        }
        savedProfile = data
      }
      
      console.log('Profile saved successfully:', savedProfile)

      // Mark onboarding as completed
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', currentUser.id)
      
      if (updateError) {
        console.error('Update error:', updateError)
        // Don't throw here, profile was saved successfully
        console.warn('Could not update onboarding status, but profile was saved')
      } else {
        console.log('Onboarding marked as completed')
      }

      // Navigate immediately without delay
      console.log('Navigating to dashboard...')
      navigate('/dashboard')
      
    } catch (error) {
      console.error('Error saving health profile:', error)
      alert(`Failed to save your profile: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const stepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  }

  const progressPercentage = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-3xl shadow-xl p-8"
      >
        {/* Header with Progress */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm font-medium text-emerald-700 mb-4">
            <Sparkles className="h-4 w-4" />
            Personalize Your Health Journey
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Step {step} of {totalSteps}
          </h1>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">This helps us personalize your health insights</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => updateProfile('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                  <select
                    value={profile.age_range}
                    onChange={(e) => updateProfile('age_range', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select age range</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-50">36-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                    { value: 'light', label: 'Light', desc: 'Light exercise 1-3 days/week' },
                    { value: 'moderate', label: 'Moderate', desc: 'Moderate exercise 3-5 days/week' },
                    { value: 'active', label: 'Active', desc: 'Heavy exercise 6-7 days/week' },
                    { value: 'very_active', label: 'Very Active', desc: 'Very heavy exercise, physical job' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateProfile('activity_level', option.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        profile.activity_level === option.value
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Health Conditions */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Conditions</h2>
                <p className="text-gray-600">Help us understand your health profile</p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'diabetes', label: 'Diabetes', icon: '🩸' },
                  { key: 'blood_pressure', label: 'High Blood Pressure', icon: '💓' },
                  { key: 'pcos_thyroid', label: 'PCOS/Thyroid Issues', icon: '🦋' },
                  { key: 'heart_conditions', label: 'Heart Conditions', icon: '❤️' },
                  { key: 'digestive_issues', label: 'Digestive Issues', icon: '🫄' }
                ].map((condition) => (
                  <label key={condition.key} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile[condition.key as keyof HealthProfile] as boolean}
                      onChange={(e) => updateProfile(condition.key as keyof HealthProfile, e.target.checked)}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="ml-3 text-2xl">{condition.icon}</span>
                    <span className="ml-3 text-lg font-medium text-gray-900">{condition.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies (select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Soy', 'Eggs'].map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleArrayValue('allergies', allergy.toLowerCase())}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        profile.allergies.includes(allergy.toLowerCase())
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Health Goals */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Goals</h2>
                <p className="text-gray-600">What do you want to achieve?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'sugar_management', label: 'Sugar Management', icon: '🍯' },
                    { value: 'weight_loss', label: 'Weight Loss', icon: '⚖️' },
                    { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
                    { value: 'heart_health', label: 'Heart Health', icon: '❤️' },
                    { value: 'clean_eating', label: 'Clean Eating', icon: '🥗' },
                    { value: 'wellness', label: 'General Wellness', icon: '🌟' }
                  ].map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => updateProfile('primary_goal', goal.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        profile.primary_goal === goal.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{goal.icon}</div>
                      <div className="font-medium">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Dietary Preferences */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dietary Preferences</h2>
                <p className="text-gray-600">Help us recommend the right foods for you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'omnivore', label: 'Omnivore', icon: '🍖' },
                    { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
                    { value: 'vegan', label: 'Vegan', icon: '🌱' },
                    { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' }
                  ].map((diet) => (
                    <button
                      key={diet.value}
                      onClick={() => updateProfile('diet_type', diet.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        profile.diet_type === diet.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{diet.icon}</div>
                      <div className="font-medium">{diet.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Gluten Free', 'Dairy Free', 'Low Sodium', 'Low Sugar', 'Keto', 'Paleo'].map((restriction) => (
                    <button
                      key={restriction}
                      onClick={() => toggleArrayValue('restrictions', restriction.toLowerCase())}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        profile.restrictions.includes(restriction.toLowerCase())
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {restriction}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <motion.div
              key="step5"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Profile</h2>
                <p className="text-gray-600">Everything looks good? Let's get started!</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Basic Info</h3>
                    <p className="text-sm text-gray-600">Gender: {profile.gender || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">Age: {profile.age_range || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">Activity: {profile.activity_level || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Health</h3>
                    <p className="text-sm text-gray-600">Primary Goal: {profile.primary_goal || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">Diet: {profile.diet_type || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">Conditions: {Object.entries(profile).filter(([key, value]) => 
                      ['diabetes', 'blood_pressure', 'pcos_thyroid', 'heart_conditions', 'digestive_issues'].includes(key) && value
                    ).length} selected</p>
                  </div>
                </div>
              </div>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto mb-4"></div>
                  <p className="text-emerald-600 font-medium">Setting up your personalized health profile...</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {step < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Complete Setup'}
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default OnboardingWizard
