import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Zap, Sparkles, Shield, Brain, Globe, CheckCircle, ArrowRight } from 'lucide-react'

const PremiumHero: React.FC = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left - rect.width / 2)
    mouseY.set(event.clientY - rect.top - rect.height / 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white relative overflow-hidden">
      {/* Animated Gradient Shimmer */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'linear-gradient(45deg, #D1FAE5, #E0F2FE, #FFFFFF)',
            'linear-gradient(135deg, #E0F2FE, #D1FAE5, #FFFFFF)',
            'linear-gradient(225deg, #FFFFFF, #E0F2FE, #D1FAE5)',
            'linear-gradient(315deg, #D1FAE5, #FFFFFF, #E0F2FE)',
            'linear-gradient(45deg, #D1FAE5, #E0F2FE, #FFFFFF)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* AI Particles Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Fruits & Vegetables with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        onMouseMove={handleMouseMove}
      >
        {/* Avocado - Top Left */}
        <motion.div
          className="absolute text-6xl opacity-80"
          style={{ 
            left: '5%', 
            top: '15%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🥑
        </motion.div>

        {/* Lemon - Top Right */}
        <motion.div
          className="absolute text-5xl opacity-80"
          style={{ 
            left: '85%', 
            top: '20%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear",
            delay: 0.5
          }}
        >
          🍋
        </motion.div>

        {/* Broccoli - Left Side */}
        <motion.div
          className="absolute text-5xl opacity-80"
          style={{ 
            left: '8%', 
            top: '35%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -25, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          🥦
        </motion.div>

        {/* Tomato - Right Side */}
        <motion.div
          className="absolute text-4xl opacity-80"
          style={{ 
            left: '88%', 
            top: '45%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
        >
          🍅
        </motion.div>

        {/* Carrot - Center Right */}
        <motion.div
          className="absolute text-4xl opacity-80"
          style={{ 
            left: '75%', 
            top: '55%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            x: [0, 15, -15, 0],
            y: [0, -10, 5, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          🥕
        </motion.div>

        {/* Lettuce - Center Left */}
        <motion.div
          className="absolute text-4xl opacity-80"
          style={{ 
            left: '12%', 
            top: '65%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          🥬
        </motion.div>

        {/* Pepper - Top Center */}
        <motion.div
          className="absolute text-3xl opacity-80"
          style={{ 
            left: '25%', 
            top: '10%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            x: [0, 20, -20, 0],
            y: [0, -15, 10, 0],
            rotate: [0, 12, -12, 0]
          }}
          transition={{ 
            duration: 11, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          🌶️
        </motion.div>

        {/* Olive - Bottom Right */}
        <motion.div
          className="absolute text-3xl opacity-80"
          style={{ 
            left: '82%', 
            top: '70%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -12, 0],
            x: [0, 8, -8, 0],
            rotate: [0, 6, -6, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        >
          🫒
        </motion.div>

        {/* Apple - Bottom Left */}
        <motion.div
          className="absolute text-5xl opacity-80"
          style={{ 
            left: '15%', 
            top: '75%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.8
          }}
        >
          🍎
        </motion.div>

        {/* Banana - Center */}
        <motion.div
          className="absolute text-4xl opacity-80"
          style={{ 
            left: '50%', 
            top: '40%',
            rotateX,
            rotateY,
            transformPerspective: 1000
          }}
          animate={{ 
            y: [0, -22, 0],
            x: [0, 12, -12, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3.2
          }}
        >
          🍌
        </motion.div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-transparent to-emerald-100/20 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center pt-20 pb-16"
        >
          {/* AI Badge with Glowing Border */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-lg border border-emerald-100 rounded-full px-6 py-3 mb-8 shadow-lg relative overflow-hidden"
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  'linear-gradient(45deg, #10B981, #0EA5E9)',
                  'linear-gradient(135deg, #0EA5E9, #10B981)',
                  'linear-gradient(225deg, #10B981, #0EA5E9)',
                  'linear-gradient(315deg, #0EA5E9, #10B981)',
                  'linear-gradient(45deg, #10B981, #0EA5E9)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ 
                padding: '1px',
                background: 'linear-gradient(45deg, #10B981, #0EA5E9)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor'
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-5 w-5 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-medium text-slate-700">AI-Powered Nutrition Intelligence</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Understand Your Food.
            <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              Improve Your Life.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            Scan any label and get AI-verified, clinically backed nutrition insights — instantly.
          </motion.p>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-slate-500 mb-8 flex items-center justify-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Trusted by health-conscious users in 20+ countries
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <Link to="/login">
                <motion.button
                  whileHover={{ 
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                    background: 'linear-gradient(135deg, #10B981, #0EA5E9)'
                  }}
                  className="group relative bg-gradient-to-r from-emerald-600 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Camera className="h-5 w-5" />
                    </motion.div>
                    Scan a Product
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-sky-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <p className="text-xs text-slate-500 mt-2 text-center">No login required • Instant results in 3s</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/upgraded-signup">
                <motion.button
                  whileHover={{ 
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)',
                    borderColor: '#10B981'
                  }}
                  className="group bg-white/80 backdrop-blur-sm text-emerald-600 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Try 50 Free Scans
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center items-center gap-4 text-sm"
          >
            {[
              { icon: Shield, text: 'HIPAA Compliant', color: 'emerald' },
              { icon: Brain, text: 'AI-Powered', color: 'sky' },
              { icon: CheckCircle, text: 'Research-Backed', color: 'emerald' },
              { icon: Sparkles, text: 'Personalized for You', color: 'purple' },
              { icon: CheckCircle, text: 'Clinically Validated', color: 'blue' },
              { icon: Shield, text: '100% Private', color: 'green' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-lg border border-${badge.color}-100 rounded-full text-slate-600 hover:shadow-lg transition-all duration-300`}
              >
                <badge.icon className={`h-4 w-4 text-${badge.color}-600`} />
                <span className="text-sm font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scientific Scan Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-6 bg-gradient-to-b from-emerald-400 to-transparent mx-auto"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-sm text-slate-500 mt-2 tracking-wide"
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default PremiumHero
