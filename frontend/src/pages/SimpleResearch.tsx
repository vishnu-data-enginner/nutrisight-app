import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Camera, Upload, Loader2, AlertTriangle, CheckCircle, Shield, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { analyzeImage } from "../lib/api";
import { saveAnalysis, saveScan, incrementScansUsed, getHealthProfile } from "../lib/supabase";
import { supabase } from "../utils/supabaseClient";

const SimpleResearch = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload')

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center">
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

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true)
    setError(null)
    setResults(null)
    setCurrentStep('analyzing')

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
      
      const analysisResults = await analyzeImage(file, healthProfile)
      console.log("API Response:", analysisResults)
      
      const safeResults = {
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
      
      // Save analysis to Supabase and update user metrics
      if (user && safeResults) {
        try {
          console.log('💾 Saving scan to Supabase...', { userId: user.id, healthScore: safeResults.health_score })
          
          // Save analysis to analyses table (your main table for scan results)
          const { data: analysisData, error: analysisError } = await supabase
            .from('analyses')
            .insert({
              user_id: user.id,
              image_url: '', // No image URL for now
              ai_score: safeResults.health_score,
              ingredients: safeResults.extracted_ingredients,
              health_risks: safeResults.health_risks,
              nutritional_insights: {
                summary: safeResults.summary,
                recommendations: safeResults.recommendations,
                tags: safeResults.tags,
                risk_ingredients: safeResults.risk_ingredients,
                personalized_insight: safeResults.personalized_insight,
                health_profile_used: safeResults.health_profile_used
              }
            })
            .select()
            .single()

          console.log('📊 Analysis save response:', { analysisData, analysisError })

          if (analysisError) {
            console.error('❌ Error saving analysis:', analysisError)
            throw analysisError
          }

          console.log('✅ Analysis saved successfully!')

          // Update scans_used in profiles table
          console.log('🔄 Updating scans_used in profiles table...')
          
          // First, get the current scans_used value
          const { data: currentProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('scans_used')
            .eq('id', user.id)
            .single()
          
          if (fetchError) {
            console.error('❌ Error fetching current scans_used:', fetchError)
            throw fetchError
          }
          
          // Increment the scans_used value
          const newScansUsed = (currentProfile?.scans_used || 0) + 1
          
          const { data: updateData, error: updateError } = await supabase
            .from('profiles')
            .update({ 
              scans_used: newScansUsed
            })
            .eq('id', user.id)
            .select()

          console.log('📈 Profiles update response:', { updateData, updateError })

          if (updateError) {
            console.error('❌ Error updating scans_used:', updateError)
            throw updateError
          }

          console.log("✅ Analysis saved and scans_used incremented!")
          
          // Show success toast
          setResults(prev => ({
            ...prev,
            showSuccessToast: true
          }))

        } catch (dbError) {
          console.error("💥 Error saving analysis to database:", dbError)
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
    
    // Reset file inputs to allow selecting the same file again
    const fileUpload = document.getElementById('file-upload') as HTMLInputElement
    const cameraCapture = document.getElementById('camera-capture') as HTMLInputElement
    
    if (fileUpload) fileUpload.value = ''
    if (cameraCapture) cameraCapture.value = ''
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">NutriSight</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Welcome, {user?.email?.split('@')[0] || 'User'}</span>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>
      
      {/* Progress Timeline */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 py-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: "0%" }}
                animate={{ 
                  width: currentStep === 'upload' ? "0%" : 
                         currentStep === 'analyzing' ? "50%" : "100%" 
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            {[
              { id: 'upload', label: 'Upload', icon: Upload, description: 'Select your image' },
              { id: 'analyzing', label: 'Analyzing', icon: Brain, description: 'AI processing' },
              { id: 'results', label: 'Results', icon: CheckCircle, description: 'View insights' }
            ].map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = index < (currentStep === 'upload' ? 0 : currentStep === 'analyzing' ? 1 : 2)

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
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <div className={`
                      text-sm font-semibold transition-colors duration-300
                      ${isCompleted || isActive ? 'text-emerald-600' : 'text-gray-400'}
                    `}>
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
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
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
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
                <input
                  type="file"
                  id="camera-capture"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
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
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  <CheckCircle className="h-4 w-4" />
                  Analysis Complete
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Score: {results.health_score}/100</h2>
                <p className="text-gray-600">{results.summary}</p>
              </div>

              {/* Health Risks */}
              {results.health_risks && results.health_risks.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Risks</h3>
                  <div className="grid gap-3">
                    {results.health_risks.map((risk: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <span className="text-red-800">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {results.recommendations && results.recommendations.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="grid gap-3">
                    {results.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted Ingredients */}
              {results.extracted_ingredients && results.extracted_ingredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Detected Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.extracted_ingredients.map((ingredient: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center mt-8">
                <button onClick={resetAnalysis} className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                  <Camera className="h-6 w-6" />
                  Scan Another Product
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SimpleResearch;
