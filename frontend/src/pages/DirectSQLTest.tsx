import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const DirectSQLTest: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testDirectSQL = async () => {
      try {
        console.log('🔍 Testing direct SQL query...');
        
        // Try direct SQL query to bypass RLS
        const { data, error } = await supabase
          .rpc('get_all_profiles');

        console.log('📊 Direct SQL result:', data, error);

        if (error) {
          // If RPC doesn't exist, try raw SQL
          console.log('🔄 RPC failed, trying raw SQL...');
          const { data: rawData, error: rawError } = await supabase
            .from('profiles')
            .select('*');
          
          console.log('📊 Raw SQL result:', rawData, rawError);
          setResult({ data: rawData, error: rawError, method: 'raw' });
        } else {
          setResult({ data, error, method: 'rpc' });
        }
      } catch (err: any) {
        console.error('💥 Error:', err);
        setResult({ data: null, error: err.message, method: 'error' });
      } finally {
        setLoading(false);
      }
    };

    testDirectSQL();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Testing direct SQL...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔧 Direct SQL Test
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            📊 SQL Test Results
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Method: {result?.method}</h3>
              <h3 className="font-semibold mb-2">Data Count: {result?.data?.length || 0}</h3>
              <pre className="text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>

          {result?.data && result.data.length > 0 ? (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
                ✅ SQL Query Working!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Found {result.data.length} profiles. RLS is disabled or bypassed.
              </p>
            </div>
          ) : (
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                ❌ SQL Query Failed
              </h3>
              <p className="text-red-700 dark:text-red-300">
                RLS is still enabled or there's a connection issue.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Try these SQL commands in Supabase:</h4>
                <pre className="bg-slate-100 dark:bg-slate-700 p-3 rounded text-sm">
{`-- Option 1: Disable RLS completely
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Option 2: Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Option 3: Create permissive policy
CREATE POLICY "Allow all access" ON profiles FOR ALL USING (true);`}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DirectSQLTest;
