import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Search, Shield, CheckCircle } from 'lucide-react'

const ResearchBacked: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "OCR & Parse",
      subtitle: "99.2% OCR accuracy",
      bullets: [
        "High-accuracy text recognition",
        "Multi-language support",
        "Instant extraction"
      ],
      progress: 99
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Research Match",
      subtitle: "10,000+ studies analyzed",
      bullets: [
        "Cross-references peer-reviewed studies",
        "Detects harmful patterns",
        "Explains the why"
      ],
      progress: 95
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Clinical Scoring",
      subtitle: "Personalized risk models",
      bullets: [
        "Goal-aware risk models",
        "Personalized to your profile",
        "Clear recommendations"
      ],
      progress: 98
    }
  ]

  return (
    <section className="py-20 px-6 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Science-Driven Nutrition Intelligence</h2>
          <p className="text-gray-400 text-lg">Advanced AI meets clinical research to turn labels into health clarity</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="text-emerald-400 mb-6 flex justify-center">{step.icon}</div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-emerald-400 font-semibold mb-6">{step.subtitle}</p>
              
              <ul className="space-y-3 mb-6">
                {step.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Confidence</span>
                  <span>{step.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${step.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResearchBacked
