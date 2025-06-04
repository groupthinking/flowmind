import { useState } from 'react';

export default function RemixWithAI({ flow, onRemix }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRemix() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/remix-ai', {
        method: 'POST',
        body: JSON.stringify({ flow, prompt }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.remixedFlow) {
        onRemix(data.remixedFlow);
      } else {
        setError(data.error || 'AI failed to remix flow!');
      }
    } catch (e) {
      setError('Something went wrong');
    }
    setLoading(false);
  }

  return (
    <div className="p-4 border rounded bg-white mt-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Describe the changes you want (e.g. 'Add a Slack step')"
      />
      <button className="bg-purple-700 text-white px-4 py-2 rounded" onClick={handleRemix} disabled={loading || !prompt}>
        {loading ? 'Remixing...' : 'Remix with AI'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}