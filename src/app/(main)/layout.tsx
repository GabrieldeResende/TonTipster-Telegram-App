import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/header"
import BottomNav from "../components/bottomNav"

const inter = Inter({ subsets: ["latin"] })

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
