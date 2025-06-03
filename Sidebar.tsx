import React from 'react';

const nodeTypes = [
  { type: 'trigger', label: 'Trigger', color: 'bg-green-100', text: 'text-green-800' },
  { type: 'action', label: 'Action', color: 'bg-blue-100', text: 'text-blue-800' },
  { type: 'condition', label: 'Condition', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { type: 'ai', label: 'AI Agent', color: 'bg-purple-100', text: 'text-purple-800' },
];

export default function Sidebar() {
  // Drag handler: set node type in drag event
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-white border-r flex flex-col p-4">
      <h2 className="text-lg font-bold mb-4 text-blue-700">Blocks</h2>
      <div className="space-y-3">
        {nodeTypes.map(({ type, label, color, text }) => (
          <div
            key={type}
            className={`p-3 rounded cursor-grab select-none shadow-md flex items-center justify-center ${color} ${text} font-semibold`}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
            title={`Drag to canvas: ${label}`}
          >
            {label}
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <h2 className="text-lg font-bold mb-2 text-blue-700">Templates</h2>
      <ul className="space-y-2">
        <li>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-blue-50 transition">
            Social Media Bot
          </button>
        </li>
        <li>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-blue-50 transition">
            Email Summarizer
          </button>
        </li>
        <li>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-blue-50 transition">
            AI Meeting Scheduler
          </button>
        </li>
      </ul>
    </aside>
  );
}