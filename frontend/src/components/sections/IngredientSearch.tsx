import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, AlertTriangle, X } from 'lucide-react'

const IngredientSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const ingredients = [
    {
      name: "Aspartame",
      what: "Low-calorie artificial sweetener",
      impact: "caution",
      impactText: "May cause headaches and GI issues in sensitive users",
      alternatives: ["Stevia", "Monk fruit", "Erythritol"]
    },
    {
      name: "Erythritol",
      what: "Sugar alcohol sweetener",
      impact: "caution",
      impactText: "May cause GI upset in large amounts",
      alternatives: ["Allulose", "Stevia", "Monk fruit"]
    },
    {
      name: "TBHQ",
      what: "Synthetic antioxidant preservative",
      impact: "bad",
      impactText: "High amounts may be harmful; prefer natural alternatives",
      alternatives: ["Rosemary extract", "Vitamin E", "Natural antioxidants"]
    },
    {
      name: "BHT",
      what: "Synthetic preservative",
      impact: "caution",
      impactText: "Some studies suggest potential health concerns",
      alternatives: ["Natural preservatives", "No BHT products", "Fresh alternatives"]
    },
    {
      name: "MSG",
      what: "Flavor enhancer",
      impact: "good",
      impactText: "Generally recognized as safe by FDA",
      alternatives: ["Natural umami", "Mushroom powder", "Seaweed"]
    },
    {
      name: "Carrageenan",
      what: "Natural thickener from seaweed",
      impact: "caution",
      impactText: "May cause GI irritation in sensitive individuals",
      alternatives: ["Guar gum", "Xanthan gum", "Agar"]
    }
  ]

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleIngredientSelect = (ingredient: any) => {
    setSelectedIngredient(ingredient)
    setSearchTerm(ingredient.name)
    setShowSuggestions(false)
  }

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Search Any Ingredient</h2>
          <p className="text-gray-400 text-lg">Clear, science-based explanations and safer swaps</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
        >
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search ingredients (e.g., aspartame, erythritol, TBHQ)"
                className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {showSuggestions && filteredIngredients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-lg z-10"
              >
                {filteredIngredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => handleIngredientSelect(ingredient)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="text-white font-medium">{ingredient.name}</div>
                    <div className="text-gray-400 text-sm">{ingredient.what}</div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {selectedIngredient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedIngredient.name}</h3>
                <button
                  onClick={() => {
                    setSelectedIngredient(null)
                    setSearchTerm('')
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">What it is:</h4>
                <p className="text-gray-300">{selectedIngredient.what}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">Health impact:</h4>
                <div className="flex items-center gap-2 mb-2">
                  {selectedIngredient.impact === 'good' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : selectedIngredient.impact === 'caution' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  ) : (
                    <X className="w-5 h-5 text-rose-400" />
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedIngredient.impact === 'good'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : selectedIngredient.impact === 'caution'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {selectedIngredient.impact === 'good' ? 'Generally Safe' : 
                     selectedIngredient.impact === 'caution' ? 'Use Caution' : 'Limit Intake'}
                  </span>
                </div>
                <p className="text-gray-300">{selectedIngredient.impactText}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Safer alternatives:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredient.alternatives.map((alt: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-sm"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default IngredientSearch
