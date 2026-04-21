"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/* 🎯 Cursor Glow */
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-0 w-[350px] h-[350px] rounded-full blur-3xl opacity-20"
      style={{
        left: pos.x - 175,
        top: pos.y - 175,
        background:
          "radial-gradient(circle, rgba(66,133,244,0.5), rgba(234,67,53,0.3), rgba(251,188,5,0.3), rgba(52,168,83,0.3))",
      }}
    />
  );
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll();

  // 🎬 Parallax layers
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🎯 Cursor Glow */}
      <CursorGlow />

      {/* 🌌 Parallax Background Layers */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4285F4,transparent_40%)] opacity-20 blur-3xl"
      />
      <motion.div
        style={{ y: yMedium }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,#EA4335,transparent_40%)] opacity-20 blur-3xl"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,#FBBC05,transparent_40%)] opacity-20 blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 space-y-40">

        {/* 🔥 HERO */}
        <section className="text-center min-h-[80vh] flex flex-col justify-center">

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight"
          >
            You don’t need more effort.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400 text-transparent bg-clip-text">
              You need direction.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Saarthi AI helps you cut through noise and focus on what truly matters —
            your growth, your path, your future.
          </motion.p>

        </section>

        {/* 💡 SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              The Problem
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Information is everywhere — but clarity isn’t.
              <br /><br />
              Students jump from one skill to another,
              chasing trends instead of building direction.
              <br /><br />
              This leads to burnout, confusion, and wasted effort.
            </p>
          </div>

          <motion.div
            whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
          >
            <p className="text-lg text-gray-200">
              “I’m learning… but I don’t know if it’s right.”
            </p>
          </motion.div>
        </motion.section>

        {/* 🎯 STORY */}
        <section className="text-center max-w-3xl mx-auto">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl mb-6"
          >
            Why Saarthi AI exists
          </motion.h2>

          <p className="text-gray-400 leading-relaxed">
            Saarthi AI was built to bring clarity.
            <br /><br />
            Not more content.
            Not more noise.
            <br /><br />
            Just direction.
          </p>

        </section>

        {/* 🎯 CARDS */}
        <section>
          <h2 className="text-3xl text-center mb-12">
            Built for real learners
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Beginners finding their first step",
              "Learners stuck in the middle",
              "Builders aiming for growth",
            ].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
              >
                <p className="text-gray-300">{text}</p>
              </motion.div>
            ))}

          </div>
        </section>

        {/* 🎥 VIDEO */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl mb-6">
            The story behind Saarthi AI
          </h2>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/ZDPtxdLf6Zs"
              allowFullScreen
            />
          </div>

        </motion.section>

        {/* 🚀 FINAL */}
        <section className="text-center">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-semibold"
          >
            Clarity changes everything.
          </motion.h2>

          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Saarthi AI helps you focus, move forward,
            and grow with confidence.
          </p>

        </section>

      </div>
    </main>
  );
}