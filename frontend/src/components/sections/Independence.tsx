import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, DollarSign } from 'lucide-react'

const Independence: React.FC = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Brand Influence",
      description: "No brand can pay to alter scores or recommendations. Our AI analyzes ingredients objectively based on scientific research.",
      color: "text-emerald-400"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "No Ads",
      description: "We never sell placements in the app. Your experience is focused purely on your health, not advertising revenue.",
      color: "text-cyan-400"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Responsible Funding",
      description: "Pro plans support research and keep us objective. We're funded by users who value transparency, not by food companies.",
      color: "text-purple-400"
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
          <h2 className="text-4xl font-bold text-white mb-4">Independence You Can Trust</h2>
          <p className="text-gray-400 text-lg">No ads, no pay-to-play, no brand influence</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className={`${value.color} mb-6 flex justify-center`}>
                {value.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">100% Transparent</h3>
            <p className="text-gray-300 text-lg mb-6">
              We believe nutrition information should be unbiased, science-based, and accessible to everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
                No Brand Sponsorships
              </div>
              <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                No Data Selling
              </div>
              <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
                Open Source Research
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Independence
