"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BearAnimationProps {
  mood: "normal" | "happy"
  className?: string
}

export function BearAnimation({ mood, className }: BearAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (mood === "happy") {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [mood])

  return (
    <div className={cn("bear-container", isAnimating && "bear-happy", className)}>
      <Image src={`/images/bear${mood === "happy" ? "-happy" : ""}.png`} alt="Cute bear" width={200} height={200} />
    </div>
  )
}

