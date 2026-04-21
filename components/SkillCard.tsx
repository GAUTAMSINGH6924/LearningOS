"use client";

import { useRef } from "react";

export default function SkillCard({ skill, onClick }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: any) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    // spotlight
    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%),
      rgba(20,20,30,0.7)
    `;
  };

  const reset = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    card.style.background = "rgba(20,20,30,0.7)";
  };

  // 🔥 simple icon logic (auto)
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("ai")) return "🤖";
    if (t.includes("cloud")) return "☁️";
    if (t.includes("data")) return "📊";
    if (t.includes("web")) return "🌐";
    if (t.includes("security")) return "🔐";
    return "🚀";
  };

  // 🎨 gradient
  const gradient =
    "bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 backdrop-blur-xl border border-white/10 transition duration-200 ${gradient}`}
    >
      <div className="flex flex-col justify-between h-full">

        <div className="text-2xl">{getIcon(skill.title)}</div>

        <h2 className="text-sm font-semibold mt-2">
          {skill.title}
        </h2>

        <p className="text-xs text-gray-400 mt-2 line-clamp-3">
          {skill.description}
        </p>

        <span className="text-[10px] text-purple-400 mt-3">
          Trending 🔥
        </span>

      </div>
    </div>
  );
}