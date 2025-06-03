import { useSupabaseAuth } from '../utils/useSupabaseAuth';
import { updateUserProfile } from '../utils/socialApi';
import { useState } from 'react';

export default function WelcomePage() {
  const { user } = useSupabaseAuth();
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [invited, setInvited] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    await updateUserProfile(user, { display_name: displayName, avatar_url: avatarUrl });
    window.location.href = '/explore';
  }

  function handleInvite() {
    navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${user.id}`);
    setInvited(true);
  }

  return (
    <form className="max-w-md mx-auto py-8" onSubmit={handleSave}>
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <label>Display Name</label>
      <input className="border w-full px-3 py-2 mb-4" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
      <label>Avatar URL</label>
      <input className="border w-full px-3 py-2 mb-4" value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} />
      <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4" type="submit">Save & Start</button>
      <hr className="my-4"/>
      <div>
        <p className="mb-2">Want to build with friends?</p>
        <button type="button" onClick={handleInvite} className="bg-green-600 text-white px-4 py-2 rounded">{invited ? 'Invite Link Copied!' : 'Copy Invite Link'}</button>
      </div>
    </form>
  );
}