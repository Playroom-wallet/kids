import type React from "react"
import type { Metadata } from "next"
import { Bubblegum_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const bubblegum = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Playroom - A Wallet for Kids",
  description: "A fun wallet app for kids to earn rewards",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bubblegum.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'