"use client";

import { useEffect, useState } from "react";

type Step = {
  array: (number | string)[];
  left?: number;
  right?: number;
  mid?: number;
  highlight?: number[];
  description?: string;
};

export default function Visualizer({ steps }: { steps: Step[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!steps?.length || !playing) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [steps, playing]);

  useEffect(() => {
    setCurrent(0);
  }, [steps]);

  if (!steps || steps.length === 0) return null;

  const step = steps[current];

  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
      <div className="flex justify-between mb-3">
        <p className="text-xs text-gray-400">
          Step {current + 1}/{steps.length}
        </p>

        <div className="flex gap-2">
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={() => setCurrent((p) => Math.max(p - 1, 0))}>◀</button>
          <button onClick={() => setCurrent((p) => Math.min(p + 1, steps.length - 1))}>▶</button>
        </div>
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        {step.array.map((v, i) => {
          const isLeft = i === step.left;
          const isRight = i === step.right;
          const isMid = i === step.mid;
          const isHighlight = step.highlight?.includes(i);

          return (
            <div
              key={i}
              className={`w-12 h-12 flex items-center justify-center rounded
              ${
                isHighlight
                  ? "bg-green-500 scale-110"
                  : isLeft || isRight
                  ? "bg-yellow-500 scale-110"
                  : isMid
                  ? "bg-blue-500 scale-110"
                  : "bg-gray-700"
              }`}
            >
              {v}
            </div>
          );
        })}
      </div>

      {step.description && (
        <p className="text-center mt-3 text-sm text-gray-300">
          {step.description}
        </p>
      )}
    </div>
  );
}