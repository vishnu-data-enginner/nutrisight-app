import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Camera, Crown, AlertTriangle, Zap } from 'lucide-react'

interface ScanCounterProps {
  onUpgradeClick?: () => void
  showUpgradePrompt?: boolean
}

const ScanCounter: React.FC<ScanCounterProps> = ({ 
  onUpgradeClick, 
  showUpgradePrompt = true 
}) => {
  const { user } = useAuth()
  const [scansLeft, setScansLeft] = useState<number>(0)
  const [totalUsed, setTotalUsed] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchScanData()
    }
  }, [user])

  const fetchScanData = async () => {
    try {
      const { data, error } = await supabase
        .from('health_profiles')
        .select('scans_left, total_scans_used')
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching scan data:', error)
        return
      }

      setScansLeft(data?.scans_left || 0)
      setTotalUsed(data?.total_scans_used || 0)
    } catch (error) {
      console.error('Error in fetchScanData:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProgressColor = () => {
    if (scansLeft > 20) return 'from-emerald-500 to-teal-500'
    if (scansLeft > 10) return 'from-yellow-500 to-orange-500'
    if (scansLeft > 0) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-red-600'
  }

  const getStatusMessage = () => {
    if (scansLeft > 20) return 'Great! You have plenty of scans left.'
    if (scansLeft > 10) return 'You\'re doing well with your scans.'
    if (scansLeft > 0) return 'Running low on scans!'
    return 'No scans remaining.'
  }

  const getStatusIcon = () => {
    if (scansLeft > 10) return <Zap className="h-4 w-4 text-emerald-600" />
    if (scansLeft > 0) return <AlertTriangle className="h-4 w-4 text-orange-500" />
    return <AlertTriangle className="h-4 w-4 text-red-500" />
  }

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-2 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Free Scans</h3>
        </div>
        {scansLeft <= 10 && showUpgradePrompt && (
          <button
            onClick={onUpgradeClick}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Crown className="h-3 w-3" />
            Upgrade
          </button>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">{scansLeft}</span>
          <span className="text-sm text-gray-500">remaining</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(scansLeft / 50) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()}`}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{totalUsed} used</span>
          <span className="text-gray-600">50 total</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        {getStatusIcon()}
        <span>{getStatusMessage()}</span>
      </div>

      {/* Low scan warning */}
      {scansLeft <= 10 && scansLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl"
        >
          <div className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Only {scansLeft} scans left! Upgrade to Pro for unlimited scans.
            </span>
          </div>
        </motion.div>
      )}

      {/* No scans remaining */}
      {scansLeft === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl text-center"
        >
          <div className="flex items-center justify-center gap-2 text-red-700 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">No scans remaining</span>
          </div>
          <p className="text-sm text-red-600 mb-3">
            Upgrade to Pro to continue scanning products and get unlimited access.
          </p>
          <button
            onClick={onUpgradeClick}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
          >
            <Crown className="h-4 w-4" />
            Upgrade to Pro
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ScanCounter


