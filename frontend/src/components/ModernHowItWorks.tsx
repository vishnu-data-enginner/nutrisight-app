import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Brain, Heart, Camera, Sparkles, Shield, TrendingUp } from 'lucide-react'

const ModernHowItWorks: React.FC = () => {
  const features = [
    {
      title: "Instant Results",
      description: "Upload or scan any product and get health insights in 3 seconds — clarity, not confusion.",
      icon: Zap,
      gradient: "from-green-400 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      delay: 0.1,
      particles: ["⚡", "✨", "💫"]
    },
    {
      title: "AI Research Engine", 
      description: "Our AI references 10,000+ clinical nutrition studies to validate each recommendation.",
      icon: Brain,
      gradient: "from-cyan-400 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200",
      iconColor: "text-cyan-600",
      delay: 0.2,
      particles: ["🧠", "🔬", "📊"]
    },
    {
      title: "Medical-Grade Insight",
      description: "Get ingredient risk analysis matched to your profile and health conditions.",
      icon: Heart,
      gradient: "from-pink-400 to-purple-600",
      bgGradient: "from-pink-50 to-purple-50",
      borderColor: "border-pink-200",
      iconColor: "text-pink-600",
      delay: 0.3,
      particles: ["💚", "🩺", "⚕️"]
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-emerald-200"
          >
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Nutrition Intelligence</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to transform your nutrition knowledge with AI-powered insights
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: feature.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Card Background */}
              <div className={`relative rounded-3xl p-8 shadow-xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} backdrop-blur-sm overflow-hidden`}>
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {feature.particles.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl opacity-20"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${10 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      {particle}
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: feature.delay + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: feature.delay + 0.3 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-gray-900 mb-4"
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: feature.delay + 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>

                  {/* Step Number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: feature.delay + 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                />
              </div>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Start Your First Scan
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ModernHowItWorks


