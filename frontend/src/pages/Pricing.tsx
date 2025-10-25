import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  Brain,
  Heart,
  Target,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started",
      features: [
        "50 free scans per month",
        "Basic ingredient analysis",
        "Health score calculation",
        "Mobile app access",
        "Email support"
      ],
      limitations: [
        "Limited to 50 scans",
        "Basic insights only"
      ],
      color: "slate",
      popular: false,
      cta: "Get Started Free",
      ctaLink: "/upgraded-signup"
    },
    {
      name: "Pro",
      price: { monthly: 9, annual: 90 },
      description: "For health-conscious individuals",
      features: [
        "Unlimited scans",
        "Advanced AI insights",
        "Personalized recommendations",
        "Health trend tracking",
        "Export data to PDF",
        "Priority support",
        "Family sharing (up to 4 users)",
        "Custom health goals"
      ],
      limitations: [],
      color: "emerald",
      popular: true,
      cta: "Start Pro Trial",
      ctaLink: "/upgraded-signup"
    },
    {
      name: "Expert",
      price: { monthly: 19, annual: 190 },
      description: "For nutrition professionals",
      features: [
        "Everything in Pro",
        "AI meal planning",
        "Client management",
        "Advanced analytics",
        "White-label options",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Team collaboration tools"
      ],
      limitations: [],
      color: "purple",
      popular: false,
      cta: "Contact Sales",
      ctaLink: "/contact"
    }
  ]

  return (
    <div className="relative">
        {/* Header */}
      <div className="relative z-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your health journey. Start free, upgrade anytime.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: isAnnual ? 32 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-lg font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="ml-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold rounded-full">
                  Save 20%
                </span>
              )}
        </div>
          </motion.div>

        {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-2 border-emerald-400 scale-105'
                    : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    plan.popular 
                      ? 'bg-white/20' 
                      : `bg-${plan.color}-100 dark:bg-${plan.color}-900/20`
                  }`}>
                    {plan.name === 'Free' && <Zap className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-slate-600'}`} />}
                    {plan.name === 'Pro' && <Crown className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-emerald-600'}`} />}
                    {plan.name === 'Expert' && <Brain className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-purple-600'}`} />}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-lg text-slate-500 dark:text-slate-400">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      ${Math.round(plan.price.annual / 12)}/month billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-white' : 'text-emerald-500'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Limitations:</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link to={plan.ctaLink}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular 
                        ? 'bg-white text-emerald-600 hover:bg-gray-100'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
        </div>

        {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                  question: "Can I change plans anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                  question: "What happens to my data if I cancel?",
                  answer: "Your data is always yours. You can export it before canceling, and we'll keep it for 30 days after cancellation."
              },
              {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
              },
              {
                  question: "Is my data secure?",
                  answer: "Absolutely. We're HIPAA compliant and use enterprise-grade security to protect your health data."
              }
            ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </motion.div>
            ))}
          </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] rounded-3xl shadow-lg">
              <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl px-10 py-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Ready to Transform Your Health?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  Join thousands of users making smarter food choices with AI-powered insights.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/upgraded-signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Start Free Trial
                    </motion.button>
                  </Link>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-emerald-300 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Pricing