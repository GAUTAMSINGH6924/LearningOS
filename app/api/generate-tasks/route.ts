import { NextResponse } from "next/server";

type Task = {
  task: string;
  status: string;
};

// 🔥 Detect intent from goal
function detectIntent(goal: string) {
  const g = goal.toLowerCase();

  if (g.includes("learn") || g.includes("study")) return "learning";
  if (g.includes("crack") || g.includes("interview")) return "structured";
  if (g.includes("hackathon") || g.includes("find") || g.includes("in "))
    return "real_world";
  if (g.includes("build") || g.includes("project")) return "project";

  return "general";
}

export async function POST(req: Request) {
  try {
    const { goal } = await req.json();

    const callAI = async (prompt: string) => {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      return res.json();
    };

    // 🔥 Dynamic prompt
    const intent = detectIntent(goal);

    let prompt1 = "";

    if (intent === "learning") {
      prompt1 = `
Break this learning goal into 5 progressive steps (beginner → advanced).

Goal: ${goal}

Return JSON:
[{"task":"...", "status":"not_started"}]
`;
    } else if (intent === "structured") {
      prompt1 = `
Create a structured preparation plan with study + practice + revision.

Goal: ${goal}

Return JSON:
[{"task":"...", "status":"not_started"}]
`;
    } else if (intent === "real_world") {
      prompt1 = `
You are a smart execution assistant.

Break this goal into 5 HIGHLY SPECIFIC real-world steps.

Rules:
- Mention exact platforms (Devfolio, Unstop, LinkedIn, etc.)
- Avoid vague words like "research"
- Each step must be directly actionable

Goal: ${goal}

Return JSON:
[{"task":"...", "status":"not_started"}]
`;
    } else if (intent === "project") {
      prompt1 = `
Break into project execution steps:

idea → setup → build → test → deploy

Goal: ${goal}

Return JSON:
[{"task":"...", "status":"not_started"}]
`;
    } else {
      prompt1 = `
Break this goal into 5 clear actionable steps.

Goal: ${goal}

Return JSON:
[{"task":"...", "status":"not_started"}]
`;
    }

    let data = await callAI(prompt1);
    let text = data.choices?.[0]?.message?.content || "";

    let tasks: Task[] = [];

    // ✅ Parse JSON safely
    try {
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        const mapped = parsed.map((item: any) => {
          if (typeof item === "string") {
            return { task: item, status: "not_started" };
          }

          if (typeof item === "object" && item?.task) {
            return {
              task: item.task,
              status: item.status || "not_started",
            };
          }

          return null;
        });

        tasks = mapped
          .filter((t): t is Task => t !== null)
          .filter((t) => t.task && t.task.trim().length > 0);
      }
    } catch {
      // 🔹 fallback parsing
      tasks = text
        .split("\n")
        .map((l: string) => {
          const cleaned = l.replace(/^[\-\*\d\.\s]+/, "").trim();

          return {
            task: cleaned,
            status: "not_started",
          };
        })
        .filter((t:any) => t.task && t.task.trim().length > 0);
    }

    tasks = tasks.slice(0, 5);

    // 🔁 Retry if empty
    if (!tasks.length) {
      const prompt2 = `
Give 5 very specific actionable steps for:

${goal}

No explanation.
`;

      data = await callAI(prompt2);
      text = data.choices?.[0]?.message?.content || "";

      tasks = text
        .split("\n")
        .map((l: string) => ({
          task: l.replace(/^[\-\*\d\.\s]+/, "").trim(),
          status: "not_started",
        }))
        .filter((t:any) => t.task && t.task.trim().length > 0)
        .slice(0, 5);
    }

    // ❌ Final fallback
    if (!tasks.length) {
      return NextResponse.json({
        tasks: [
          {
            task: "⚠️ AI could not generate tasks. Try again.",
            status: "not_started",
          },
        ],
      });
    }

    return NextResponse.json({ tasks });

  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json({
      tasks: [
        {
          task: "⚠️ Something went wrong.",
          status: "not_started",
        },
      ],
    });
  }
}