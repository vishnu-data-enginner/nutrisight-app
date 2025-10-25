import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const TestSupabaseData: React.FC = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [scansData, setScansData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching ALL data from Supabase...');
        
        // Get all users
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*');

        console.log('👥 Users data:', users, usersError);

        // Get all user scans
        const { data: scans, error: scansError } = await supabase
          .from('user_scans')
          .select('*');

        console.log('📊 Scans data:', scans, scansError);

        setUsersData(users || []);
        setScansData(scans || []);
      } catch (error) {
        console.error('💥 Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading Supabase data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔍 Supabase Database Contents
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              👥 Users Table ({usersData.length} records)
            </h2>
            
            {usersData.length > 0 ? (
              <div className="space-y-4">
                {usersData.map((user, index) => (
                  <div key={user.id || index} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>ID:</strong> {user.id}</div>
                      <div><strong>Email:</strong> {user.email}</div>
                      <div><strong>Username:</strong> {user.username}</div>
                      <div><strong>Free Scans:</strong> {user.free_scans}</div>
                      <div><strong>Total Scans:</strong> {user.total_scans}</div>
                      <div><strong>Health Score:</strong> {user.average_health_score}</div>
                      <div><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-red-600 dark:text-red-400 py-8">
                ❌ No users found in database
              </div>
            )}
          </motion.div>

          {/* User Scans Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              📊 User Scans Table ({scansData.length} records)
            </h2>
            
            {scansData.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {scansData.map((scan, index) => (
                  <div key={scan.id || index} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>ID:</strong> {scan.id}</div>
                      <div><strong>User ID:</strong> {scan.user_id}</div>
                      <div><strong>Health Score:</strong> {scan.health_score}</div>
                      <div><strong>Created:</strong> {new Date(scan.created_at).toLocaleDateString()}</div>
                      <div className="col-span-2">
                        <strong>Ingredients:</strong> {JSON.stringify(scan.detected_ingredients)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-red-600 dark:text-red-400 py-8">
                ❌ No scans found in database
              </div>
            )}
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">
            📋 Database Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{usersData.length}</div>
              <div className="text-blue-700 dark:text-blue-300">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{scansData.length}</div>
              <div className="text-green-700 dark:text-green-300">Total Scans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {usersData.reduce((sum, user) => sum + (user.total_scans || 0), 0)}
              </div>
              <div className="text-purple-700 dark:text-purple-300">Scans Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {usersData.reduce((sum, user) => sum + (user.free_scans || 0), 0)}
              </div>
              <div className="text-orange-700 dark:text-orange-300">Free Scans Left</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestSupabaseData;
