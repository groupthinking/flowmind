import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export function setupRealtime(roomName: string) {
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(roomName, ydoc);

  const yNodes = ydoc.getArray('nodes');
  const yEdges = ydoc.getArray('edges');

  return { ydoc, provider, yNodes, yEdges };
}