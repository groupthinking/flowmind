import { useEffect, useState } from 'react';
import { likeFlow, unlikeFlow, getFlowLikes, userLiked, getUserProfile } from '../utils/socialApi';
import { useSupabaseAuth } from '../utils/useSupabaseAuth';

export default function FlowCard({ flow }) {
  const { user } = useSupabaseAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getFlowLikes(flow.id).then(setLikes);
    if (user) userLiked(flow.id, user).then(setLiked);
    getUserProfile(flow.user_id).then(setProfile);
  }, [flow.id, flow.user_id, user]);

  async function handleLike() {
    if (liked) {
      await unlikeFlow(flow.id, user);
      setLiked(false);
      setLikes((l) => l - 1);
    } else {
      await likeFlow(flow.id, user);
      setLiked(true);
      setLikes((l) => l + 1);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow group hover:shadow-xl transition border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <img src={profile?.avatar_url || '/default-avatar.png'} className="w-7 h-7 rounded-full" />
        <a href={`/user/${flow.user_id}`} className="font-semibold text-blue-700 hover:underline">
          {profile?.display_name || (profile?.email?.split('@')[0] ?? 'User')}
        </a>
      </div>
      <a href={`/explore/${flow.id}`}>
        <h2 className="font-bold text-xl text-blue-800 group-hover:underline">{flow.name}</h2>
      </a>
      {/* ...other card content... */}
      <div className="flex gap-3 items-center mt-3">
        <button
          className={`flex items-center px-2 py-1 rounded ${liked ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-400'}`}
          disabled={!user}
          onClick={handleLike}
        >
          👍 {likes}
        </button>
        {/* ...comment count, remix, share... */}
      </div>
    </div>
  );
}