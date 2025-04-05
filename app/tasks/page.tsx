"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  reward: number
  status: "pending" | "completed" | "approved" | "claimed"
}

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Help mom cook",
      reward: 5,
      status: "pending",
    },
    {
      id: "2",
      title: "Clean your room",
      reward: 3,
      status: "completed",
    },
    {
      id: "3",
      title: "Do your homework",
      reward: 4,
      status: "approved",
    },
    {
      id: "4",
      title: "Walk the dog",
      reward: 2,
      status: "claimed",
    },
  ])

  const [bearMood, setBearMood] = useState<"normal" | "happy">("normal")

  const markAsComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "completed" } : task)))

    // Make the bear happy when a task is completed
    setBearMood("happy")
    setTimeout(() => {
      setBearMood("normal")
    }, 3000)
  }

  const claimReward = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "claimed" } : task)))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="bg-white/80 rounded-3xl p-4 mb-4">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">My Tasks</h1>
          <p className="text-center mb-4">Complete tasks to earn rewards!</p>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "border-2 border-primary rounded-xl p-4",
                  task.status === "completed" && "bg-yellow-100",
                  task.status === "approved" && "bg-green-100",
                  task.status === "claimed" && "bg-gray-100",
                )}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{task.title}</h3>
                  <span className="text-xl font-bold text-secondary">${task.reward}</span>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    {task.status === "pending" && <Clock className="w-5 h-5 text-yellow-500 mr-2" />}
                    {(task.status === "completed" || task.status === "approved" || task.status === "claimed") && (
                      <Check className="w-5 h-5 text-success mr-2" />
                    )}
                    <span className="capitalize">{task.status === "pending" ? "To do" : task.status}</span>
                  </div>

                  {task.status === "pending" && (
                    <Button onClick={() => markAsComplete(task.id)} className="rounded-full">
                      Mark Complete
                    </Button>
                  )}

                  {task.status === "approved" && (
                    <Button
                      onClick={() => claimReward(task.id)}
                      className="rounded-full bg-success hover:bg-success/90"
                    >
                      Claim Reward
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bear Animation (hidden but used for state) */}
      <div className={cn("fixed top-0 left-0 -z-10", bearMood === "happy" && "bear-happy")}>
        <Image
          src={bearMood === "happy" ? "/images/bear-happy.png" : "/images/bear.png"}
          alt="Cute bear"
          width={1}
          height={1}
          className="opacity-0"
        />
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white h-20 flex justify-around items-center px-4 rounded-t-3xl shadow-lg">
        <button className="nav-item" onClick={() => router.push("/home")}>
          <Image src="/images/homeicon2.png" alt="Home" width={40} height={40} className="nav-icon" />
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item active" onClick={() => {}}>
          <Image src="/images/taskicon2.png" alt="Tasks" width={40} height={40} className="nav-icon" />
          <span className="nav-text">Tasks</span>
        </button>
      </div>
    </div>
  )
}

