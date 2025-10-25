import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings, Menu, X, User, LogIn, LogOut, Shield } from "lucide-react";
import NutriSightLogo from "./NutriSightLogo";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    if (user) {
      checkUserRole();
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

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/research", label: "Scan" },
    { path: "/database", label: "Database" },
    { path: "/pricing", label: "Pricing" },
    ...(userRole === 'admin' ? [{ path: "/admin", label: "Admin" }] : [])
  ];
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="group">
            <NutriSightLogo size={40} className="transition-transform group-hover:scale-105" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <button 
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.path) 
                      ? "bg-emerald-100 text-emerald-700 font-semibold shadow-sm" 
                      : "hover:bg-emerald-50 hover:text-emerald-600 text-gray-600"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <img
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=10b981&color=fff`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100">
            <nav className="container mx-auto px-6 py-4 space-y-2">
          {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.path) 
                        ? "bg-emerald-100 text-emerald-700 font-semibold" 
                        : "hover:bg-emerald-50 hover:text-emerald-600 text-gray-600"
                }`}
              >
                {link.label}
                  </button>
            </Link>
          ))}
              <div className="pt-4 border-t border-emerald-100 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200">
                    Get Started
                  </button>
                </Link>
              </div>
        </nav>
      </div>
        )}
    </header>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Header;
