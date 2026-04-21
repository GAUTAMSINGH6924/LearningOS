import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const lower = (input || "").toLowerCase();

    // 🧠 Intent detection
    const isGreeting =
      lower === "hi" || lower === "hello" || lower === "hey";

    const isDSA =
      lower.includes("two sum") ||
      lower.includes("three sum") ||
      lower.includes("binary search") ||
      lower.includes("palindrome") ||
      lower.includes("sliding window");

    // 🧠 Explanation
    let explanation = "";

    if (isGreeting) {
      explanation = "Hey 👋 What do you want to learn today?";
    } else {
      try {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
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
You are Saarthi AI.

Explain "${input}" clearly:
- no repetition
- beginner friendly
- include intuition
- keep it engaging
                  `,
                },
              ],
            }),
          }
        );

        const data = await res.json();
        explanation =
          data.choices?.[0]?.message?.content ||
          `Explanation of ${input}`;
      } catch {
        explanation = `Explanation of ${input}`;
      }
    }

    // 🎥 YouTube (ONLY if not greeting)
    let videos: any[] = [];

    if (!isGreeting) {
      try {
        const ytRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            input + " tutorial"
          )}&type=video&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`
        );

        const ytData = await ytRes.json();

        videos =
          ytData.items?.map((item: any) => ({
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            videoId: item.id.videoId,
          })) || [];
      } catch {}
    }

    // 🔥 Visualizer steps
    const steps = isDSA ? getSteps(lower) : [];

    return NextResponse.json({
      intent: isDSA ? "leetcode" : isGreeting ? "general" : "learn",
      topic: input,
      explanation,
      videos,
      steps,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      intent: "general",
      topic: "",
      explanation: "Something went wrong",
      videos: [],
      steps: [],
    });
  }
}

// 🔥 Basic visualizer logic
function getSteps(input: string) {
  if (input.includes("two sum")) {
    return [
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 1,
        description: "Checking 2 + 7",
      },
      {
        array: [2, 7, 11, 15],
        highlight: [0, 1],
        description: "Found pair",
      },
    ];
  }

  if (input.includes("binary")) {
    return [
      {
        array: [1, 3, 5, 7, 9],
        left: 0,
        right: 4,
        mid: 2,
        description: "Checking middle",
      },
      {
        array: [1, 3, 5, 7, 9],
        highlight: [2],
        description: "Found target",
      },
    ];
  }

  if (input.includes("palindrome")) {
    return [
      {
        array: ["r", "a", "c", "e", "c", "a", "r"],
        left: 0,
        right: 6,
        description: "Compare ends",
      },
      {
        array: ["r", "a", "c", "e", "c", "a", "r"],
        description: "Palindrome confirmed",
      },
    ];
  }

  return [];
}