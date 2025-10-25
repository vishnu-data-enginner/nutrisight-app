import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  Download, 
  Share2, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

interface Scan {
  id: string
  product: string
  score: number
  status: 'excellent' | 'good' | 'moderate' | 'poor'
  date: string
  ingredients: string[]
  insights: string[]
}

const ModernDashboardTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const scans: Scan[] = [
    {
      id: '1',
      product: 'Organic Greek Yogurt',
      score: 92,
      status: 'excellent',
      date: '2024-01-15',
      ingredients: ['Organic Milk', 'Live Cultures', 'Natural Vanilla'],
      insights: ['High protein', 'Probiotics', 'No additives']
    },
    {
      id: '2',
      product: 'Energy Drink',
      score: 45,
      status: 'poor',
      date: '2024-01-14',
      ingredients: ['Caffeine', 'Sugar', 'Artificial Colors', 'Preservatives'],
      insights: ['High sugar', 'Artificial additives', 'Energy crash risk']
    },
    {
      id: '3',
      product: 'Whole Grain Bread',
      score: 78,
      status: 'good',
      date: '2024-01-13',
      ingredients: ['Whole Wheat', 'Seeds', 'Natural Yeast'],
      insights: ['High fiber', 'Natural ingredients', 'Good for digestion']
    },
    {
      id: '4',
      product: 'Protein Bar',
      score: 65,
      status: 'moderate',
      date: '2024-01-12',
      ingredients: ['Whey Protein', 'Dates', 'Nuts', 'Natural Sweeteners'],
      insights: ['Good protein', 'Natural sugars', 'Moderate processing']
    }
  ]

  const getStatusConfig = (status: string) => {
    const configs = {
      excellent: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle, label: 'Excellent' },
      good: { color: 'text-blue-600', bg: 'bg-blue-50', icon: TrendingUp, label: 'Good' },
      moderate: { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock, label: 'Moderate' },
      poor: { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle, label: 'Poor' }
    }
    return configs[status as keyof typeof configs] || configs.moderate
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-amber-600'
    return 'text-red-600'
  }

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const toggleAllSelection = () => {
    if (selectedRows.length === scans.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(scans.map(scan => scan.id))
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Recent Scans</h2>
            <p className="text-gray-600 mt-1">Your latest product analyses</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === scans.length}
                  onChange={toggleAllSelection}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Score</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Insights</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {scans.map((scan, index) => {
              const statusConfig = getStatusConfig(scan.status)
              const StatusIcon = statusConfig.icon
              const isSelected = selectedRows.includes(scan.id)

              return (
                <motion.tr
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    isSelected ? 'bg-emerald-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(scan.id)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {scan.product.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{scan.product}</div>
                        <div className="text-sm text-gray-500">{scan.ingredients.length} ingredients</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-2xl font-bold ${getScoreColor(scan.score)}`}>
                      {scan.score}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(scan.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {scan.insights.slice(0, 2).map((insight, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {insight}
                        </span>
                      ))}
                      {scan.insights.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{scan.insights.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedRows.length > 0 ? (
              <span>{selectedRows.length} of {scans.length} selected</span>
            ) : (
              <span>{scans.length} total scans</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 bg-emerald-500 text-white rounded-lg text-sm font-medium">1</button>
              <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">2</button>
              <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">3</button>
            </div>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernDashboardTable
