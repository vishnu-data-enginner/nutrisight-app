import React from 'react'
import FloatingProduceBackground from '../components/FloatingProduceBackground'

const TestAnimations: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Test the floating background directly */}
      <FloatingProduceBackground />
      
      {/* Content to show the animations are behind */}
      <div className="relative z-20 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Testing Floating Animations</h1>
        <p className="text-center text-lg mb-8">You should see floating fruits and vegetables in the background</p>
        
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Animation Test</h2>
          <p className="mb-4">This page tests the FloatingProduceBackground component directly.</p>
          <p className="mb-4">You should see:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Floating fruits and vegetables (🥑🍅🥕🫐🍋🥦🍎🫒🍓🍊🥬🌶️)</li>
            <li>Parallax motion when you move your mouse</li>
            <li>Gentle floating animations</li>
            <li>Floating particles</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestAnimations
