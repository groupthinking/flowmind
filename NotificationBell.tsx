import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useSupabaseAuth } from '../utils/useSupabaseAuth';

export default function NotificationBell() {
  const { user } = useSupabaseAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false)
      .then(({ count }) => setCount(count || 0));
  }, [user]);

  return (
    <a href="/notifications" className="relative">
      <span role="img" aria-label="notifications">🔔</span>
      {count > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">{count}</span>}
    </a>
  );
}