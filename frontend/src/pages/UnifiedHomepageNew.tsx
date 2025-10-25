import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  Award
} from 'lucide-react'

const UnifiedHomepageNew: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-emerald-600 dark:text-emerald-400 font-medium tracking-wide mb-3"
        >
          AI-Powered Nutrition Intelligence
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
        >
          Understand Your Food. <br />
          <span className="text-emerald-600 dark:text-emerald-400">Improve Your Life.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
        >
          Scan any label and get AI-verified, clinically backed nutrition insights — instantly.
        </motion.p>

        {/* Unified CTA Button */}
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
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Three simple steps to unlock the power of AI nutrition analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: "Scan Product",
              description: "Take a photo or upload an image of any food label"
            },
            {
              icon: Brain,
              title: "AI Analysis",
              description: "Our AI analyzes ingredients against 10,000+ research papers"
            },
            {
              icon: Heart,
              title: "Get Insights",
              description: "Receive personalized health scores and recommendations"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "50K+", label: "Products Analyzed" },
            { number: "10K+", label: "Research Papers" },
            { number: "95%", label: "Accuracy Rate" },
            { number: "3s", label: "Analysis Time" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by Health-Conscious Users
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            See what our users say about NutriSight
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Nutritionist",
              content: "NutriSight has revolutionized how I analyze food products. The AI insights are incredibly accurate and help me make better recommendations for my clients.",
              rating: 5
            },
            {
              name: "Mike Chen",
              role: "Health Enthusiast",
              content: "I've been using NutriSight for 6 months and it's helped me identify hidden ingredients that were affecting my health. Game changer!",
              rating: 5
            },
            {
              name: "Dr. Emily Rodriguez",
              role: "Family Physician",
              content: "The research-backed analysis gives me confidence in the recommendations. It's like having a nutrition expert in your pocket.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] rounded-2xl shadow-lg"
        >
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-10 py-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Transform Your Health?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Join thousands of users who are making smarter food choices with AI-powered insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-emerald-300 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default UnifiedHomepageNew
