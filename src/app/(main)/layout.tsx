import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/header"
import BottomNav from "../components/bottomNav"
import { client } from "@/client"
import { ThirdwebProvider } from "@thirdweb-dev/react"

export const metadata: Metadata = {
  title: "TonTipster",
  description: "TonTipster",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      {children}
      <BottomNav />
    </div>
  )
}
