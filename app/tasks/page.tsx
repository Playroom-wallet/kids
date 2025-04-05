"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Clock, ArrowDownToLine } from "lucide-react"
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
  const [isWithdrawing, setIsWithdrawing] = useState(false)

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

    // Make the bear happy when a reward is claimed
    setBearMood("happy")
    setTimeout(() => {
      setBearMood("normal")
    }, 3000)
  }

  const handleWithdraw = () => {
    setIsWithdrawing(true)
    setBearMood("happy")

    setTimeout(() => {
      setIsWithdrawing(false)
      setBearMood("normal")
    }, 2000)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="bg-white/80 rounded-3xl p-4">
          <h1 className="text-2xl font-bold text-center text-primary mb-1">My Tasks</h1>
          <p className="text-center text-sm mb-3">Complete tasks to earn rewards!</p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "border-2 border-primary rounded-xl p-3",
                  task.status === "completed" && "bg-yellow-100",
                  task.status === "approved" && "bg-green-100",
                  task.status === "claimed" && "bg-gray-100",
                )}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <span className="text-lg font-bold text-secondary">${task.reward}</span>
                </div>

                <div className="mt-1 flex justify-between items-center">
                  <div className="flex items-center">
                    {task.status === "pending" && <Clock className="w-4 h-4 text-yellow-500 mr-1" />}
                    {(task.status === "completed" || task.status === "approved" || task.status === "claimed") && (
                      <Check className="w-4 h-4 text-success mr-1" />
                    )}
                    <span className="capitalize text-sm">{task.status === "pending" ? "To do" : task.status}</span>
                  </div>

                  {task.status === "pending" && (
                    <Button onClick={() => markAsComplete(task.id)} className="rounded-full h-8 text-sm px-3">
                      Mark Complete
                    </Button>
                  )}

                  {task.status === "approved" && (
                    <Button
                      onClick={() => claimReward(task.id)}
                      className="rounded-full h-8 text-sm px-3 bg-success hover:bg-success/90"
                    >
                      Claim Reward
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Withdraw Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleWithdraw}
              className="rounded-full bg-accent hover:bg-accent/90 px-6 py-2 h-auto"
              disabled={isWithdrawing}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              {isWithdrawing ? "Processing..." : "Withdraw to Bank"}
            </Button>
          </div>
        </div>
      </div>

      {/* Happy Bear Animation (visible when claiming rewards or completing tasks) */}
      {bearMood === "happy" && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bear-happy">
            <Image src="/images/happy-bear.png" alt="Happy bear" width={150} height={150} className="opacity-90" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white h-16 flex justify-around items-center px-4 rounded-t-3xl shadow-lg">
        <button className="nav-item" onClick={() => router.push("/home")}>
          <Image src="/images/homeicon2.png" alt="Home" width={32} height={32} className="nav-icon" />
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item active" onClick={() => {}}>
          <Image src="/images/taskicon2.png" alt="Tasks" width={32} height={32} className="nav-icon" />
          <span className="nav-text">Tasks</span>
        </button>
      </div>
    </div>
  )
}

