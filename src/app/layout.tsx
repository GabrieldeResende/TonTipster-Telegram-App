"use client";

import { Inter } from "next/font/google";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

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
        <ThirdwebProvider clientId={clientId}>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
