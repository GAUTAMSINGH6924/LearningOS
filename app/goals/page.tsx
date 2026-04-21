import { supabase } from "@/lib/supabaseClient";
import GoalForm from "@/components/GoalForm";
import TaskItem from "@/components/TaskItem";

export const dynamic = "force-dynamic";

// 🔥 rename function (important for clarity)
export default async function GoalsPage() {
  const { data, error } = await supabase
    .from("goals")
    .select("*, tasks(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      
      {/* 🔥 Updated heading */}
      <h1 className="text-4xl font-bold mb-6">
        My Goals 🎯
      </h1>

      <GoalForm />

      <h2 className="text-2xl mb-4">Your Goals:</h2>

      {data?.length === 0 && <p>No goals yet</p>}

      {data?.map((goal: any) => (
        <div
          key={goal.id}
          className="bg-gray-800 p-4 rounded mb-4"
        >
          {/* Goal */}
          <p className="text-lg font-semibold">
            {goal.goal_text}
          </p>

          <p className="text-sm text-gray-400 mb-2">
            Deadline: {goal.deadline}
          </p>

          {/* Tasks */}
          {goal.tasks?.length > 0 && (
            <ul className="mt-2">
              {goal.tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      ))}
    </main>
  );
}