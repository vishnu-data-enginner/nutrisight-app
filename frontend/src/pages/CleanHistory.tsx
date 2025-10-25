import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { History, ArrowLeft, Clock, Camera, BarChart3 } from 'lucide-react'

const CleanHistory: React.FC = () => {
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
        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <History className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Scan History</h1>
        </div>

        {/* Empty State */}
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

        {/* Actions */}
        <div className="space-y-3">
          <Link to="/research">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Start Scanning
              <ArrowLeft className="w-4 h-4 rotate-180" />
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

        {/* Future Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100"
        >
          <h3 className="text-sm font-medium text-emerald-800 mb-2">Coming Soon</h3>
          <div className="grid grid-cols-2 gap-3 text-xs text-emerald-700">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <History className="w-3 h-3" />
              <span>Export Data</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default CleanHistory
