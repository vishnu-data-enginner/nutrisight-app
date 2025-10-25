import React from 'react'
import { motion } from 'framer-motion'

const IngredientImpact: React.FC = () => {
  const ingredients = [
    {
      emoji: "🍭",
      name: "Sugar",
      impact: "Spikes glucose; limit for metabolic health.",
      status: "bad",
      color: "border-rose-500 bg-rose-500/10"
    },
    {
      emoji: "🧂",
      name: "Sodium",
      impact: "High intake stresses heart health; watch daily totals.",
      status: "caution",
      color: "border-amber-400 bg-amber-400/10"
    },
    {
      emoji: "🧪",
      name: "Preservatives",
      impact: "Some linked to inflammation; prefer fewer additives.",
      status: "bad",
      color: "border-rose-500 bg-rose-500/10"
    },
    {
      emoji: "🥦",
      name: "Fiber",
      impact: "Supports digestion and a healthy microbiome.",
      status: "good",
      color: "border-emerald-400 bg-emerald-400/10"
    },
    {
      emoji: "🛡️",
      name: "Antioxidants",
      impact: "Help combat oxidative stress.",
      status: "good",
      color: "border-emerald-400 bg-emerald-400/10"
    },
    {
      emoji: "⚠️",
      name: "Trans Fats",
      impact: "Raise LDL; avoid when possible.",
      status: "bad",
      color: "border-rose-500 bg-rose-500/10"
    }
  ]

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">See What's Really in Your Food</h2>
          <p className="text-gray-400 text-lg">Our AI highlights ingredients that help—or harm—your health</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${ingredient.color} hover:shadow-lg hover:shadow-emerald-500/20`}
            >
              <div className="text-4xl mb-4">{ingredient.emoji}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{ingredient.name}</h3>
              <p className="text-gray-300 text-sm">{ingredient.impact}</p>
              <div className="mt-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  ingredient.status === 'good' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : ingredient.status === 'caution'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {ingredient.status === 'good' ? 'Good for you' : 
                   ingredient.status === 'caution' ? 'Use caution' : 'Limit intake'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IngredientImpact
