"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import RoadmapGraph from "@/components/RoadmapGraph";

export default function RoadmapPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 📊 FETCH LATEST ROADMAP
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data: sessions } = await supabase
          .from("roadmap_sessions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        if (!sessions || sessions.length === 0) {
          setSteps([]);
          setLoading(false);
          return;
        }

        const latestSessionId = sessions[0].id;

        const { data: roadmap } = await supabase
          .from("roadmap")
          .select("*")
          .eq("session_id", latestSessionId)
          .order("order_index");

        setSteps(roadmap || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setSteps([]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔥 STEP CLICK HANDLER
  const handleStepClick = async (step: any) => {
    // prevent spam clicking
    if (activeId === step.id) return;

    setActiveId(step.id);

    try {
      const res = await fetch("/api/get-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: step.platform,
          difficulty: step.difficulty,
          stepText: step.step,
        }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!data.link) {
        alert("No resource found");
        setActiveId(null);
        return;
      }

      // 🎯 OPEN LINK
      window.open(data.link, "_blank");

      // ✅ UPDATE DB
      await supabase
        .from("roadmap")
        .update({ status: "completed" })
        .eq("id", step.id);

      // ⚡ INSTANT UI UPDATE
      setSteps((prev) =>
        prev.map((s) =>
          s.id === step.id
            ? { ...s, status: "completed" }
            : s
        )
      );
    } catch (err) {
      console.error("Click error:", err);
      alert("Something went wrong");
    }

    setActiveId(null);
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Your AI Roadmap 🚀
      </h1>

      {/* 🔄 LOADING */}
      {loading && <p className="text-gray-400">Loading roadmap...</p>}

      {/* ❌ EMPTY */}
      {!loading && steps.length === 0 && (
        <p className="text-gray-500">
          No roadmap found. Complete onboarding first.
        </p>
      )}

      {/* 🔥 GRAPH */}
      {!loading && steps.length > 0 && (
        <RoadmapGraph
          steps={steps}
          onStepClick={handleStepClick}
        />
      )}
    </main>
  );
}