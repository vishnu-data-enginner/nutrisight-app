import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const ForceRefreshDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Force refreshing dashboard data...');
        
        // Force fetch with timestamp to avoid cache
        const { data: allProfiles, error } = await supabase
          .from('profiles')
          .select('*')
          .gte('created_at', '2020-01-01'); // Force fresh query

        console.log('📊 Fresh profiles data:', allProfiles, error);

        if (error) {
          setError(`Database Error: ${error.message}`);
          return;
        }

        if (allProfiles && allProfiles.length > 0) {
          const yourProfile = allProfiles.find(p => p.email === 'anjana.swapna@gmail.com');
          
          if (yourProfile) {
            const scansUsed = yourProfile.scans_used || 0;
            const freeScans = Math.max(50 - scansUsed, 0);
            const goalProgress = Math.round((scansUsed / 50) * 100);

            console.log('✅ Your profile data:', {
              scansUsed,
              freeScans,
              goalProgress,
              shouldUpgrade: freeScans <= 5
            });
            
            setUserData({
              username: yourProfile.name,
              total_scans: scansUsed,
              free_scans: freeScans,
              average_health_score: 0,
              goal_progress: goalProgress,
              isProUser: false,
              shouldShowUpgradePrompt: freeScans <= 5
            });
          } else {
            setError('Profile not found for anjana.swapna@gmail.com');
          }
        } else {
          setError('No profiles found in database');
        }
      } catch (err: any) {
        console.error('💥 Error:', err);
        setError(`Connection Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Force refreshing data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔄 Force Refresh Dashboard
        </h1>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-200">
              ❌ Error
            </h2>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </motion.div>
        ) : userData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              ✅ Dashboard Data (Force Refreshed)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Username</h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userData.username}</div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Total Scans</h3>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userData.total_scans}</div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Free Scans</h3>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{userData.free_scans}</div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl text-center">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Goal Progress</h3>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userData.goal_progress}%</div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                🎯 Dashboard Should Show:
              </h3>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <div><strong>Username:</strong> {userData.username}</div>
                <div><strong>Total Scans:</strong> {userData.total_scans}</div>
                <div><strong>Free Scans:</strong> {userData.free_scans}</div>
                <div><strong>Goal Progress:</strong> {userData.goal_progress}%</div>
                <div><strong>Should Show Upgrade:</strong> {userData.shouldShowUpgradePrompt ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No data found
          </div>
        )}
      </div>
    </div>
  );
};

export default ForceRefreshDashboard;
