import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ingredient {
  name: string
  impact: string
  risk: 'low' | 'medium' | 'high'
  icon: string
  color: string
  description: string
}

const IngredientVisualization = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const ingredients: Ingredient[] = [
    {
      name: 'Sugar',
      impact: 'Spikes glucose levels',
      risk: 'high',
      icon: '🍯',
      color: 'from-red-400 to-pink-400',
      description: 'High sugar intake can lead to insulin resistance, weight gain, and increased risk of diabetes.'
    },
    {
      name: 'Sodium',
      impact: 'Affects heart health',
      risk: 'medium',
      icon: '🧂',
      color: 'from-yellow-400 to-orange-400',
      description: 'Excessive sodium can raise blood pressure and increase risk of heart disease and stroke.'
    },
    {
      name: 'Preservatives',
      impact: 'May cause inflammation',
      risk: 'high',
      icon: '🧪',
      color: 'from-purple-400 to-indigo-400',
      description: 'Artificial preservatives may trigger inflammatory responses and allergic reactions in sensitive individuals.'
    },
    {
      name: 'Fiber',
      impact: 'Supports digestion',
      risk: 'low',
      icon: '🌾',
      color: 'from-green-400 to-emerald-400',
      description: 'Dietary fiber promotes healthy digestion, regulates blood sugar, and supports heart health.'
    },
    {
      name: 'Antioxidants',
      impact: 'Fights free radicals',
      risk: 'low',
      icon: '🫐',
      color: 'from-blue-400 to-cyan-400',
      description: 'Antioxidants help protect cells from damage and may reduce risk of chronic diseases.'
    },
    {
      name: 'Trans Fats',
      impact: 'Raises bad cholesterol',
      risk: 'high',
      icon: '⚠️',
      color: 'from-red-500 to-red-600',
      description: 'Trans fats increase LDL cholesterol and decrease HDL cholesterol, significantly raising heart disease risk.'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See What's Really in Your Food
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI reveals the hidden impact of every ingredient on your health
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedIngredient(ingredient)}
              className={`relative rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
                hoveredIndex === index ? 'border-emerald-300' : 'border-transparent'
              } ${getRiskColor(ingredient.risk)}`}
            >
              {/* 3D Effect */}
              <motion.div
                animate={{
                  rotateY: hoveredIndex === index ? 10 : 0,
                  rotateX: hoveredIndex === index ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="text-4xl mb-3 transform-gpu">{ingredient.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{ingredient.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{ingredient.impact}</p>
              </motion.div>
              
              {/* Risk indicator with glow */}
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.2 : 1,
                  boxShadow: hoveredIndex === index ? '0 0 20px rgba(34, 197, 94, 0.5)' : 'none'
                }}
                className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  ingredient.risk === 'high' ? 'bg-red-500' :
                  ingredient.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              />

              {/* Hover glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                className={`absolute inset-0 bg-gradient-to-r ${ingredient.color} rounded-3xl`}
              />
            </motion.div>
          ))}
        </div>

        {/* Detailed Ingredient Modal */}
        <AnimatePresence>
          {selectedIngredient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedIngredient(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{selectedIngredient.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedIngredient.name}
                  </h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getRiskColor(selectedIngredient.risk)}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      selectedIngredient.risk === 'high' ? 'bg-red-500' :
                      selectedIngredient.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    {selectedIngredient.risk.toUpperCase()} RISK
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedIngredient.description}
                  </p>
                  <button
                    onClick={() => setSelectedIngredient(null)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { label: 'Ingredients Analyzed', value: '10,000+', icon: '🔬' },
            { label: 'Health Risks Detected', value: '500+', icon: '⚠️' },
            { label: 'Research Papers', value: '50,000+', icon: '📚' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-white/20"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default IngredientVisualization


