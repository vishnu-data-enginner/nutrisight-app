import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

interface GradientCTAProps {
  title: string
  subtitle: string
  buttonText: string
  onButtonClick?: () => void
  features?: string[]
}

const GradientCTA: React.FC<GradientCTAProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  features = []
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Gradient Border */}
          <div className="rounded-[40px] bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-500 p-[2px] shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            <div className="bg-white/90 backdrop-blur-sm rounded-[40px] py-16 px-8 text-center relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-cyan-600/5 to-teal-500/5 rounded-[40px]" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                >
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Ready to Transform Your Health?</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  {subtitle}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onButtonClick}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  {buttonText}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                {features.length > 0 && (
                  <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default GradientCTA


