import { setupRealtime } from '../utils/yjsRealtime';
import { useEffect } from 'react';

// ...inside your component
const flowId = ...; // get from URL or props
const roomName = `flowmind-${flowId}`;
const { yNodes, yEdges, provider } = setupRealtime(roomName);

useEffect(() => {
  const updateNodes = () => setNodes([...yNodes.toArray()]);
  const updateEdges = () => setEdges([...yEdges.toArray()]);
  yNodes.observeDeep(updateNodes);
  yEdges.observeDeep(updateEdges);
  return () => {
    yNodes.unobserveDeep(updateNodes);
    yEdges.unobserveDeep(updateEdges);
    provider.destroy();
  };
}, [roomName]);