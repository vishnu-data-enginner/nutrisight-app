import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SimpleFloatingVeggies from '../components/SimpleFloatingVeggies'
import { 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Camera,
  Brain,
  Heart,
  Zap,
  Crown,
  BarChart3,
  Sparkles,
  Activity,
  Target,
  Clock,
  Award,
  Sun,
  Moon
} from 'lucide-react'

const UnifiedHomepage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Products Scanned', value: '250K+', icon: Camera },
    { label: 'Research Papers', value: '10K+', icon: Brain },
    { label: 'Accuracy Rate', value: '98%', icon: TrendingUp }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Health Coach',
      quote: 'AI detected 3 unhealthy additives I never noticed. Changed my shopping forever.',
      metric: '+23% Health Score',
      avatar: '👩‍⚕️',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Fitness Enthusiast',
      quote: 'Finally understand what I\'m eating. The insights are absolutely game-changing.',
      metric: '15 Products Scanned',
      avatar: '💪',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Nutritionist',
      quote: 'Research-backed analysis helps my clients make informed decisions with confidence.',
      metric: '98% Accuracy',
      avatar: '👩‍🔬',
      rating: 5
    }
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI Research Engine',
      description: 'Analyzes 10,000+ scientific papers to provide evidence-based nutrition insights.',
      metric: '10,000+ studies analyzed'
    },
    {
      icon: Heart,
      title: 'Personalized Insights',
      description: 'Get recommendations tailored to your health profile and dietary preferences.',
      metric: '3-second scan time'
    },
    {
      icon: Target,
      title: 'Instant Results',
      description: 'Upload a photo and get comprehensive analysis in seconds, not minutes.',
      metric: '98% accuracy rate'
    }
  ]

  return (
    <div className="min-h-screen relative font-sans bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-slate-600" />
        )}
      </motion.button>

      {/* Floating Veggies Animation */}
      <SimpleFloatingVeggies />
      
      {/* Hero Section - Fixed Alignment & Typography */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 max-w-6xl mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium tracking-wide mb-3"
          >
            AI-Powered Nutrition Intelligence
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
          >
            Understand Your Food. <br />
            <span className="text-emerald-600 dark:text-emerald-400">Improve Your Life.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
          >
            Scan any label and get AI-verified, clinically backed nutrition insights — instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="relative">
              {/* Pulse Effect Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Start Scanning — Get 50 Free Scans
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-4"
          >
            No credit card required • Instant results in 3s
          </motion.p>
        </motion.div>
      </section>

      {/* How It Works Section - Consistent Spacing */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Three simple steps to transform your nutrition knowledge
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-100 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{feature.description}</p>
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{feature.metric}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section - Unified Spacing */}
      <section className="py-24 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Trusted by Health-Conscious People
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands who've transformed their nutrition knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 dark:border-slate-700/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Consistent Spacing */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See how NutriSight is transforming lives and making nutrition make sense
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
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-100 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{testimonial.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Single Pro Upgrade Section - Modernized & Deduplicated */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 text-white py-20 rounded-3xl shadow-lg relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 dark:from-emerald-700/30 dark:to-cyan-700/30 blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              >
                <Crown className="h-5 w-5" />
                <span className="text-sm font-medium">Ready to Go Pro?</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Upgrade to NutriSight Pro 🚀
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Unlock advanced AI nutrition analytics, personalized health tracking, and unlimited scans.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Crown className="h-5 w-5" />
                  Upgrade Now
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    View Pricing
                  </motion.button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Unlimited scans</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Advanced AI insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Family sharing</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section - Consistent Spacing */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 relative z-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands making healthier choices with AI-powered nutrition insights
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Scan Your First Product
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-600 dark:to-teal-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <Link to="/upgraded-signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-full font-semibold text-lg border-2 border-emerald-200 dark:border-emerald-600 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Get 50 Free Scans
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default UnifiedHomepage
