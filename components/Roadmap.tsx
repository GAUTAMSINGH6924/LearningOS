"use client";

type Node = {
  id: string;
  label: string;
  link?: string;
  completed?: boolean;
};

export default function Roadmap({ nodes }: { nodes: Node[] }) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto p-4">
      {nodes.map((node, index) => (
        <div key={node.id} className="flex items-center">
          
          {/* Node */}
          <div
            onClick={() => node.link && window.open(node.link, "_blank")}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm whitespace-nowrap
              ${node.completed ? "bg-green-600" : "bg-gray-700"}
              hover:scale-105 transition`}
          >
            {node.label}
          </div>

          {/* Arrow */}
          {index < nodes.length - 1 && (
            <div className="mx-2 text-gray-400">→</div>
          )}
        </div>
      ))}
    </div>
  );
}