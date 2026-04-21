import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();

    // 🔥 Better fallback (future dates only)
    const events = [
      {
        id: 1,
        title: "AI Global Hackathon",
        date: "2026-06-20",
        type: "online",
      },
      {
        id: 2,
        title: "DevFest Delhi",
        date: "2026-07-10",
        type: "offline",
      },
      {
        id: 3,
        title: "Web3 Buildathon",
        date: "2026-08-15",
        type: "online",
      },
      {
        id: 4,
        title: "ML Hack Summit",
        date: "2026-09-05",
        type: "offline",
      },
    ];

    // ✅ FILTER ONLY FUTURE
    const upcoming = events.filter(
      (e) => new Date(e.date) >= today
    );

    return NextResponse.json({ events: upcoming });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ events: [] });
  }
}