import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="font-bold text-2xl mb-4 text-blue-700">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-3">
          <input
            required
            type="email"
            placeholder="you@email.com"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="••••••••"
            className="border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-700 text-white rounded py-2 font-semibold hover:bg-blue-800"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <button className="text-xs text-blue-600 mt-3" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>×</button>
      </div>
    </div>
  );
}