import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Brain, 
  Camera, 
  Sparkles, 
  Shield, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  Leaf,
  Target,
  Award,
  Play
} from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import GlassCard from '../components/GlassCard'
import IngredientVisualization from '../components/IngredientVisualization'

const ModernHomepage = () => {
  const [counts, setCounts] = useState({
    users: 0,
    scans: 0,
    ingredients: 0
  })

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  // Animated counters
  useEffect(() => {
    const animateCounts = () => {
      setCounts(prev => ({
        users: Math.min(prev.users + 50, 50000),
        scans: Math.min(prev.scans + 25, 250000),
        ingredients: Math.min(prev.ingredients + 10, 10000)
      }))
    }

    const interval = setInterval(animateCounts, 50)
    return () => clearInterval(interval)
  }, [])

  const ingredients = [
    { name: 'Sugar', impact: 'Spikes glucose levels', risk: 'high', icon: '🍯' },
    { name: 'Sodium', impact: 'Affects heart health', risk: 'medium', icon: '🧂' },
    { name: 'Preservatives', impact: 'May cause inflammation', risk: 'high', icon: '🧪' },
    { name: 'Fiber', impact: 'Supports digestion', risk: 'low', icon: '🌾' },
    { name: 'Antioxidants', impact: 'Fights free radicals', risk: 'low', icon: '🫐' },
    { name: 'Trans Fats', impact: 'Raises bad cholesterol', risk: 'high', icon: '⚠️' }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Health Coach',
      avatar: '👩‍⚕️',
      quote: 'AI detected 3 unhealthy additives in my breakfast bar — changed my shopping forever.',
      score: '+23%',
      metric: 'Health Score'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Fitness Enthusiast',
      avatar: '💪',
      quote: 'Finally understand what I\'m eating. The personalized insights are game-changing.',
      score: '15',
      metric: 'Products Scanned'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Nutritionist',
      avatar: '👩‍🔬',
      quote: 'The research-backed analysis helps my clients make informed decisions.',
      score: '98%',
      metric: 'Accuracy Rate'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400/20 to-lime-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-300/30 to-teal-300/30 rounded-full blur-lg"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-emerald-200"
            >
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Nutrition Intelligence</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI Nutrition
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Scientist
              </span>
              <span className="block text-4xl md:text-5xl text-gray-600 font-normal mt-2">
                in Your Pocket
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how every ingredient impacts <span className="text-emerald-600 font-semibold">your health</span>. 
              Get personalized insights powered by clinical research and AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Scan a Product
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/80 backdrop-blur-sm text-emerald-600 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Try 50 Free Scans
                </span>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-emerald-600" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>Research-Backed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your nutrition knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'AI Scan Engine',
                description: 'Point your camera at any ingredient label and our AI instantly extracts and analyzes every component.',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                icon: Brain,
                title: 'Clinical Research Matching',
                description: 'Our AI cross-references ingredients against thousands of peer-reviewed studies and medical databases.',
                color: 'from-teal-500 to-cyan-500'
              },
              {
                icon: Heart,
                title: 'Personalized Insight',
                description: 'Get tailored recommendations based on your health profile, goals, and dietary preferences.',
                color: 'from-cyan-500 to-blue-500'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard glow={true}>
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shadow Ingredients Section */}
      <IngredientVisualization />

      {/* Trusted By Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Health-Conscious People
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands who've transformed their nutrition knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, label: 'Active Users', value: counts.users.toLocaleString(), suffix: '+' },
              { icon: Camera, label: 'Products Scanned', value: counts.scans.toLocaleString(), suffix: '+' },
              { icon: Leaf, label: 'Ingredients Analyzed', value: counts.ingredients.toLocaleString(), suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter 
                    end={parseInt(stat.value.replace(/,/g, ''))} 
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Brand logos placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
          >
            {['🏥', '💊', '🥗', '🏃‍♀️', '🧘‍♀️', '👨‍⚕️'].map((emoji, index) => (
              <div key={index} className="text-4xl">{emoji}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Stories, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how NutriSight is transforming lives one scan at a time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlassCard className="h-full flex flex-col min-h-[320px]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm text-gray-600">{testimonial.metric}</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {testimonial.score}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 rounded-[40px] p-12 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              >
                <Zap className="h-5 w-5" />
                <span className="text-sm font-medium">Ready to Transform Your Health?</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Nutrition Revolution
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join 50,000+ people who made nutrition make sense. 
                Get your first 50 scans free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Camera className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  View Pricing
                </motion.button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>50 free scans</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default ModernHomepage
