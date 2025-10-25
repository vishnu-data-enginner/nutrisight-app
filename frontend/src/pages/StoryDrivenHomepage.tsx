import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Brain, Search, Shield, Users, Star, CheckCircle, ArrowRight, Sparkles, Zap, Target, Heart, TrendingUp, User, Settings, LogOut, ChevronDown, Sun, Moon } from 'lucide-react'
import { useUser } from '../hooks/useUser'
import { supabase } from '../utils/supabaseClient'
import IngredientImpact from '../components/sections/IngredientImpact'
import ResearchBacked from '../components/sections/ResearchBacked'
import IngredientSearch from '../components/sections/IngredientSearch'
import StatsStrip from '../components/sections/StatsStrip'
import Testimonials from '../components/sections/Testimonials'
import Independence from '../components/sections/Independence'
import BottomCta from '../components/sections/BottomCta'

const StoryDrivenHomepage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-emerald-400/10 via-teal-400/5 to-cyan-400/10 rounded-full blur-[200px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-indigo-400/10 rounded-full blur-[150px] bottom-[-150px] right-[-150px]" />
      </div>

      {/* Floating Fruits */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {['🥑', '🍅', '🥕', '🫐', '🍋', '🥦', '🍎', '🫒', '🍓', '🍊'].map((fruit, index) => (
          <motion.div
            key={`fruit-${index}`}
            className="absolute text-5xl opacity-50"
            style={{
              left: `${10 + (index * 8)}%`,
              top: `${20 + (index % 3) * 25}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + (index * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            {fruit}
          </motion.div>
        ))}
      </div>

      {/* Theme Toggle - Top Right */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-500" />
        )}
      </motion.button>

      {/* User Profile Dropdown - Top Right */}
      {user && (
        <div className="fixed top-6 right-20 z-50">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-slate-900 dark:text-white font-medium">
                {user.email?.split('@')[0] || 'User'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </motion.button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="p-2">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Brain className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-300">Dashboard</span>
                  </button>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-300">Profile</span>
                  </button>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-300">Settings</span>
                  </button>
                  <hr className="my-2 border-slate-200 dark:border-slate-700" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 dark:text-red-400">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* 1️⃣ Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 overflow-hidden">
        {/* Floating fruit animations background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-cyan-400/10 rounded-full blur-[180px] top-[-150px] left-[-100px]"
            animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-pink-400/10 via-purple-400/10 to-indigo-400/10 rounded-full blur-[120px] bottom-[-100px] right-[-80px]"
            animate={{ x: [0, -40, 40, 0], y: [0, -30, 30, 0] }}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          />
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white"
        >
          Understand Your Food.<br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Improve Your Life.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300"
        >
          Your <span className="text-emerald-500 font-semibold">nutrition scientist</span> in your pocket.  
          Get instant, AI-verified health insights from any food label — anywhere.
        </motion.p>

        {/* Unified CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-lg px-10 py-4 rounded-full shadow-lg flex items-center gap-3 font-semibold"
          >
            <Brain className="w-5 h-5" /> 
            Scan a Product — Try 50 Free Scans
          </motion.button>
        </motion.div>

      </section>

      {/* Ingredient Impact Section */}
      <IngredientImpact />

      {/* Research Backed Section */}
      <ResearchBacked />

      {/* Ingredient Search Section */}
      <IngredientSearch />

      {/* Stats Strip Section */}
      <StatsStrip />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Independence Section */}
      <Independence />

      {/* Bottom CTA Section */}
      <BottomCta />

      {/* 9️⃣ Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Independence</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">X</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-gray-400">
            <p>© 2025 NutriSight Inc. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default StoryDrivenHomepage
