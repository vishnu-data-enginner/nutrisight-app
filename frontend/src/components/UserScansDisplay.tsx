import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Zap, Gift, Crown, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface UserScans {
  free_scans: number
  total_scans: number
  plan: string
  accepted_terms: boolean
}

const UserScansDisplay: React.FC = () => {
  const [scans, setScans] = useState<UserScans | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserScans = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('user_scans')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching user scans:', error)
        } else {
          setScans(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserScans()
  }, [])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!scans) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-lg">
        <div className="text-center text-gray-500">
          <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No scan data available</p>
        </div>
      </div>
    )
  }

  const isPro = scans.plan === 'pro' || scans.plan === 'yearly'
  const scansRemaining = isPro ? 'Unlimited' : scans.free_scans

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Your Scan Status</h3>
          <p className="text-sm text-gray-600">Track your health journey</p>
        </div>
        {isPro && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Crown className="w-4 h-4" />
            Pro
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Scans Remaining */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {scansRemaining === 'Unlimited' ? '∞' : scansRemaining}
              </div>
              <div className="text-sm text-gray-600">Scans Remaining</div>
            </div>
          </div>
        </div>

        {/* Total Scans */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{scans.total_scans}</div>
              <div className="text-sm text-gray-600">Total Scans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {!isPro && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Free Scans Used</span>
            <span>{50 - scans.free_scans}/50</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((50 - scans.free_scans) / 50) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Terms Status */}
      <div className="flex items-center gap-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${scans.accepted_terms ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className={scans.accepted_terms ? 'text-emerald-600' : 'text-red-600'}>
          {scans.accepted_terms ? 'Terms Accepted' : 'Terms Not Accepted'}
        </span>
      </div>

      {/* Upgrade Prompt */}
      {!isPro && scans.free_scans <= 10 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5" />
            <div>
              <div className="font-semibold">Running Low on Scans!</div>
              <div className="text-sm opacity-90">Upgrade to Pro for unlimited scans</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserScansDisplay
