import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../utils/socialApi';
import { getFlowsFromCloud } from '../../utils/flowApi';

export default function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [profile, setProfile] = useState<any>(null);
  const [flows, setFlows] = useState<any[]>([]);

  useEffect(() => {
    if (userId && typeof userId === 'string') {
      getUserProfile(userId).then(setProfile);
      getFlowsFromCloud({ id: userId }).then(setFlows);
    }
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <img src={profile.avatar_url || '/default-avatar.png'} className="w-16 h-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold text-blue-800">{profile.display_name || 'User'}</h1>
          <div className="text-gray-400">{profile.email}</div>
        </div>
      </div>
      <h2 className="font-bold text-lg mb-2">Public Flows</h2>
      <ul className="space-y-4">
        {flows.filter(f => f.is_public).map(flow => (
          <li key={flow.id}>
            <a className="font-semibold text-blue-700 hover:underline" href={`/explore/${flow.id}`}>{flow.name}</a>
            <span className="ml-2 text-xs text-gray-400">{new Date(flow.updated_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}