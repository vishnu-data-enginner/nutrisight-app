import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  Users, 
  TrendingUp, 
  Crown, 
  Shield, 
  BarChart3,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: string;
  role: string;
  scans_used: number;
  onboarding_completed: boolean;
  created_at: string;
}

interface AdminStats {
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  totalScans: number;
  newUsersToday: number;
}

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    freeUsers: 0,
    proUsers: 0,
    totalScans: 0,
    newUsersToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    if (user) {
      checkUserRole();
      loadAdminData();
    }
  }, [user]);

  const checkUserRole = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    setUserRole(data?.role || 'user');
  };

  const loadAdminData = async () => {
    try {
      // Load all users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      setUsers(usersData || []);

      // Calculate stats
      const totalUsers = usersData?.length || 0;
      const freeUsers = usersData?.filter(u => u.plan === 'free').length || 0;
      const proUsers = usersData?.filter(u => u.plan === 'pro' || u.plan === 'yearly').length || 0;
      const totalScans = usersData?.reduce((sum, u) => sum + (u.scans_used || 0), 0) || 0;
      
      const today = new Date().toISOString().split('T')[0];
      const newUsersToday = usersData?.filter(u => 
        u.created_at.startsWith(today)
      ).length || 0;

      setStats({
        totalUsers,
        freeUsers,
        proUsers,
        totalScans,
        newUsersToday
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserPlan = async (userId: string, newPlan: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan: newPlan })
        .eq('id', userId);

      if (error) throw error;

      // Reload data
      loadAdminData();
    } catch (error) {
      console.error('Error updating user plan:', error);
    }
  };

  const resetUserScans = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ scans_used: 0 })
        .eq('id', userId);

      if (error) throw error;

      // Reload data
      loadAdminData();
    } catch (error) {
      console.error('Error resetting user scans:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage users, plans, and monitor platform health
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
          <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.newUsersToday}</h3>
                <p className="text-sm text-gray-600">New Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.freeUsers}</h3>
                <p className="text-sm text-gray-600">Free Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.proUsers}</h3>
                <p className="text-sm text-gray-600">Pro Users</p>
              </div>
            </div>
        </div>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalScans}</h3>
                <p className="text-sm text-gray-600">Total Scans</p>
              </div>
                  </div>
                </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <button
              onClick={loadAdminData}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Scans Used</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Onboarding</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name || user.email}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.plan === 'free' ? 'bg-gray-100 text-gray-700' :
                        user.plan === 'pro' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{user.scans_used || 0}</span>
                    </td>
                    <td className="py-3 px-4">
                      {user.onboarding_completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={user.plan}
                          onChange={(e) => updateUserPlan(user.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="yearly">Yearly</option>
                        </select>
                        <button
                          onClick={() => resetUserScans(user.id)}
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition-colors"
                        >
                          Reset Scans
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;


