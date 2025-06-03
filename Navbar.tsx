import { useState } from 'react';
import { useSupabaseAuth } from '../utils/useSupabaseAuth';
import AuthModal from './AuthModal';
import { supabase } from '../utils/supabaseClient';

export default function Navbar() {
  const { user, loading } = useSupabaseAuth();
  const [showAuth, setShowAuth] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/assets/logo.svg" alt="FlowMind Logo" className="h-8" />
        <span className="text-2xl font-bold text-blue-700">FlowMind</span>
      </div>
      <div>
        {loading ? (
          <span className="text-gray-400">...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="font-bold text-blue-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-blue-700 transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            className="text-gray-600 hover:text-blue-700 transition"
            onClick={() => setShowAuth(true)}
          >
            Log In
          </button>
        )}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </nav>
  );
}