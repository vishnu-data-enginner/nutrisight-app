import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Camera, Upload, Loader2, AlertTriangle, CheckCircle, Shield, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { analyzeImage } from "../lib/api";

const DebugResearch = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`])
    console.log(`[DEBUG] ${info}`)
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
    addDebugInfo(`Starting image upload: ${file.name} (${file.size} bytes)`)
    setIsAnalyzing(true)
    setError(null)
    setResults(null)
    setDebugInfo([])

    try {
      addDebugInfo("Calling analyzeImage API...")
      const analysisResults = await analyzeImage(file)
      addDebugInfo(`API Response received: ${JSON.stringify(analysisResults).substring(0, 100)}...`)
      
      const safeResults = {
        health_score: analysisResults.score || analysisResults.health_score || 0,
        summary: analysisResults.summary || "Analysis completed",
        health_risks: analysisResults.health_risks || [],
        recommendations: analysisResults.recommendation ? [analysisResults.recommendation] : (analysisResults.recommendations || []),
        extracted_ingredients: analysisResults.extracted_ingredients || [],
        risk_ingredients: analysisResults.risk_ingredients || [],
        tags: analysisResults.tags || [],
        analysis_type: "standard"
      }
      
      addDebugInfo("Results processed successfully")
      setResults(safeResults)
      
    } catch (err: any) {
      addDebugInfo(`ERROR: ${err.message}`)
      setError(err.message || 'Failed to analyze image')
      console.error("Analysis Failed - Full Error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      addDebugInfo(`File selected: ${file.name}`)
      handleImageUpload(file)
    } else {
      addDebugInfo("No file selected")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">NutriSight Debug</span>
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

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Debug Research Page</h1>
          <p className="text-gray-600 mb-8">This page will show debug information for image uploads</p>

          {/* Upload Section */}
          <div className="max-w-md mx-auto">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
              <Upload className="mx-auto mb-3 w-10 h-10 text-emerald-500" />
              <h3 className="font-semibold text-gray-800 mb-1">Upload Image</h3>
              <p className="text-gray-500 text-sm mb-4">Select an image to test</p>
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
            </div>
          </div>
        </section>

        {/* Debug Info */}
        <div className="mb-8 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Debug Information:</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {debugInfo.map((info, index) => (
              <div key={index} className="text-sm font-mono text-gray-700">
                {info}
              </div>
            ))}
          </div>
        </div>

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
                Debug mode: Check console and debug info above
              </p>
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

              {/* Raw Results */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Raw API Response:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-60">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DebugResearch;