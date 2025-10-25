import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const BypassRLSTest: React.FC = () => {
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        console.log('🔍 Fetching ALL profiles to bypass RLS...');
        
        // Try to get all profiles without filtering
        const { data, error } = await supabase
          .from('profiles')
          .select('*');

        console.log('📊 All profiles result:', data, error);

        if (error) {
          setError(`Database Error: ${error.message} (Code: ${error.code})`);
        } else {
          setAllProfiles(data || []);
        }
      } catch (err: any) {
        console.error('💥 Error fetching profiles:', err);
        setError(`Connection Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔓 Bypass RLS Test
        </h1>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800"
          >
            <h2 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-200">
              ❌ Database Access Error
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
            <div className="bg-red-100 dark:bg-red-800/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🔧 How to Fix:</h3>
              <ol className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>1. Go to your Supabase Dashboard</li>
                <li>2. Navigate to Authentication → Policies</li>
                <li>3. Find the "profiles" table</li>
                <li>4. Disable Row Level Security (RLS)</li>
                <li>5. Or run the SQL script: <code>ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;</code></li>
              </ol>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              ✅ Found {allProfiles.length} Profiles
            </h2>
            
            {allProfiles.length > 0 ? (
              <div className="space-y-6">
                {allProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      profile.email === 'anjana.swapna@gmail.com' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700' 
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {profile.name || 'Unknown User'}
                        {profile.email === 'anjana.swapna@gmail.com' && (
                          <span className="ml-2 text-sm bg-emerald-500 text-white px-2 py-1 rounded-full">
                            👑 Your Account
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Email</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{profile.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Scans Used</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.scans_used || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Free Scans</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.max(50 - (profile.scans_used || 0), 0)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Plan</div>
                        <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 capitalize">{profile.plan || 'free'}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-600 dark:text-slate-400 py-8">
                No profiles found in database
              </div>
            )}

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                🎯 Dashboard Should Show:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {allProfiles.find(p => p.email === 'anjana.swapna@gmail.com')?.scans_used || 0}
                  </div>
                  <div className="text-blue-700 dark:text-blue-300">Total Scans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {Math.max(50 - (allProfiles.find(p => p.email === 'anjana.swapna@gmail.com')?.scans_used || 0), 0)}
                  </div>
                  <div className="text-green-700 dark:text-green-300">Free Scans</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round(((allProfiles.find(p => p.email === 'anjana.swapna@gmail.com')?.scans_used || 0) / 50) * 100)}%
                  </div>
                  <div className="text-purple-700 dark:text-purple-300">Goal Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {allProfiles.find(p => p.email === 'anjana.swapna@gmail.com')?.name || 'User'}
                  </div>
                  <div className="text-orange-700 dark:text-orange-300">Username</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BypassRLSTest;
