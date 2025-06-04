import { useEffect, useState } from 'react';
import { getFlowComments, addFlowComment, getUserProfile } from '../utils/socialApi';
import { useSupabaseAuth } from '../utils/useSupabaseAuth';

export default function FlowComments({ flowId, flowOwnerId }: { flowId: string; flowOwnerId: string }) {
  const { user } = useSupabaseAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [body, setBody] = useState('');
  const [profiles, setProfiles] = useState<{ [id: string]: any }>({});

  useEffect(() => {
    getFlowComments(flowId).then(async (c) => {
      setComments(c);
      // Batch fetch unique user profiles
      const ids = [...new Set(c.map((cm) => cm.user_id))];
      const ps: any = {};
      for (const id of ids) {
        ps[id] = await getUserProfile(id);
      }
      setProfiles(ps);
    });
  }, [flowId]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!body.trim()) return;
    await addFlowComment(flowId, user, body, flowOwnerId);
    setBody('');
    getFlowComments(flowId).then(setComments);
  }

  return (
    <section className="mt-8">
      <h3 className="font-bold mb-2 text-lg">Comments</h3>
      {user && (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Add a comment..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <button className="bg-blue-700 text-white px-3 py-2 rounded" type="submit">Post</button>
        </form>
      )}
      <ul className="space-y-3">
        {comments.map((cm) => (
          <li key={cm.id} className="bg-gray-50 rounded p-3 flex gap-2 items-start">
            <img src={profiles[cm.user_id]?.avatar_url || '/default-avatar.png'} className="w-6 h-6 rounded-full mt-1" />
            <div>
              <div className="text-xs font-semibold text-blue-700">
                <a href={`/user/${cm.user_id}`}>{profiles[cm.user_id]?.display_name || 'User'}</a>
                <span className="ml-2 text-gray-400">{new Date(cm.created_at).toLocaleString()}</span>
              </div>
              <div className="text-sm">{cm.body}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}