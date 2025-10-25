import React from 'react'
import { motion } from 'framer-motion'

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Health Coach",
      avatar: "👩‍⚕️",
      quote: "Detected 3 unhealthy additives in my usual snacks. Completely changed my shopping habits.",
      stat: "+23% Health Score",
      products: "15 Products",
      accuracy: "98% Accuracy"
    },
    {
      name: "Mike Rodriguez",
      role: "Fitness Enthusiast",
      avatar: "👨‍💪",
      quote: "Finally understand what I'm eating. Personalized insights are game-changing.",
      stat: "250+ Scans",
      products: "45 Products",
      accuracy: "99% Accuracy"
    },
    {
      name: "Dr. Emily Watson",
      role: "Nutritionist",
      avatar: "👩‍🔬",
      quote: "Research-backed analysis helps clients decide with confidence. Essential tool for my practice.",
      stat: "500+ Clients",
      products: "200+ Products",
      accuracy: "97% Accuracy"
    }
  ]

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-400 text-lg">Real stories from health-conscious people worldwide</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              
              <blockquote className="text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mb-6">
                <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                <div className="text-emerald-400 font-medium">{testimonial.role}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="text-emerald-400 font-bold text-sm">{testimonial.stat}</div>
                  <div className="text-gray-400 text-xs">Health Score</div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <div className="text-cyan-400 font-bold text-sm">{testimonial.products}</div>
                  <div className="text-gray-400 text-xs">Scanned</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <div className="text-purple-400 font-bold text-sm">{testimonial.accuracy}</div>
                  <div className="text-gray-400 text-xs">Accuracy</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
