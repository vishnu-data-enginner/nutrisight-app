import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Sparkles } from 'lucide-react'

const BottomCta: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/10 via-teal-400/5 to-cyan-400/10 rounded-full blur-[200px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-indigo-400/10 rounded-full blur-[150px] bottom-[-100px] right-[-100px]" />
      </div>

      {/* Floating Fruits */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {['🥑', '🍅', '🥕', '🫐', '🍋', '🥦', '🍎', '🫒', '🍓', '🍊'].map((fruit, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${10 + (index * 8)}%`,
              top: `${20 + (index % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {fruit}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Health Journey Free
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-6">
            Start Your Health Journey Free
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands making smarter choices with AI-powered insights. Get your first 50 scans on us—no card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Search className="w-5 h-5" />
              Scan Your First Product
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/upgraded-signup')}
              className="px-8 py-4 border border-gray-600 hover:border-emerald-400 text-white hover:text-emerald-400 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Get 50 Free Scans
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              AI-Powered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Research-Backed
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BottomCta
