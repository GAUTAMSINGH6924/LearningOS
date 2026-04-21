"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Onboarding() {
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({
    purpose: "",
    experience: "",
    projects: "",
    hackathons: "",
    interest: "",
    goal: "",
    time: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let score = 0;

      // 🔥 SCORING
      if (answers.experience === "beginner") score += 1;
      if (answers.experience === "intermediate") score += 2;
      if (answers.experience === "advanced") score += 3;

      if (answers.projects === "0") score += 1;
      if (answers.projects === "1-3") score += 2;
      if (answers.projects === "4+") score += 3;

      if (answers.hackathons === "0") score += 1;
      if (answers.hackathons === "1-2") score += 2;
      if (answers.hackathons === "3+") score += 3;

      // 🎯 LEVEL
      let level = "beginner";
      if (score >= 6 && score <= 8) level = "intermediate";
      if (score > 8) level = "advanced";

      // ✅ Save profile
      await supabase.from("profiles").insert([
        {
          purpose: answers.purpose,
          level,
          projects: answers.projects,
          hackathons: answers.hackathons,
          interest: answers.interest,
          goal: answers.goal,
          time_commitment: answers.time,
        },
      ]);

      // 🚀 CALL ROADMAP API (THIS HANDLES DB INSERT)
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user-1", // 🔥 replace later with auth user
          level,
          interest: answers.interest,
          goal: answers.goal,
          time_commitment: answers.time,
        }),
      });

      const data = await res.json();

      // ✅ SAFETY CHECK
      if (!data || !Array.isArray(data.roadmap)) {
        alert("Failed to generate roadmap");
        setLoading(false);
        return;
      }

      // ❌ DO NOT INSERT AGAIN (already handled in API)

      // 🚀 REDIRECT
      window.location.href = "/roadmap";

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="p-10 text-white">
      <h1 className="text-3xl mb-6">
        Let’s personalize your journey 🚀
      </h1>

      {/* PURPOSE */}
      <select
        onChange={(e) =>
          setAnswers({ ...answers, purpose: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      >
        <option value="">Why are you using Saarthi AI?</option>
        <option value="learn">To learn new skills</option>
        <option value="placement">For placements</option>
        <option value="explore">To explore tech</option>
      </select>

      {/* EXPERIENCE */}
      <select
        onChange={(e) =>
          setAnswers({ ...answers, experience: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      >
        <option value="">Your experience level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* PROJECTS */}
      <select
        onChange={(e) =>
          setAnswers({ ...answers, projects: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      >
        <option value="">Number of projects</option>
        <option value="0">0</option>
        <option value="1-3">1-3</option>
        <option value="4+">4+</option>
      </select>

      {/* HACKATHONS */}
      <select
        onChange={(e) =>
          setAnswers({ ...answers, hackathons: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      >
        <option value="">Hackathons participated</option>
        <option value="0">0</option>
        <option value="1-2">1-2</option>
        <option value="3+">3+</option>
      </select>

      {/* INTEREST */}
      <input
        placeholder="Your interest (Web Dev / AI / DSA)"
        onChange={(e) =>
          setAnswers({ ...answers, interest: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      />

      {/* GOAL */}
      <input
        placeholder="Your goal (optional)"
        onChange={(e) =>
          setAnswers({ ...answers, goal: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      />

      {/* TIME */}
      <select
        onChange={(e) =>
          setAnswers({ ...answers, time: e.target.value })
        }
        className="block mb-4 p-3 bg-gray-800"
      >
        <option value="">Time commitment</option>
        <option value="1-2">1-2 hrs/day</option>
        <option value="3-4">3-4 hrs/day</option>
        <option value="5+">5+ hrs/day</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate My Roadmap 🚀"}
      </button>
    </main>
  );
}