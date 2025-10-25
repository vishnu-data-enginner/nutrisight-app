import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ModernHeader from '../components/ModernHeader'
import FloatingVeggies from '../components/FloatingVeggies'
import GlassCard from '../components/GlassCard'
import GradientCTA from '../components/GradientCTA'
import AnimatedCounter from '../components/AnimatedCounter'
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
  Play,
  Clock,
  BarChart3
} from 'lucide-react'

const NutriSight2Homepage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const features = [
    {
      icon: Zap,
      title: "Instant Results",
      description: "Upload, scan, and get personalized insights in 3 seconds — no confusion, only clarity.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Brain,
      title: "AI Research Engine",
      description: "Analyzes 10,000+ clinical nutrition studies to validate every recommendation.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Medical-Grade Insight",
      description: "Assesses ingredient risks using medical-grade models and personalized health goals.",
      color: "from-cyan-500 to-blue-500"
    }
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

  const ingredients = [
    { name: 'Sugar', impact: 'Spikes glucose levels', risk: 'high', icon: '🍯' },
    { name: 'Sodium', impact: 'Affects heart health', risk: 'medium', icon: '🧂' },
    { name: 'Preservatives', impact: 'May cause inflammation', risk: 'high', icon: '🧪' },
    { name: 'Fiber', impact: 'Supports digestion', risk: 'low', icon: '🌾' },
    { name: 'Antioxidants', impact: 'Fights free radicals', risk: 'low', icon: '🫐' },
    { name: 'Trans Fats', impact: 'Raises bad cholesterol', risk: 'high', icon: '⚠️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <ModernHeader />
      
      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <FloatingVeggies />
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-teal-100/40 to-white opacity-60 blur-3xl" />

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
                onClick={() => navigate('/research')}
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
                onClick={() => navigate('/pricing')}
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

      {/* Features Section */}
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard glow={true} delay={index * 0.1}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shadow Ingredients Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See What's Really in Your Food
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI reveals the hidden impact of every ingredient on your health
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={`relative rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
                  ingredient.risk === 'high' 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200' 
                    : ingredient.risk === 'medium'
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
                }`}
              >
                <div className="text-4xl mb-3">{ingredient.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{ingredient.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ingredient.impact}</p>
                
                {/* Risk indicator */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  ingredient.risk === 'high' ? 'bg-red-500' :
                  ingredient.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Active Users', value: 50000, suffix: '+' },
              { icon: Camera, label: 'Products Scanned', value: 250000, suffix: '+' },
              { icon: BarChart3, label: 'Accuracy Rate', value: 95, suffix: '%' },
              { icon: Clock, label: 'Avg Analysis Time', value: 2.5, suffix: 's' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
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
              >
                <GlassCard>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
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
      <GradientCTA
        title="Start Your Nutrition Revolution"
        subtitle="Join 50,000+ people who made nutrition make sense. Get your first 50 scans free."
        buttonText="Start Free Today"
        onButtonClick={() => navigate('/register')}
        features={[
          'No credit card required',
          'Cancel anytime',
          '50 free scans'
        ]}
      />
    </div>
  )
}

export default NutriSight2Homepage


