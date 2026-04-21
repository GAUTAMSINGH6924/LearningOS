"use client";

import SplineRobot from "@/components/SplineRobot";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e3a8a,transparent_40%),radial-gradient(circle_at_80%_70%,#9333ea,transparent_40%)] opacity-30 blur-2xl" />

      <div className="relative z-10 grid md:grid-cols-2 items-center min-h-screen px-6 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-transparent bg-clip-text">
            Saarthi AI
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mb-8">
            Your AI-powered career guide that builds personalized roadmaps,
            tracks your progress, and helps you grow step by step.
          </p>

          <button
            onClick={() => (window.location.href = "/onboarding")}
            className="bg-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-lg"
          >
            Get Started
          </button>

        </div>

        {/* RIGHT */}
        <div className="h-[500px] md:h-[600px] w-full">
          <SplineRobot />
        </div>

      </div>

    </main>
  );
}