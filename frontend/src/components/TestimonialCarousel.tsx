import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Heart, TrendingUp, Shield } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  metric: string
  avatar: string
  rating: number
  verified: boolean
}

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Health Coach',
      quote: 'AI detected 3 unhealthy additives I never noticed. Changed my shopping forever.',
      metric: '+23% Health Score',
      avatar: '👩‍⚕️',
      rating: 5,
      verified: true
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      role: 'Fitness Enthusiast',
      quote: 'Finally understand what I\'m eating. The insights are absolutely game-changing.',
      metric: '15 Products Scanned',
      avatar: '💪',
      rating: 5,
      verified: true
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      role: 'Nutritionist',
      quote: 'Research-backed analysis helps my clients make informed decisions with confidence.',
      metric: '98% Accuracy',
      avatar: '👩‍🔬',
      rating: 5,
      verified: true
    },
    {
      id: '4',
      name: 'Alex Thompson',
      role: 'Parent',
      quote: 'Peace of mind knowing exactly what my kids are consuming. Worth every penny.',
      metric: '50+ Products Analyzed',
      avatar: '👨‍👩‍👧‍👦',
      rating: 5,
      verified: true
    },
    {
      id: '5',
      name: 'Maria Garcia',
      role: 'Wellness Blogger',
      quote: 'The personalized insights based on my health goals are incredibly accurate.',
      metric: '85% Goal Alignment',
      avatar: '📱',
      rating: 5,
      verified: true
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            See how NutriSight is transforming lives and making nutrition make sense
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-3xl p-8 shadow-lg"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 text-center mb-8 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-4xl">{currentTestimonial.avatar}</div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">{currentTestimonial.name}</h3>
                  {currentTestimonial.verified && (
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{currentTestimonial.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Metric */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{currentTestimonial.metric}</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-600" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-emerald-500 scale-125'
                      : 'bg-gray-300 hover:bg-emerald-300'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-emerald-600" />
            </motion.button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                isAutoPlaying
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">250K+</div>
            <div className="text-gray-600">Products Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
