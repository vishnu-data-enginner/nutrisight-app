import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Check, Star, Zap, Shield, Users, Brain, ArrowRight } from 'lucide-react'

const EnhancedPricing: React.FC = () => {
  const navigate = useNavigate()
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free Plan",
      price: 0,
      period: "month",
      description: "Perfect for getting started",
      features: [
        "50 Scans / month",
        "Basic ingredient analysis",
        "Community access",
        "Mobile app access"
      ],
      cta: "Get Started Free",
      popular: false,
      color: "from-slate-600 to-slate-700"
    },
    {
      name: "Pro Plan",
      price: isAnnual ? 4.99 : 4.99,
      period: "month",
      description: "For health-conscious individuals",
      features: [
        "Unlimited Scans",
        "AI-powered health insights",
        "Personalized nutrition tracking",
        "Early access to new features",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      color: "from-emerald-500 to-teal-400"
    },
    {
      name: "Nutritionist Plan",
      price: isAnnual ? 14.99 : 14.99,
      period: "month",
      description: "For health professionals",
      features: [
        "Everything in Pro +",
        "Client dashboards",
        "Export reports & analytics",
        "White-label options",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-violet-400"
    }
  ]

  const features = [
    { name: "AI Insights", free: true, pro: true, nutritionist: true },
    { name: "Research-backed Data", free: true, pro: true, nutritionist: true },
    { name: "Ad-free Experience", free: true, pro: true, nutritionist: true },
    { name: "Nutrition Dashboard", free: false, pro: true, nutritionist: true },
    { name: "Ingredient Database Access", free: false, pro: true, nutritionist: true },
    { name: "Client Management", free: false, pro: false, nutritionist: true },
    { name: "Export Reports", free: false, pro: false, nutritionist: true }
  ]

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period."
    },
    {
      question: "Do you analyze cosmetics?",
      answer: "Currently, we focus on food and beverage products. We're working on expanding to cosmetics and personal care items."
    },
    {
      question: "How accurate are the insights?",
      answer: "Our AI achieves 95% accuracy by analyzing over 10,000 peer-reviewed research papers and clinical studies."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. We never sell your data or share it with third parties. Your privacy is our top priority."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-emerald-400/10 via-teal-400/5 to-cyan-400/10 rounded-full blur-[200px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-indigo-400/10 rounded-full blur-[150px] bottom-[-150px] right-[-150px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-20 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Start free and unlock premium features as you grow
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-full p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  !isAnnual
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  isAnnual
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
                className={`relative bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-8 ${
                  plan.popular
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-700/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(plan.name === 'Free Plan' ? '/upgraded-signup' : '/upgraded-signup')}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white shadow-lg shadow-emerald-500/30'
                      : 'border border-slate-600 hover:border-emerald-400 text-white hover:text-emerald-400'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Feature Comparison</h2>
            <p className="text-gray-400">See what's included in each plan</p>
          </motion.div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="text-left p-6 text-white font-semibold">Features</th>
                    <th className="text-center p-6 text-white font-semibold">Free</th>
                    <th className="text-center p-6 text-white font-semibold">Pro</th>
                    <th className="text-center p-6 text-white font-semibold">Nutritionist</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-t border-slate-700/50">
                      <td className="p-6 text-white font-medium">{feature.name}</td>
                      <td className="p-6 text-center">
                        {feature.free ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {feature.pro ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {feature.nutritionist ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our plans</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Start your AI-powered health journey today</h2>
            <p className="text-gray-400 mb-8">No credit card required • Instant setup</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/upgraded-signup')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Get 50 Free Scans
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default EnhancedPricing
