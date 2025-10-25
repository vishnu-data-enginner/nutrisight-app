import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FloatingFruits: React.FC = () => {
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const fruits = [
    { emoji: '🥑', top: '10%', left: '5%', size: 'text-4xl', glow: true },
    { emoji: '🍅', top: '25%', right: '10%', size: 'text-3xl', glow: false },
    { emoji: '🍋', top: '15%', right: '25%', size: 'text-3xl', glow: false },
    { emoji: '🥕', bottom: '20%', left: '10%', size: 'text-4xl', glow: false },
    { emoji: '🍓', bottom: '10%', right: '15%', size: 'text-3xl', glow: true },
    { emoji: '🥦', top: '40%', left: '30%', size: 'text-4xl', glow: false },
    { emoji: '🍊', bottom: '15%', right: '35%', size: 'text-3xl', glow: false },
    { emoji: '🫐', top: '60%', left: '20%', size: 'text-2xl', glow: false },
    { emoji: '🍎', top: '70%', right: '25%', size: 'text-3xl', glow: true },
    { emoji: '🥬', top: '80%', left: '15%', size: 'text-2xl', glow: false }
  ]

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      style={{
        background: isDark
          ? "radial-gradient(circle at center, rgba(15,25,40,0.4), transparent 80%)"
          : "radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 85%)",
      }}
    >
      {fruits.map((fruit, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${fruit.size} will-change-transform transition-all duration-700 ${
            isDark
              ? `opacity-80 saturate-75 ${fruit.glow ? 'drop-shadow-[0_0_6px_rgba(0,255,160,0.25)]' : ''}`
              : 'opacity-95 saturate-125'
          }`}
          style={{
            top: fruit.top,
            left: fruit.left,
            right: fruit.right,
            bottom: fruit.bottom,
          }}
          initial={{
            opacity: 0,
            y: idx % 2 === 0 ? 40 : -40, // alternate directions
            scale: 0.8,
            rotate: idx % 2 === 0 ? -15 : 15
          }}
          animate={{
            opacity: 1,
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            delay: idx * 0.25, // gentle stagger
            duration: 12 + idx * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { delay: idx * 0.15, type: "spring", stiffness: 40 },
          }}
        >
          {fruit.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingFruits
