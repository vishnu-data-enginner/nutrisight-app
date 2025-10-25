import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  Loader2, 
  Clock, 
  ArrowLeft, 
  Activity, 
  Eye, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Zap,
  Heart,
  Brain
} from 'lucide-react'

type Scan = {
  id: string
  product_name: string
  score: number
  created_at: string
  ingredients?: string[]
  health_risks?: string[]
  nutritional_insights?: any
}

const HistoryPage: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Fetch from analyses table (your existing table)
        const { data, error } = await supabase
          .from('analyses')
          .select('id, product_name, ai_score, created_at, ingredients, health_risks, nutritional_insights')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (!error && data) {
          const formattedScans = data.map(scan => ({
            id: scan.id,
            product_name: scan.product_name,
            score: scan.ai_score,
            created_at: scan.created_at,
            ingredients: scan.ingredients,
            health_risks: scan.health_risks,
            nutritional_insights: scan.nutritional_insights
          }))
          setScans(formattedScans)
        }
      } catch (error) {
        console.error('Error fetching scans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScans()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-200'
    if (score >= 60) return 'bg-blue-50 border-blue-200'
    if (score >= 40) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-emerald-600" />
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-blue-600" />
    if (score >= 40) return <AlertTriangle className="w-4 h-4 text-amber-600" />
    return <TrendingDown className="w-4 h-4 text-red-600" />
  }

  const handleViewDetails = (scan: Scan) => {
    setSelectedScan(scan)
    setShowDetails(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
              <Activity className="w-8 h-8 text-emerald-600" />
              Scan History
            </h1>
            <p className="text-gray-600 mt-1">{scans.length} products analyzed</p>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Product Analysis History</h2>
            <p className="text-sm text-gray-600">Track your health journey through ingredient analysis</p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
              </div>
            ) : scans.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <Clock className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No scans yet</h3>
                <p className="text-gray-600 text-sm mb-4">
                  You haven't analyzed any products yet.
                </p>
                <p className="text-gray-400 text-xs mb-6">
                  Once you start scanning, your product history will appear here.
                </p>
                <Link to="/research">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Start Scanning
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer group"
                    onClick={() => handleViewDetails(scan)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold">
                        {scan.product_name?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {scan.product_name || 'Unnamed Product'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(scan.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                          <span>•</span>
                          <span>{scan.ingredients?.length || 0} ingredients</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-xl border ${getScoreBg(scan.score)}`}>
                        <div className="flex items-center gap-2">
                          {getScoreIcon(scan.score)}
                          <span className={`text-lg font-bold ${getScoreColor(scan.score)}`}>
                            {scan.score}/100
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 group-hover:text-emerald-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Back to Dashboard */}
            <div className="mt-6 flex justify-center">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scan Details Drawer */}
      {showDetails && selectedScan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedScan.product_name}</h3>
                  <p className="text-emerald-100 mt-1">
                    Analyzed on {new Date(selectedScan.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Health Score */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${getScoreBg(selectedScan.score)}`}>
                  {getScoreIcon(selectedScan.score)}
                  <span className={`text-3xl font-bold ${getScoreColor(selectedScan.score)}`}>
                    {selectedScan.score}/100
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Overall Health Score</p>
              </div>

              {/* Ingredients */}
              {selectedScan.ingredients && selectedScan.ingredients.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    Ingredients ({selectedScan.ingredients.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedScan.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Risks */}
              {selectedScan.health_risks && selectedScan.health_risks.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Health Concerns
                  </h4>
                  <div className="space-y-2">
                    {selectedScan.health_risks.map((risk, index) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-800 text-sm">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutritional Insights */}
              {selectedScan.nutritional_insights && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    AI Insights
                  </h4>
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <p className="text-emerald-800">
                      {typeof selectedScan.nutritional_insights === 'string' 
                        ? selectedScan.nutritional_insights 
                        : JSON.stringify(selectedScan.nutritional_insights)
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-colors">
                  Share Results
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors">
                  Export Data
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default HistoryPage
