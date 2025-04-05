"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bearMood, setBearMood] = useState<"normal" | "happy">("normal")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Show loading state
    setIsLoading(true)
    
    // Make bear happy during login
    setBearMood("happy")
    
    // Mock sign in - just wait a bit then navigate
    setTimeout(() => {
      router.push("/home")
    }, 1500)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-[#d1f1ff] overflow-hidden">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Playroom</h1>
          <p className="text-xl mt-1">A wallet for kids</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image 
                src={bearMood === "happy" ? "/images/happy-bear.png" : "/images/bear.png"}
                alt="Cute bear" 
                width={120} 
                height={120} 
                className={bearMood === "happy" ? "bear-happy" : "bear-container"}
              />
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-10 text-base rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 text-base rounded-xl"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-10 text-base rounded-xl mt-2"
                disabled={isLoading || !username || !password}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo account: kid / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
