import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
Return ONLY JSON.

Give top 12 trending tech skills.

Format:
[
  {
    "title": "",
    "description": "",
    "roadmap": ["topic1", "topic2", "topic3"]
  }
]
            `,
          },
        ],
      }),
    });

    const data = await res.json();
    let text = data.choices?.[0]?.message?.content || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const match = text.match(/\[[\s\S]*\]/);

    let skills = [];

    if (match) {
      skills = JSON.parse(match[0]);
    }

    // 🔥 ADD COURSERA LINKS
    const enhanced = skills.map((skill: any) => ({
      ...skill,
      roadmap: skill.roadmap.map((step: string) => ({
        title: step,
        link: `https://www.coursera.org/search?query=${encodeURIComponent(step)}`,
      })),
    }));

    return NextResponse.json({ skills: enhanced });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ skills: [] });
  }
}