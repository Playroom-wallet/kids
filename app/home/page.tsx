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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/background.png" alt="Background" fill style={{ objectFit: "cover" }} priority />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-6 px-4 h-full">
          {/* ENS Name */}
          <div className="bg-white/80 px-4 py-1 rounded-full mb-2">
            <p className="text-base font-bold">leo.fam.eth</p>
          </div>

          {/* Balance */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-[#3a2449]">Balance</h2>
            <p className="text-6xl font-bold text-[#ffd166]">${balance.toFixed(2)}</p>
          </div>

          {/* Bear */}
          <div className={cn("mt-2", bearMood === "happy" && "bear-happy")}>
            <Image
              src={bearMood === "happy" ? "/images/happy-bear.png" : "/images/bear.png"}
              alt="Cute bear"
              width={180}
              height={180}
              className="bear-container"
            />
          </div>

          {/* Buy Switch2 Button */}
          <button
            onClick={handleBuySwitch}
            className="mt-4 bg-secondary hover:bg-secondary/90 text-foreground font-bold py-2 px-6 rounded-full text-xl shadow-lg transform transition-transform active:scale-95"
          >
            Buy Switch2
          </button>

          {/* Credit Information */}
          <p className="mt-2 text-sm font-medium text-primary bg-white/60 px-3 py-1 rounded-full">Credit: $500</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white h-16 flex justify-around items-center px-4 rounded-t-3xl shadow-lg">
        <button className="nav-item active" onClick={() => {}}>
          <Image src="/images/homeicon2.png" alt="Home" width={32} height={32} className="nav-icon" />
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item" onClick={() => router.push("/tasks")}>
          <Image src="/images/taskicon2.png" alt="Tasks" width={32} height={32} className="nav-icon" />
          <span className="nav-text">Tasks</span>
        </button>
      </div>
    </div>
  )
}

