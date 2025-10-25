import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const TestRealData: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        console.log('🔍 Fetching real Supabase data...');
        
        // Get ALL profiles to see what's actually in the database
        const { data: allProfiles, error: allError } = await supabase
          .from('profiles')
          .select('*');

        console.log('📊 All profiles in database:', allProfiles, allError);

        // Try to find the specific user
        const profileData = allProfiles?.find(p => p.email === 'anjana.swapna@gmail.com');
        console.log('🔍 Found profile:', profileData);


        if (profileData) {
          const scansUsed = profileData.scans_used || 0;
          const freeScans = Math.max(50 - scansUsed, 0);
          const goalProgress = Math.round((scansUsed / 50) * 100);

          setUserData({
            username: profileData.name,
            email: profileData.email,
            total_scans: scansUsed,
            free_scans: freeScans,
            goal_progress: goalProgress,
            plan: profileData.plan,
            scans_used: profileData.scans_used
          });
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
        <div className="text-2xl">Loading real data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🎯 Real Supabase Data Test
        </h1>

        {userData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              ✅ Real Data from Supabase
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Username</h3>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{userData.username}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Email</h3>
                <p className="text-lg text-blue-900 dark:text-blue-100">{userData.email}</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">Total Scans</h3>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{userData.total_scans}</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">From scans_used column</p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">Free Scans</h3>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{userData.free_scans}</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">50 - {userData.scans_used} = {userData.free_scans}</p>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-200 mb-2">Goal Progress</h3>
                <p className="text-3xl font-bold text-pink-900 dark:text-pink-100">{userData.goal_progress}%</p>
                <p className="text-sm text-pink-700 dark:text-pink-300">{userData.scans_used}/50 scans used</p>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-200 mb-2">Plan</h3>
                <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100 capitalize">{userData.plan}</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Raw Supabase Data:</h3>
              <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-auto">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-red-600 dark:text-red-400">
            ❌ No data found in Supabase
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRealData;
