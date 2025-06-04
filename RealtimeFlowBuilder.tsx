import React, { useEffect, useState, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { setupRealtime } from '../utils/yjsRealtime';

export default function RealtimeFlowBuilder({ flowId }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const roomName = `flowmind-${flowId}`;
    const { provider, yNodes, yEdges } = setupRealtime(roomName);

    // Sync Yjs → React state
    const syncNodes = () => setNodes([...yNodes.toArray()]);
    const syncEdges = () => setEdges([...yEdges.toArray()]);
    yNodes.observe(syncNodes);
    yEdges.observe(syncEdges);

    // First load
    setNodes([...yNodes.toArray()]);
    setEdges([...yEdges.toArray()]);
    setReady(true);

    // React → Yjs: update Yjs arrays on local changes
    const unsubscribeNodes = onNodesChange((nextNodes) => {
      yNodes.delete(0, yNodes.length);
      yNodes.push([...nextNodes]);
    });
    const unsubscribeEdges = onEdgesChange((nextEdges) => {
      yEdges.delete(0, yEdges.length);
      yEdges.push([...nextEdges]);
    });

    return () => {
      yNodes.unobserve(syncNodes);
      yEdges.unobserve(syncEdges);
      provider.destroy();
      unsubscribeNodes();
      unsubscribeEdges();
    };
    // eslint-disable-next-line
  }, [flowId]);

  if (!ready) return <div>Loading real-time collab…</div>;

  const onConnect = (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}