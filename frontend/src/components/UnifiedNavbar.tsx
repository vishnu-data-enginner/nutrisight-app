import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, User, Settings, Brain, Sun, Moon } from 'lucide-react'

interface UnifiedNavbarProps {
  user: any
  isDarkMode: boolean
  toggleTheme: () => void
}

const UnifiedNavbar: React.FC<UnifiedNavbarProps> = ({ user, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Add your Supabase sign-out logic here
      // await supabase.auth.signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-semibold">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="text-3xl"
        >
          🥑
        </motion.div>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">NutriSight</span>
      </Link>

      {/* Center Emoji Row */}
      <motion.div
        className="hidden md:flex gap-2 text-xl opacity-60"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0 }}
        >
          🍅
        </motion.span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.2 }}
        >
          🥕
        </motion.span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.4 }}
        >
          🫐
        </motion.span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.6 }}
        >
          🍋
        </motion.span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.8 }}
        >
          🥦
        </motion.span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        >
          🍎
        </motion.span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1.2 }}
        >
          🫒
        </motion.span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1.4 }}
        >
          🍓
        </motion.span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1.6 }}
        >
          🍊
        </motion.span>
      </motion.div>

      {/* Right Side: Authenticated User */}
      {user ? (
        <div className="flex items-center gap-5">
          <Link 
            to="/dashboard" 
            className="font-medium hover:text-emerald-500 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center gap-1 hover:text-emerald-500 transition-colors duration-300"
          >
            <User className="w-4 h-4" /> Profile
          </Link>
          <Link 
            to="/settings" 
            className="flex items-center gap-1 hover:text-emerald-500 transition-colors duration-300"
          >
            <Settings className="w-4 h-4" /> Settings
          </Link>
          
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
          </motion.button>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full flex items-center gap-1 hover:opacity-90 transition-opacity duration-300"
          >
            <LogOut className="w-4 h-4" /> Logout
          </motion.button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="font-medium hover:text-emerald-500 transition-colors duration-300"
          >
            Sign In
          </Link>
          <motion.button
            onClick={() => navigate('/upgraded-signup')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity duration-300 flex items-center gap-2"
          >
            <Brain className="w-4 h-4" /> Get Started
          </motion.button>
        </div>
      )}
    </nav>
  )
}

export default UnifiedNavbar
