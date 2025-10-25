import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Brain, Zap, FileBarChart, AlertTriangle, Shield, Camera, Sparkles, Loader2, CheckCircle, Info, Upload, CheckCircle2, TrendingUp } from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import MedicalGradeAnalysis from "../components/MedicalGradeAnalysis";
import PersonalizedInsight from "../components/PersonalizedInsight";
import AIChat from "../components/AIChat";
import VoiceInput from "../components/VoiceInput";
import { analyzeImage, premiumAnalyze } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { saveAnalysis, incrementScansUsed, getHealthProfile } from "../lib/supabase";

const Research = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [rawApiResponse, setRawApiResponse] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload')

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to access the research page.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleImageUpload = async (file: File, usePremium: boolean = false) => {
    setIsAnalyzing(true)
    setError(null)
    setResults(null)
    setCurrentStep('analyzing')

    let safeResults: any = null

    try {
      // Fetch user's health profile for personalized analysis
      let healthProfile = null
      if (user) {
        try {
          const { data: profile, error } = await getHealthProfile(user.id)
          if (profile && !error) {
            healthProfile = profile
            console.log("Health profile loaded for personalized analysis:", profile)
          }
        } catch (profileError) {
          console.warn("Could not load health profile:", profileError)
        }
      }
      
      const analysisResults = usePremium ? await premiumAnalyze(file, healthProfile) : await analyzeImage(file, healthProfile)
      console.log("API Response:", analysisResults)
      setRawApiResponse(analysisResults)
      
      // Handle premium analysis results
      if (usePremium && analysisResults.comprehensive_analysis) {
        const comp = analysisResults.comprehensive_analysis
        safeResults = {
          health_score: comp.score || 0,
          summary: comp.summary || "Premium analysis completed",
          health_risks: comp.health_risks || [],
          recommendations: comp.recommendations || [],
          extracted_ingredients: analysisResults.ingredients_analyzed || [],
          risk_ingredients: comp.risk_ingredients || [],
          tags: comp.tags || [],
          // Premium features
          allergen_warnings: comp.allergen_warnings || [],
          target_demographics: comp.target_demographics || [],
          alternative_suggestions: comp.alternative_suggestions || [],
          sustainability_score: comp.sustainability_score || 0,
          cost_effectiveness: comp.cost_effectiveness || 0,
          processing_level: comp.processing_level || 0,
          nutritional_insights: comp.nutritional_insights || {},
          analysis_type: "premium",
          personalized_insight: comp.personalized_insight || null,
          health_profile_used: healthProfile ? {
            primary_goal: healthProfile.primary_goal,
            diet_type: healthProfile.diet_type,
            conditions: Object.keys(healthProfile).filter(key => 
              ['diabetes', 'blood_pressure', 'heart_conditions', 'digestive_issues'].includes(key) && healthProfile[key]
            )
          } : null
        }
        setResults(safeResults)
      } else {
        // Standard analysis results
        safeResults = {
          health_score: analysisResults.score || analysisResults.health_score || 0,
          summary: analysisResults.summary || "Analysis completed",
          health_risks: analysisResults.health_risks || [],
          recommendations: analysisResults.recommendation ? [analysisResults.recommendation] : (analysisResults.recommendations || []),
          extracted_ingredients: analysisResults.extracted_ingredients || [],
          risk_ingredients: analysisResults.risk_ingredients || [],
          tags: analysisResults.tags || [],
          analysis_type: "standard",
          personalized_insight: analysisResults.personalized_insight || null,
          health_profile_used: healthProfile ? {
            primary_goal: healthProfile.primary_goal,
            diet_type: healthProfile.diet_type,
            conditions: Object.keys(healthProfile).filter(key => 
              ['diabetes', 'blood_pressure', 'heart_conditions', 'digestive_issues'].includes(key) && healthProfile[key]
            )
          } : null
        }
        setResults(safeResults)
        setCurrentStep('results')
      }
      
      // Save analysis to Supabase and increment scan counter if user is logged in
      if (user && safeResults) {
        try {
          // Save the analysis to the database
          await saveAnalysis(safeResults, user.id, '')
          
          // Increment the user's scan counter
          await incrementScansUsed(user.id)
          
          console.log("Analysis saved to database and scan counter updated!")
        } catch (dbError) {
          console.error("Error saving analysis to database:", dbError)
          // Don't fail the analysis if database save fails
        }
      }
      
      console.log("Analysis Complete: Your ingredient analysis is ready!")
    } catch (err: any) {
      console.error("Analysis Failed - Full Error:", err)
      setError(err.message || 'Failed to analyze image')
      setCurrentStep('upload')
      console.error("Analysis Failed:", err.message || 'Failed to analyze image')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setResults(null)
    setError(null)
    setCurrentStep('upload')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header />
      
      {/* Progress Timeline */}
      <ProgressTimeline currentStep={currentStep} />
      
      <main className="container mx-auto px-6 py-12">
        {/* Unified Hero + Upload Section */}
        <section className="bg-gradient-to-b from-white via-emerald-50/60 to-white py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              AI-Powered Health Intelligence
            </div>
            <h1 className="text-5xl font-extrabold mb-3">
              Intelligent Ingredient <span className="text-emerald-600">Insight</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Upload or capture any food label. NutriSight's AI analyzes it against 10,000+ nutrition studies
              and gives you medical-grade recommendations.
            </p>

            {/* Upload + Camera unified cards */}
            <div className="max-w-3xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Upload className="mx-auto mb-3 w-10 h-10 text-emerald-500" />
                <h3 className="font-semibold text-gray-800 mb-1">Upload Image</h3>
                <p className="text-gray-500 text-sm mb-4">Drag and drop or click to select</p>
                <button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
                >
                  Choose File
                </button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 bg-gradient-to-b from-emerald-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Camera className="mx-auto mb-3 w-10 h-10 text-emerald-600" />
                <h3 className="font-semibold text-gray-800 mb-1">Take Photo</h3>
                <p className="text-gray-500 text-sm mb-4">Use your camera to capture ingredients</p>
                <button 
                  onClick={() => document.getElementById('camera-capture')?.click()}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
                >
                  Open Camera
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-16"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-emerald-600" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span>Research-Backed</span>
          </div>
        </motion.div>

        {/* Hidden ImageUpload component for file handling */}
        {!results && !isAnalyzing && (
          <div className="hidden">
            <ImageUpload onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="mb-12 bg-white/80 backdrop-blur-sm border border-emerald-100 p-12 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-pulse" />
                  </div>
                </div>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900">Analyzing Ingredients...</h3>
              <p className="mb-6 text-xl text-gray-600">
                Our AI is processing your image and searching scientific databases
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="ml-2">Searching research papers...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-12 border-2 border-red-200 bg-red-50/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="mb-2 text-xl font-bold text-red-600">Analysis Failed</h3>
                <p className="mb-4 text-red-700">{error}</p>
                <button onClick={resetAnalysis} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors">
                  <Camera className="h-4 w-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mb-12">
            {/* Personalized Insight */}
            {results.health_profile_used && (
              <PersonalizedInsight 
                healthProfile={results.health_profile_used}
                personalizedInsight={results.personalized_insight}
                healthScore={results.health_score}
              />
            )}
            
            <MedicalGradeAnalysis analysis={results} />
            
            <div className="text-center mt-8">
              <button onClick={resetAnalysis} className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                <Camera className="h-6 w-6" />
                Scan Another Product
              </button>
            </div>
          </div>
        )}

        {/* AI Assistant Section */}
        {!results && !isAnalyzing && (
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <AIChat />
            <VoiceInput 
              onTranscript={(text) => console.log('Voice transcript:', text)}
              onStart={() => console.log('Voice recording started')}
              onStop={() => console.log('Voice recording stopped')}
            />
          </div>
        )}

      </main>
    </div>
  );
};

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

export default Research;