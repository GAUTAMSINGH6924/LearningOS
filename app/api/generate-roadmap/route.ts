import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { userId, level, interest, goal, time_commitment } =
      await req.json();

    // 🧠 1. GENERATE ROADMAP (AI)
    const prompt = `
Create a structured roadmap.

Level: ${level}
Interest: ${interest}
Goal: ${goal}
Time: ${time_commitment}

Rules:
- Give 6 steps
- Each step must include:
  - step
  - type
  - domain
  - platform (youtube/leetcode/github/devfolio/internshala/linkedin)

Return ONLY JSON array.
`;

    const aiRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const aiData = await aiRes.json();
    let text = aiData.choices?.[0]?.message?.content || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let roadmap: any[] = [];

    try {
      roadmap = JSON.parse(text);
    } catch {
      roadmap = [];
    }

    if (!Array.isArray(roadmap)) roadmap = [];

    // 🧾 2. CREATE SESSION
    const { data: session } = await supabase
      .from("roadmap_sessions")
      .insert([{ user_id: userId, level }])
      .select()
      .single();

    // 🧱 3. INSERT STEPS
    const rows = roadmap.map((s: any, i: number) => ({
      step: s.step,
      type: s.type,
      domain: s.domain,
      platform: s.platform,
      difficulty: level,
      status: "not_started",
      order_index: i,
      session_id: session.id,
    }));

    if (rows.length > 0) {
      await supabase.from("roadmap").insert(rows);
    }

    // ✅ 4. RETURN ROADMAP
    return NextResponse.json({ roadmap });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ roadmap: [] });
  }
}