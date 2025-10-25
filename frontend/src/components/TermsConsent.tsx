import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { acceptTerms } from '../middleware/consentMiddleware'
import { CheckCircle, Shield, Mail, AlertCircle } from 'lucide-react'

interface TermsConsentProps {
  onAccept: () => void
  onDecline: () => void
}

const TermsConsent: React.FC<TermsConsentProps> = ({ onAccept, onDecline }) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleAccept = async () => {
    if (!user || !termsAccepted) return

    setIsLoading(true)
    try {
      const success = await acceptTerms(user.id, 'v1.0')
      if (success) {
        onAccept()
      } else {
        alert('Failed to accept terms. Please try again.')
      }
    } catch (error) {
      console.error('Error accepting terms:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to NutriSight! 🎉
          </h2>
          <p className="text-gray-600">
            Before we start your health journey, please review our terms and privacy policy.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Terms Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Terms of Service & Privacy Policy
            </h3>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                By using NutriSight, you agree to our Terms of Service and Privacy Policy. 
                We're committed to protecting your health data and privacy.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Your health data is encrypted and secure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span>We never sell your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span>You can delete your data anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span>AI analysis is for educational purposes only</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Free Scans Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Your Free Trial
            </h3>
            <div className="text-sm text-gray-700">
              <p className="mb-3">
                You get <strong>50 free scans</strong> to explore NutriSight's AI-powered nutrition analysis.
              </p>
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Free Scans</span>
                  <span className="text-sm font-bold text-blue-600">50 remaining</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Opt-in */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Stay Updated (Optional)
            </h3>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="marketing" className="text-sm text-gray-700">
                I'd like to receive health tips, product updates, and special offers via email. 
                You can unsubscribe anytime.
              </label>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-8">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and agree to the{' '}
              <a href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                Privacy Policy
              </a>
              . I understand that AI analysis is for educational purposes only and should not replace professional medical advice.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onDecline}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            Decline & Exit
          </button>
          <button
            onClick={handleAccept}
            disabled={!termsAccepted || isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Accepting...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Accept & Continue
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you'll get 50 free scans to explore NutriSight's AI nutrition analysis.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TermsConsent


