import React from 'react'
import { motion } from 'framer-motion'

const SimpleFloatingVeggies: React.FC = () => {
  return (
    <div 
      className="pointer-events-none" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Avocado - Top Left */}
      <motion.div
        className="absolute text-6xl"
        style={{ left: '5%', top: '15%' }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        🥑
      </motion.div>

      {/* Lemon - Top Right */}
      <motion.div
        className="absolute text-5xl"
        style={{ left: '85%', top: '20%' }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "linear",
          delay: 0.5
        }}
      >
        🍋
      </motion.div>

      {/* Pepper - Top Center */}
      <motion.div
        className="absolute text-4xl"
        style={{ left: '25%', top: '10%' }}
        animate={{ 
          x: [0, 20, -20, 0],
          y: [0, -15, 10, 0],
          rotate: [0, 12, -12, 0]
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.5
        }}
      >
        🌶️
      </motion.div>

      {/* Broccoli - Left Side */}
      <motion.div
        className="absolute text-5xl"
        style={{ left: '8%', top: '35%' }}
        animate={{ 
          y: [0, -25, 0],
          x: [0, 10, -10, 0],
          rotate: [0, 8, -8, 0]
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        🥦
      </motion.div>

      {/* Tomato - Right Side */}
      <motion.div
        className="absolute text-4xl"
        style={{ left: '88%', top: '45%' }}
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
      >
        🍅
      </motion.div>

      {/* Carrot - Center Right */}
      <motion.div
        className="absolute text-4xl"
        style={{ left: '75%', top: '55%' }}
        animate={{ 
          x: [0, 15, -15, 0],
          y: [0, -10, 5, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      >
        🥕
      </motion.div>

      {/* Lettuce - Center Left */}
      <motion.div
        className="absolute text-4xl"
        style={{ left: '12%', top: '65%' }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 11, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      >
        🥬
      </motion.div>

      {/* Olive - Bottom Right */}
      <motion.div
        className="absolute text-3xl"
        style={{ left: '82%', top: '70%' }}
        animate={{ 
          y: [0, -12, 0],
          x: [0, 8, -8, 0],
          rotate: [0, 6, -6, 0]
        }}
        transition={{ 
          duration: 13, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4
        }}
      >
        🫒
      </motion.div>
    </div>
  )
}

export default SimpleFloatingVeggies
