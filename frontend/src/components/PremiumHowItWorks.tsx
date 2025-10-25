import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Brain, TrendingUp, ArrowRight, Sparkles, CheckCircle, Clock, Target, Zap } from 'lucide-react'

const PremiumHowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Scan Product',
      description: 'Take a photo of any food label or ingredient list. Our AI instantly recognizes text and extracts ingredients with 99.2% accuracy.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      data: '99.2% OCR Accuracy',
      time: '2 seconds',
      features: ['OCR text recognition', 'Instant ingredient extraction', 'Multi-language support']
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our research engine analyzes 10,000+ studies to provide personalized health insights and risk assessments based on your profile.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      data: '10,000+ Research Papers',
      time: '1 second',
      features: ['Clinical research analysis', 'Personalized insights', 'Health risk assessment']
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Improve Health',
      description: 'Get actionable recommendations to make better food choices and track your nutrition journey over time with detailed analytics.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      data: '98% User Satisfaction',
      time: 'Instant',
      features: ['Actionable recommendations', 'Health progress tracking', 'Nutrition analytics']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">How NutriSight Works</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            From Scan to
            <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              Health Insights
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to transform your nutrition knowledge with AI-powered ingredient analysis
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Step Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-emerald-600 to-sky-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10"
              >
                {step.number}
              </motion.div>

              {/* Step Card */}
              <div className={`${step.bgColor} border-2 ${step.borderColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-opacity-60 relative overflow-hidden`}>
                {/* Gradient Shadow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Real Data Display */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{step.data}</span>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                    />
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="h-6 w-6" />
            Start Your First Scan
            <ArrowRight className="h-5 w-5" />
          </motion.div>
          <p className="text-slate-600 mt-4 text-sm">
            Join thousands making healthier choices with AI-powered nutrition insights
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumHowItWorks
