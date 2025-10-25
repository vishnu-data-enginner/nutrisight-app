import React from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
  delay?: number
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative bg-white/50 backdrop-blur-lg rounded-3xl p-6 shadow-lg 
        border border-white/30 transition-all duration-300
        ${glow ? 'shadow-[0_0_40px_rgba(16,185,129,0.15)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
      
      {/* Subtle glow effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl" />
      )}
    </motion.div>
  )
}

export default GlassCard