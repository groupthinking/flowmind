import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { getFlowById } from '../../utils/flowApi';
import { supabase } from '../../utils/supabaseClient';

export default function ExploreFlow() {
  const router = useRouter();
  const { flowId } = router.query;
  const [flow, setFlow] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlow() {
      if (!flowId || typeof flowId !== 'string') return;
      setLoading(true);
      // This is a public page: fetch by id, not user
      const { data, error } = await supabase
        .from('flows')
        .select('id, name, data, is_public, user_id')
        .eq('id', flowId)
        .single();
      if (error || !data?.is_public) {
        setError('This flow is not public or does not exist.');
        setFlow(null);
      } else {
        setFlow(data);
      }
      setLoading(false);
    }
    fetchFlow();
  }, [flowId]);

  if (loading) return <div className="flex items-center justify-center h-[80vh] text-xl">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-[80vh] text-red-500">{error}</div>;
  if (!flow) return null;

  // Readonly: don’t allow editing or saving
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">{flow.name}</h1>
        <p className="mb-4 text-sm text-gray-500">Public Flow • Shareable Link</p>
        <div className="w-full h-[600px] bg-white rounded-xl shadow-lg border">
          <ReactFlow
            nodes={flow.data?.nodes ?? []}
            edges={flow.data?.edges ?? []}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag
            zoomOnScroll
            panOnScroll
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-bold"
            onClick={async () => {
              // "Remix" the flow into the user's account (if logged in)
              if (typeof window !== 'undefined') {
                window.location.href = `/builder?remix=${flow.id}`;
              }
            }}
          >
            Remix This Flow
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}