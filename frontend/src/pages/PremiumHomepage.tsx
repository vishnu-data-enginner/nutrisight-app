import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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
  Award,
  Play,
  Eye,
  ChevronRight,
  Quote,
  Star as StarIcon,
  CheckCircle2,
  Globe,
  Lock,
  FileText,
  Microscope,
  TrendingDown,
  Apple,
  Leaf,
  Beaker,
  Database,
  Cpu,
  Sparkle
} from 'lucide-react'

const PremiumHomepage: React.FC = () => {
  const [liveStats, setLiveStats] = useState({
    productsAnalyzed: 50247,
    researchPapers: 10234,
    accuracyRate: 95,
    analysisTime: 3
  })

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Live counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        productsAnalyzed: prev.productsAnalyzed + Math.floor(Math.random() * 3),
        researchPapers: prev.researchPapers + Math.floor(Math.random() * 2),
        accuracyRate: prev.accuracyRate,
        analysisTime: prev.analysisTime
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Nutritionist",
      content: "NutriSight has revolutionized how I analyze food products. The AI insights are incredibly accurate and help me make better recommendations for my clients.",
      rating: 5,
      avatar: "👩‍⚕️"
    },
    {
      name: "Mike Chen",
      role: "Health Enthusiast", 
      content: "I've been using NutriSight for 6 months and it's helped me identify hidden ingredients that were affecting my health. Game changer!",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Family Physician",
      content: "The research-backed analysis gives me confidence in the recommendations. It's like having a nutrition expert in your pocket.",
      rating: 5,
      avatar: "👩‍⚕️"
    }
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 max-w-6xl mx-auto">
        {/* Neural Network Animation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
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
            className="text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
          >
            Understand Your Food. <br />
            <span className="text-emerald-600 dark:text-emerald-400">Improve Your Life.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8"
          >
            NutriSight decodes your food labels in seconds — powered by 10,000+ clinical studies.
          </motion.p>

          {/* Dual-Action CTA Button */}
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
                  Start Scanning — Try 50 Free Scans
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

      {/* Trust Layer Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Shield, text: "HIPAA Compliant", color: "emerald" },
            { icon: FileText, text: "Backed by Research", color: "blue" },
            { icon: Target, text: "99% OCR Accuracy", color: "purple" },
            { icon: Lock, text: "100% Data Privacy", color: "green" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🧩 See NutriSight in Action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Experience the power of AI nutrition analysis before you sign up
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Instant AI Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 dark:text-emerald-200">⚡ Low sodium</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-200">✅ Rich in Fiber</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 dark:text-red-200">🚫 Avoid trans fats</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Brain className="w-16 h-16 text-white" />
              </motion.div>
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300">
                Try Demo
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Live Stats Section */}
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
            Real-time data from our growing community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { 
              number: liveStats.productsAnalyzed.toLocaleString(), 
              label: "Products Analyzed",
              icon: Database,
              color: "emerald"
            },
            { 
              number: liveStats.researchPapers.toLocaleString(), 
              label: "Research Papers",
              icon: FileText,
              color: "blue"
            },
            { 
              number: `${liveStats.accuracyRate}%`, 
              label: "AI Accuracy Rate",
              icon: Target,
              color: "purple"
            },
            { 
              number: `${liveStats.analysisTime}s`, 
              label: "Analysis Time",
              icon: Zap,
              color: "cyan"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <motion.div 
                className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works - Futuristic Timeline */}
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
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Three simple steps to unlock the power of AI nutrition analysis
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 transform -translate-x-1/2" />
          
          {[
            {
              step: "01",
              title: "Scan",
              description: "Take a photo or upload an image of any food label",
              icon: Camera,
              color: "emerald"
            },
            {
              step: "02", 
              title: "Analyze",
              description: "Our AI analyzes ingredients against 10,000+ research papers",
              icon: Brain,
              color: "teal"
            },
            {
              step: "03",
              title: "Insight", 
              description: "Receive personalized health scores and recommendations",
              icon: Heart,
              color: "cyan"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${step.color}-100 dark:bg-${step.color}-900/20 rounded-full text-sm font-medium text-${step.color}-700 dark:text-${step.color}-300 mb-4`}>
                    <span className="w-2 h-2 bg-current rounded-full" />
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${step.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                    </div>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </motion.div>
              </div>
              
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white dark:bg-slate-800 rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg">
                <step.icon className="w-8 h-8 text-emerald-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Science & Credibility Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Backed by Science, Built for You
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Trusted by healthcare professionals and nutrition experts worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "PubMed", description: "Medical Research Database", icon: Database },
            { name: "NIH", description: "National Institutes of Health", icon: Microscope },
            { name: "WHO", description: "World Health Organization", icon: Globe }
          ].map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <partner.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {partner.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Health Insights Preview */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your Health Dashboard, Reimagined
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Visualize your nutrition. Own your data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Health Score Trend</h3>
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">87/100</div>
              <p className="text-sm text-slate-600 dark:text-slate-300">↑ 12% this week</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sodium Intake</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">↓ 12%</div>
              <p className="text-sm text-slate-600 dark:text-slate-300">This week</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Suggestion</h3>
              </div>
              <div className="text-lg font-semibold text-purple-600 mb-2">Increase fiber</div>
              <p className="text-sm text-slate-600 dark:text-slate-300">🍎 Add an apple tomorrow</p>
            </motion.div>
          </div>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-1 mb-4 justify-center">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <Quote className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
            <p className="text-lg text-slate-600 dark:text-slate-300 italic mb-6 text-center">
              "{testimonials[currentTestimonial].content}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-2xl">{testimonials[currentTestimonial].avatar}</div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get Started Free — Upgrade Anytime
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Choose the plan that fits your health journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              price: "$0",
              scans: "50 scans",
              features: ["Basic analysis", "Health scores", "Ingredient detection"],
              color: "slate",
              popular: false
            },
            {
              name: "Pro",
              price: "$5",
              scans: "Unlimited scans",
              features: ["Everything in Free", "Health insights", "Trend analysis", "Export data"],
              color: "emerald",
              popular: true
            },
            {
              name: "Expert",
              price: "$12",
              scans: "Everything in Pro",
              features: ["AI meal planning", "Family sharing", "Priority support", "Custom reports"],
              color: "purple",
              popular: false
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-2 border-emerald-400' 
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}<span className="text-lg">/mo</span></div>
                <p className="text-sm opacity-80">{plan.scans}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-white text-emerald-600 hover:bg-gray-100'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
              }`}>
                {plan.name === "Free" ? "Get Started" : "Upgrade Now"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] rounded-3xl shadow-lg"
        >
          <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl px-10 py-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Your Food, Your Data, Your Power
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
                  Get Started (Free)
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-emerald-300 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
              >
                View Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">NutriSight</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Built with ❤️ and AI for better human health.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Research</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}

export default PremiumHomepage