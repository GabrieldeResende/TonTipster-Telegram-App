"use client";

import { Inter } from "next/font/google";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./globals.css";
import { client } from "@/client";
import { sepolia } from "thirdweb/chains";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className}>
        <ThirdwebProvider clientId = {`${client.clientId}`}>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
