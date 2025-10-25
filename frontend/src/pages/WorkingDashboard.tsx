import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const WorkingDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        console.log('🔍 Fetching real data for dashboard...');
        
        // Use the exact same approach as the bypass test that works
        const { data: allProfiles, error } = await supabase
          .from('profiles')
          .select('*');

        console.log('📊 All profiles:', allProfiles, error);

        if (allProfiles && allProfiles.length > 0) {
          // Find your specific user
          const yourProfile = allProfiles.find(p => p.email === 'anjana.swapna@gmail.com');
          
          if (yourProfile) {
            const scansUsed = yourProfile.scans_used || 0;
            const freeScans = Math.max(50 - scansUsed, 0);
            const goalProgress = Math.round((scansUsed / 50) * 100);

            console.log('✅ Found your profile:', yourProfile);
            
            setUserData({
              username: yourProfile.name,
              total_scans: scansUsed,
              free_scans: freeScans,
              average_health_score: 0, // No health score data yet
              goal_progress: goalProgress,
              isProUser: false,
              shouldShowUpgradePrompt: freeScans <= 5
            });
          }
        }
      } catch (error) {
        console.error('💥 Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300">
                <span className="text-2xl">🧠</span>
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              NutriSight
            </span>
          </motion.div>

          {/* AI Status */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-200 dark:border-emerald-700">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI Active</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Your Dashboard, {userData?.username || 'User'} 👋
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Your AI-powered nutrition insights await.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Scans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Total Scans</h3>
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {userData?.total_scans || 0}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Products analyzed</p>
            </div>
          </motion.div>

          {/* Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Health Score</h3>
                <span className="text-2xl">💚</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {userData?.average_health_score || 0}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Average score</p>
            </div>
          </motion.div>

          {/* Free Scans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Free Scans</h3>
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {userData?.free_scans || 50}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Scans remaining</p>
            </div>
          </motion.div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Goal Progress</h3>
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {userData?.goal_progress || 0}%
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Health Goal</p>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl">📸</span>
            Scan New Product
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl">👑</span>
            Upgrade to Pro
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📊</span>
            View History
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkingDashboard;
