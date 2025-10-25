import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const InsertTestData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const insertTestData = async () => {
    setLoading(true);
    try {
      console.log('🔧 Inserting test data into profiles table...');
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: 'c77c38e6-8f2b-468a-b861-01e25733b6b9',
          email: 'anjana.swapna@gmail.com',
          name: 'anjana.swapna',
          plan: 'free',
          scans_used: 25,
          created_at: new Date().toISOString()
        })
        .select();

      console.log('📊 Insert result:', data, error);
      setResult({ data, error });
    } catch (err) {
      console.error('💥 Error inserting data:', err);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🔧 Insert Test Data
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Insert Your Test Data
          </h2>
          
          <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Data to Insert:</h3>
            <pre className="text-sm text-slate-700 dark:text-slate-300">
{`{
  id: 'c77c38e6-8f2b-468a-b861-01e25733b6b9',
  email: 'anjana.swapna@gmail.com',
  name: 'anjana.swapna',
  plan: 'free',
  scans_used: 25
}`}
            </pre>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={insertTestData}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : null}
            {loading ? 'Inserting...' : '🔧 Insert Test Data'}
          </motion.button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg"
              style={{
                backgroundColor: result.error ? '#fef2f2' : '#f0fdf4',
                borderColor: result.error ? '#fecaca' : '#bbf7d0'
              }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {result.error ? '❌ Error' : '✅ Success'}
              </h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </motion.div>
          )}

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Next Steps:
            </h3>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>1. Click "Insert Test Data" above</li>
              <li>2. Go to <a href="/test-real-data" className="underline">/test-real-data</a> to verify</li>
              <li>3. Go to <a href="/dashboard" className="underline">/dashboard</a> to see real data</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InsertTestData;
