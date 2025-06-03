// ...other imports
import { setFlowPublicity, getPublicFlows, remixFlow } from '../utils/flowApi';

export default function CloudFlowManager({ nodes, edges, setNodes, setEdges }) {
  // ...existing state/hooks
  const [publicFlows, setPublicFlows] = useState<any[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (show) {
      getPublicFlows().then(setPublicFlows).catch(console.error);
    }
  }, [show]);

  // ...existing handleSave
  async function handleSave() {
    setSaving(true);
    try {
      const flowId = await saveFlowToCloud(newFlowName, { nodes, edges }, user);
      if (isPublic) await setFlowPublicity(flowId, user, true);
      setNewFlowName('');
      setIsPublic(false);
      setShow(false);
    } catch (e) {
      alert('Failed to save flow');
    }
    setSaving(false);
  }

  function getShareUrl(flowId: string) {
    return `${window.location.origin}/explore/${flowId}`;
  }

  async function handleRemix(flow: any) {
    await remixFlow(flow, user);
    alert('Remixed! Check your cloud flows.');
  }

  // ...existing render
  return (
    <>
      {/* ...existing button/menu */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {/* ...existing save UI */}
            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
              <span className="text-xs text-gray-700">Make this flow public</span>
            </label>
            {/* ...existing load UI */}
            <hr className="my-3" />
            <h3 className="font-semibold mb-2">Trending Public Flows</h3>
            <ul>
              {publicFlows.map(flow => (
                <li key={flow.id} className="mb-1 flex justify-between items-center">
                  <span>{flow.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-700 text-xs underline"
                      onClick={() => {
                        navigator.clipboard.writeText(getShareUrl(flow.id));
                        alert('Link copied!');
                      }}
                    >
                      Share
                    </button>
                    <button
                      className="text-green-700 text-xs underline"
                      onClick={() => handleRemix(flow)}
                    >
                      Remix
                    </button>
                    <button
                      className="text-purple-600 text-xs underline"
                      onClick={() => {
                        setNodes(flow.data.nodes || []);
                        setEdges(flow.data.edges || []);
                        setShow(false);
                      }}
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="absolute top-2 right-2 text-lg" onClick={() => setShow(false)}>×</button>
          </div>
        </div>
      )}
    </>
  );
}