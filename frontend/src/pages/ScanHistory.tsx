import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  History, 
  ArrowLeft, 
  Clock, 
  Camera, 
  BarChart3, 
  Eye, 
  Download, 
  Share2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ScanRecord {
  id: string
  product_name: string
  ai_score: number
  created_at: string
  ingredients: string[]
  health_risks: string[]
  nutritional_insights: any
}

const ScanHistory: React.FC = () => {
  const [scans, setScans] = useState<ScanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20)

        if (error) {
          console.error('Error fetching scans:', error)
        } else {
          setScans(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
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

  const filteredScans = scans.filter(scan => {
    if (filter === 'all') return true
    if (filter === 'high') return scan.ai_score >= 80
    if (filter === 'medium') return scan.ai_score >= 60 && scan.ai_score < 80
    if (filter === 'low') return scan.ai_score < 60
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (scans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-8 shadow-lg max-w-md w-full"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <History className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Scan History</h1>
          </div>

          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">No scans yet</h2>
            <p className="text-gray-600 text-sm mb-4">
              You haven't analyzed any products yet.
            </p>
            <p className="text-gray-400 text-xs mb-6 flex justify-center items-center gap-1">
              <Clock className="w-3 h-3" />
              Once you start scanning, your product history will appear here.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/research">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Start Scanning
              </motion.button>
            </Link>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-gray-300 text-gray-600 hover:text-emerald-600 hover:border-emerald-300 px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
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
                <History className="w-8 h-8 text-emerald-600" />
                Scan History
              </h1>
              <p className="text-gray-600 mt-1">{scans.length} products analyzed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter by score:</span>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', count: scans.length },
                { key: 'high', label: 'High (80+)', count: scans.filter(s => s.ai_score >= 80).length },
                { key: 'medium', label: 'Medium (60-79)', count: scans.filter(s => s.ai_score >= 60 && s.ai_score < 80).length },
                { key: 'low', label: 'Low (<60)', count: scans.filter(s => s.ai_score < 60).length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === key
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scans List */}
        <div className="space-y-4">
          {filteredScans.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold">
                    {scan.product_name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {scan.product_name || 'Unknown Product'}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(scan.created_at).toLocaleDateString()}
                      <span>•</span>
                      <span>{scan.ingredients?.length || 0} ingredients</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-xl border ${getScoreBg(scan.ai_score)}`}>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(scan.ai_score)}
                      <span className={`text-xl font-bold ${getScoreColor(scan.ai_score)}`}>
                        {scan.ai_score}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Ingredients Preview */}
              {scan.ingredients && scan.ingredients.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {scan.ingredients.slice(0, 5).map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {scan.ingredients.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{scan.ingredients.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredScans.length >= 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Load More Scans
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ScanHistory
