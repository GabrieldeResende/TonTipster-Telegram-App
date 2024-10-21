"use client"
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/client";
import { sepolia } from "thirdweb/chains";

export default function Header() {

  return (
    <div className='flex w-full justify-between p-4 bg-black text-white'>
      <Link href='/home'>
        <div className='flex flex-row items-center'>
          <Image
            src='/assets/tontipster-logo.png'
            alt='Tontipster Logo'
            width={40}
            height={50}
          />
          <div className='flex pl-2'>
            <p className='text-lg font-light'>TonTipster</p>
          </div>
        </div>
      </Link>
      {/* <WalletConnectBtn /> */}
      <ConnectButton
        client={client}
      />
    </div>
  )
}