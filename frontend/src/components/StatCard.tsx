import React from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  color: 'emerald' | 'cyan' | 'blue' | 'rose' | 'amber' | 'violet'
  cta?: string
  onClick?: () => void
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color, 
  cta, 
  onClick 
}) => {
  const colorClasses = {
    emerald: {
      border: 'border-emerald-100',
      text: 'text-emerald-600',
      bg: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
      hover: 'hover:shadow-emerald-100'
    },
    cyan: {
      border: 'border-cyan-100',
      text: 'text-cyan-600',
      bg: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
      hover: 'hover:shadow-cyan-100'
    },
    blue: {
      border: 'border-blue-100',
      text: 'text-blue-600',
      bg: 'bg-gradient-to-r from-blue-400 to-blue-600',
      hover: 'hover:shadow-blue-100'
    },
    rose: {
      border: 'border-rose-100',
      text: 'text-rose-600',
      bg: 'bg-gradient-to-r from-rose-400 to-rose-600',
      hover: 'hover:shadow-rose-100'
    },
    amber: {
      border: 'border-amber-100',
      text: 'text-amber-600',
      bg: 'bg-gradient-to-r from-amber-400 to-amber-600',
      hover: 'hover:shadow-amber-100'
    },
    violet: {
      border: 'border-violet-100',
      text: 'text-violet-600',
      bg: 'bg-gradient-to-r from-violet-400 to-violet-600',
      hover: 'hover:shadow-violet-100'
    }
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 ${classes.border} ${classes.hover}`}
    >
      <h3 className="text-gray-700 font-semibold text-sm mb-1">{title}</h3>
      <p className={`${classes.text} text-3xl font-bold mb-1`}>{value}</p>
      <p className="text-gray-500 text-sm mb-3">{subtitle}</p>
      {cta && (
        <button 
          onClick={onClick}
          className={`mt-3 px-4 py-2 ${classes.bg} text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200`}
        >
          {cta}
        </button>
      )}
    </motion.div>
  )
}

export default StatCard


