import React from 'react'
import { motion } from 'framer-motion'

interface FloatingVeggieProps {
  emoji: string
  size: number
  initialX: number
  initialY: number
  duration: number
  delay?: number
}

const FloatingVeggie: React.FC<FloatingVeggieProps> = ({
  emoji,
  size,
  initialX,
  initialY,
  duration,
  delay = 0
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        fontSize: `${size}px`,
        filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.25))'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [0.8, 1.1, 0.8],
        x: [0, 20, -20, 0],
        y: [0, -15, 10, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {emoji}
    </motion.div>
  )
}

const FloatingVeggies: React.FC = () => {
  const veggies = [
    { emoji: '🥑', size: 60, x: 10, y: 20, duration: 12 },
    { emoji: '🥕', size: 50, x: 85, y: 70, duration: 15 },
    { emoji: '🥬', size: 45, x: 15, y: 80, duration: 10 },
    { emoji: '🍋', size: 40, x: 80, y: 15, duration: 14 },
    { emoji: '🫒', size: 35, x: 70, y: 60, duration: 11 },
    { emoji: '🥦', size: 55, x: 5, y: 50, duration: 13 },
    { emoji: '🍅', size: 42, x: 90, y: 40, duration: 9 },
    { emoji: '🌶️', size: 38, x: 25, y: 10, duration: 16 }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {veggies.map((veggie, index) => (
        <FloatingVeggie
          key={index}
          emoji={veggie.emoji}
          size={veggie.size}
          initialX={veggie.x}
          initialY={veggie.y}
          duration={veggie.duration}
          delay={index * 0.5}
        />
      ))}
    </div>
  )
}

export default FloatingVeggies


