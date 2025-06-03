import { useEffect, useState } from 'react';
import { likeFlow, unlikeFlow, getFlowLikes, userLiked, getUserProfile } from '../utils/socialApi';
import { useSupabaseAuth } from '../utils/useSupabaseAuth';

export default function LikeButton({ flowId, flowOwnerId }: { flowId: string; flowOwnerId: string }) {
  const { user } = useSupabaseAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getFlowLikes(flowId).then(setLikes);
    if (user) userLiked(flowId, user).then(setLiked);
  }, [user, flowId]);

  async function handleLike() {
    if (!user) return alert('Log in to like!');
    if (liked) {
      await unlikeFlow(flowId, user);
      setLiked(false);
      setLikes((l) => l - 1);
    } else {
      await likeFlow(flowId, user, flowOwnerId);
      setLiked(true);
      setLikes((l) => l + 1);
    }
  }

  return (
    <button
      className={`flex items-center gap-1 px-2 py-1 rounded ${liked ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}
      onClick={handleLike}
      disabled={!user}
    >
      <span>👍</span>
      <span>{likes}</span>
    </button>
  );
}