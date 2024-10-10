import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/header"
import BottomNav from "../components/bottomNav"
import { ThirdwebProvider } from "thirdweb/react"

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
      <ThirdwebProvider>
        <Header />
        {children}
        <BottomNav />
      </ThirdwebProvider>
    </div>
  )
}
