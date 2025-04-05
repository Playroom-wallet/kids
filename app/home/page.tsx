"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const router = useRouter()
  const [balance] = useState(45.0)
  const [bearMood, setBearMood] = useState<"normal" | "happy">("normal")

  const handleBuySwitch = () => {
    setBearMood("happy")
    setTimeout(() => {
      setBearMood("normal")
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/background.png" alt="Background" fill style={{ objectFit: "cover" }} priority />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-10 px-4">
          {/* ENS Name */}
          <div className="bg-white/80 px-4 py-2 rounded-full mb-4">
            <p className="text-lg font-bold">leo.fam.eth</p>
          </div>

          {/* Balance */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#3a2449]">Balance</h2>
            <p className="text-7xl font-bold text-[#ffd166]">${balance.toFixed(2)}</p>
          </div>

          {/* Bear */}
          <div className={cn("mt-4", bearMood === "happy" && "bear-happy")}>
            <Image
              src={bearMood === "happy" ? "/images/bear-happy.png" : "/images/bear.png"}
              alt="Cute bear"
              width={200}
              height={200}
              className="bear-container"
            />
          </div>

          {/* Buy Switch2 Button */}
          <button
            onClick={handleBuySwitch}
            className="mt-8 bg-secondary hover:bg-secondary/90 text-foreground font-bold py-3 px-6 rounded-full text-xl shadow-lg transform transition-transform active:scale-95"
          >
            Buy Switch2
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white h-20 flex justify-around items-center px-4 rounded-t-3xl shadow-lg">
        <button className="nav-item active" onClick={() => {}}>
          <Image src="/images/homeicon2.png" alt="Home" width={40} height={40} className="nav-icon" />
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item" onClick={() => router.push("/tasks")}>
          <Image src="/images/taskicon2.png" alt="Tasks" width={40} height={40} className="nav-icon" />
          <span className="nav-text">Tasks</span>
        </button>
      </div>
    </div>
  )
}

