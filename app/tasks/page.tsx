"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Clock, ArrowDownToLine, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { v4 } from "uuid"
import { countries, getUniversalLink, SelfAppBuilder } from "@selfxyz/core"
import SelfQRcodeWrapper from '@selfxyz/qrcode';

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
  const [showVerification, setShowVerification] = useState(false)
  const [userId] = useState(v4())

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
    // Show verification popup
    setShowVerification(true)
  }

  const handleVerificationSuccess = () => {
    // Close the verification popup
    setShowVerification(false)

    // Show withdrawal processing
    setIsWithdrawing(true)

    // Make bear happy during withdrawal
    setBearMood("happy")

    // Simulate withdrawal process
    setTimeout(() => {
      setIsWithdrawing(false)
      setBearMood("normal")

      // Show success message or redirect
      alert("Withdrawal successful! Funds will be transferred to your bank account.")
    }, 2000)
  }

  // Create Self app for verification
  const selfApp = new SelfAppBuilder({
    appName: "Playroom Withdraw",
    scope: "playroom-withdraw",
    endpoint: "https://d4a2-111-235-226-130.ngrok-free.app/api/verifyself/",
    logoBase64: "https://pluspng.com/img-png/images-owls-png-hd-owl-free-download-png-png-image-485.png",
    userId: userId,
    disclosures: {
      minimumAge: 18,
      ofac: true,
      excludedCountries: [countries.FRANCE],
      name: true,
    },
  }).build()

  const universalLink = getUniversalLink(selfApp)

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

      {/* Age Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Age Verification</h2>
              <button onClick={() => setShowVerification(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm mb-4">Please verify you are 18 or older to withdraw funds to your bank account.</p>

            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-xl mb-4">
                <SelfQRcodeWrapper selfApp={selfApp} onSuccess={handleVerificationSuccess} />
              </div>

              <Button
                onClick={() => {
                  window.open(universalLink, "_blank")
                }}
                className="w-full rounded-full bg-primary"
              >
                Open Self App
              </Button>

              <p className="text-xs text-center mt-3 text-gray-500">
                Scan with your Self app or click the button above to verify your identity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Happy Bear Animation (visible when claiming rewards or completing tasks) */}
      {bearMood === "happy" && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
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