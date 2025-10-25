import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const DashboardTest: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Supabase connection from dashboard...');
        
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*');

        console.log('📊 Profiles result:', profiles, error);

        if (profiles && profiles.length > 0) {
          const yourProfile = profiles.find(p => p.email === 'anjana.swapna@gmail.com');
          setData({
            allProfiles: profiles,
            yourProfile: yourProfile,
            error: error
          });
        } else {
          setData({
            allProfiles: [],
            yourProfile: null,
            error: error
          });
        }
      } catch (err: any) {
        console.error('💥 Error:', err);
        setData({
          allProfiles: [],
          yourProfile: null,
          error: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Testing Supabase connection...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔧 Dashboard Supabase Test
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            📊 Supabase Connection Test
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">All Profiles Found: {data?.allProfiles?.length || 0}</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(data?.allProfiles, null, 2)}
              </pre>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Your Profile:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(data?.yourProfile, null, 2)}
              </pre>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Error:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(data?.error, null, 2)}
              </pre>
            </div>
          </div>

          {data?.yourProfile && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                ✅ Your Real Data:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{data.yourProfile.scans_used}</div>
                  <div className="text-green-700 dark:text-green-300">Total Scans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{50 - data.yourProfile.scans_used}</div>
                  <div className="text-green-700 dark:text-green-300">Free Scans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{Math.round((data.yourProfile.scans_used / 50) * 100)}%</div>
                  <div className="text-green-700 dark:text-green-300">Goal Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{data.yourProfile.name}</div>
                  <div className="text-green-700 dark:text-green-300">Username</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardTest;
