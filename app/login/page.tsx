"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [loginMethod, setLoginMethod] = useState<"input" | "select">("select")
  const [ensName, setEnsName] = useState("")

  const handleLogin = () => {
    // In a real app, we would validate the ENS name
    // For now, just navigate to the home page
    router.push("/home")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#d1f1ff]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Playroom</h1>
          <p className="text-xl mt-2">A wallet for kids</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image src="/images/bear.png" alt="Cute bear" width={120} height={120} className="bear-container" />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center">Login to your wallet</h2>

              <div className="flex gap-2 justify-center mb-4">
                <Button
                  variant={loginMethod === "select" ? "default" : "outline"}
                  onClick={() => setLoginMethod("select")}
                  className="rounded-full"
                >
                  Choose Name
                </Button>
                <Button
                  variant={loginMethod === "input" ? "default" : "outline"}
                  onClick={() => setLoginMethod("input")}
                  className="rounded-full"
                >
                  Type Name
                </Button>
              </div>

              {loginMethod === "select" ? (
                <div className="space-y-2">
                  <Label htmlFor="ens-select">Select your ENS name</Label>
                  <Select onValueChange={setEnsName}>
                    <SelectTrigger className="w-full h-12 text-lg rounded-xl">
                      <SelectValue placeholder="Select your name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leo.fam.eth">leo.fam.eth</SelectItem>
                      <SelectItem value="emma.fam.eth">emma.fam.eth</SelectItem>
                      <SelectItem value="max.fam.eth">max.fam.eth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="ens-input">Enter your ENS name</Label>
                  <Input
                    id="ens-input"
                    placeholder="yourname.fam.eth"
                    value={ensName}
                    onChange={(e) => setEnsName(e.target.value)}
                    className="h-12 text-lg rounded-xl"
                  />
                </div>
              )}

              <Button onClick={handleLogin} className="w-full h-12 text-lg rounded-xl mt-4" disabled={!ensName}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

