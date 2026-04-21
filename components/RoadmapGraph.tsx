"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function RoadmapGraph({ steps, onStepClick }: any) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const currentIndex = steps.findIndex(
    (s: any) => s.status !== "completed"
  );

  useEffect(() => {
    if (!steps.length) return;

    let tempNodes: any[] = [];
    let tempEdges: any[] = [];

    // 🔥 RESET before animation
    setNodes([]);
    setEdges([]);

    // 🚀 START NODE
    tempNodes.push({
      id: "start",
      position: { x: -180, y: 160 },
      data: { label: "🚀 Start" },
      style: {
        background: "#2563eb",
        color: "white",
        padding: 10,
        borderRadius: 10,
      },
    });

    tempEdges.push({
      id: `start-${steps[0].id}`,
      source: "start",
      target: steps[0].id,
      type: "smoothstep",
      animated: true,
      style: {
        stroke: "#888",
        strokeDasharray: "5 5",
      },
    });

    steps.forEach((step: any, index: number) => {
      setTimeout(() => {
        const isCompleted = step.status === "completed";
        const isCurrent = index === currentIndex;
       const isLocked = index > currentIndex && !isCompleted;

        // 🎯 ZIG-ZAG ROADMAP (clean path)
        const position = {
          x: index * 260,
          y: index % 2 === 0 ? 100 : 220,
        };

        tempNodes.push({
          id: step.id,
          position,

          data: {
            label: (
              <div
                onClick={() => {
                  if (!isLocked) onStepClick(step);
                }}
                style={{
                  cursor: isLocked ? "not-allowed" : "pointer",
                  opacity: isLocked ? 0.5 : 1,
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isLocked)
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {isCompleted ? "✓ " : ""}
                {step.step}
                {isLocked && " 🔒"}
              </div>
            ),
          },

          style: {
            background: isCompleted
              ? "#22c55e"
              : isCurrent
              ? "#eab308"
              : "#1f2937",
            color: "white",
            padding: 12,
            borderRadius: 12,
            border: isCurrent
              ? "2px solid #facc15"
              : "1px solid #374151",
            boxShadow: isCurrent
              ? "0 0 20px rgba(250,204,21,0.5)"
              : "none",
          },
        });

        // 🔗 CONNECT PREVIOUS NODE
        if (index > 0) {
          tempEdges.push({
            id: `e-${steps[index - 1].id}-${step.id}`,
            source: steps[index - 1].id,
            target: step.id,
            type: "smoothstep",
            animated: true,
            style: {
              stroke: "#888",
              strokeDasharray: "5 5",
            },
          });
        }

        setNodes([...tempNodes]);
        setEdges([...tempEdges]);
      }, index * 350); // smoother animation
    });
  }, [steps, currentIndex, onStepClick]);

  return (
    <div className="w-full h-[600px] flex justify-center items-center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}