import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FloatingProduceBackground: React.FC = () => {
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

  const produceItems = [
    { emoji: '🥑', size: 'text-4xl', x: '5%', y: '15%', delay: 0, glow: true },
    { emoji: '🍅', size: 'text-3xl', x: '85%', y: '20%', delay: 0.5, glow: false },
    { emoji: '🥕', size: 'text-3xl', x: '15%', y: '70%', delay: 1, glow: false },
    { emoji: '🫐', size: 'text-2xl', x: '75%', y: '60%', delay: 1.5, glow: false },
    { emoji: '🍋', size: 'text-3xl', x: '10%', y: '40%', delay: 2, glow: false },
    { emoji: '🥦', size: 'text-4xl', x: '90%', y: '80%', delay: 2.5, glow: false },
    { emoji: '🍎', size: 'text-3xl', x: '50%', y: '10%', delay: 3, glow: true },
    { emoji: '🫒', size: 'text-2xl', x: '30%', y: '85%', delay: 3.5, glow: false },
    { emoji: '🍓', size: 'text-3xl', x: '70%', y: '40%', delay: 4, glow: true },
    { emoji: '🍊', size: 'text-3xl', x: '20%', y: '50%', delay: 4.5, glow: false }
  ]

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: isDark
          ? "radial-gradient(circle at center, rgba(15,25,40,0.4), transparent 80%)"
          : "radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 85%)",
      }}
    >
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-cyan-900/20" />
      
      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Floating produce items with entry animations */}
      {produceItems.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} will-change-transform transition-all duration-700 ${
            isDark
              ? `opacity-80 saturate-75 ${item.glow ? 'drop-shadow-[0_0_6px_rgba(0,255,160,0.25)]' : ''}`
              : 'opacity-95 saturate-125'
          }`}
          style={{
            left: item.x,
            top: item.y,
          }}
          initial={{
            opacity: 0,
            y: index % 2 === 0 ? 40 : -40, // alternate directions
            scale: 0.8,
            rotate: index % 2 === 0 ? -15 : 15
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{
            delay: index * 0.25, // gentle stagger
            duration: 12 + index * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { delay: index * 0.15, type: "spring", stiffness: 40 },
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
      
      {/* Enhanced floating particles with theme adaptation */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className={`absolute w-1 h-1 rounded-full transition-all duration-700 ${
            isDark 
              ? 'bg-emerald-400/40 drop-shadow-[0_0_4px_rgba(0,255,160,0.3)]' 
              : 'bg-emerald-500/60'
          }`}
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + (index % 3) * 25}%`,
            willChange: 'transform'
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 20
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            delay: index * 0.3,
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingProduceBackground