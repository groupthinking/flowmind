import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FlowBuilder from '../components/FlowBuilder';
import { supabase } from '../utils/supabaseClient';

export default function Builder() {
  const router = useRouter();
  const remixId = typeof router.query.remix === 'string' ? router.query.remix : undefined;

  // Pass initialNodes/edges to FlowBuilder if remix param exists
  const [remixFlow, setRemixFlow] = React.useState<{ nodes: any[]; edges: any[] } | null>(null);

  useEffect(() => {
    async function loadRemix() {
      if (remixId) {
        const { data, error } = await supabase
          .from('flows')
          .select('data')
          .eq('id', remixId)
          .eq('is_public', true)
          .single();
        if (data && data.data) {
          setRemixFlow({ nodes: data.data.nodes ?? [], edges: data.data.edges ?? [] });
        }
      }
    }
    loadRemix();
    // Only load when remixId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remixId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <FlowBuilder
            initialNodes={remixFlow ? remixFlow.nodes : undefined}
            initialEdges={remixFlow ? remixFlow.edges : undefined}
          />
        </main>
      </div>
    </div>
  );
}