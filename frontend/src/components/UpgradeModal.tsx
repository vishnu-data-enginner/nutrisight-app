import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  X, 
  Crown, 
  Zap, 
  BarChart3, 
  Users, 
  Shield, 
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  trigger?: 'low_scans' | 'feature_limit' | 'manual'
  scansLeft?: number
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  trigger = 'manual',
  scansLeft = 0 
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'yearly'>('pro')
  const [isLoading, setIsLoading] = useState(false)

  const plans = {
    pro: {
      name: 'Pro',
      price: '$10',
      period: '/month',
      originalPrice: null,
      features: [
        'Unlimited product scans',
        'Advanced AI insights',
        'Health analytics dashboard',
        'Priority support',
        'Export scan history',
        'Family sharing (up to 5 users)'
      ],
      popular: true
    },
    yearly: {
      name: 'Yearly Pro',
      price: '$100',
      period: '/year',
      originalPrice: '$120',
      features: [
        'Everything in Pro',
        'Save 17% vs monthly',
        'Annual health report',
        'Premium ingredient database',
        'Early access to new features',
        'Priority feature requests'
      ],
      popular: false
    }
  }

  const getModalTitle = () => {
    switch (trigger) {
      case 'low_scans':
        return scansLeft === 0 ? 'No Scans Left!' : 'Running Low on Scans!'
      case 'feature_limit':
        return 'Unlock Advanced Features'
      default:
        return 'Upgrade to NutriSight Pro'
    }
  }

  const getModalSubtitle = () => {
    switch (trigger) {
      case 'low_scans':
        return scansLeft === 0 
          ? "Don't let your health journey stop here. Upgrade for unlimited scans!"
          : `Only ${scansLeft} scans left! Upgrade to continue your health journey.`
      case 'feature_limit':
        return 'Get access to advanced AI insights and health analytics.'
      default:
        return 'Join thousands of health-conscious users who upgraded to Pro.'
    }
  }

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      // Redirect to pricing page with plan pre-selected
      navigate(`/pricing?plan=${selectedPlan}&utm_source=upgrade_modal&utm_medium=${trigger}`)
      onClose()
    } catch (error) {
      console.error('Error upgrading:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 rounded-t-3xl text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <Crown className="h-8 w-8" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-2">{getModalTitle()}</h2>
              <p className="text-emerald-100 text-lg">{getModalSubtitle()}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Social Proof */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 ml-2">4.9/5 from 50,000+ users</span>
              </div>
              <p className="text-gray-500 text-sm">
                "NutriSight Pro changed how I shop for groceries. The AI insights are incredible!" - Sarah M.
              </p>
            </div>

            {/* Plan Selection */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(plans).map(([key, plan]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                    selectedPlan === key
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setSelectedPlan(key as 'pro' | 'yearly')}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">{plan.originalPrice}/year</span>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 17%</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                What you get with Pro
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Unlimited Scans</h4>
                  <p className="text-sm text-gray-600">Scan as many products as you want</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Health Analytics</h4>
                  <p className="text-sm text-gray-600">Track your nutrition trends over time</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Family Sharing</h4>
                  <p className="text-sm text-gray-600">Share with up to 5 family members</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4" />
                    Upgrade to {plans[selectedPlan].name}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UpgradeModal


