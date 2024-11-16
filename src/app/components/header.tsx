"use client"
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { client } from "@/client";
import { sepolia } from 'thirdweb/chains'
import ConnectWalletButton from "./ConnectWalletButton";

export default function Header() {

  return (
    <div className='flex w-full justify-between p-4 bg-black text-white'>
      <Link href='/home'>
        <div className='flex flex-row items-center'>
          <Image
            src='/assets/TonytipsterLogo.jpeg'
            alt='Tontipster Logo'
            className="rounded-xl"
            width={40}
            height={50}
          />
          <div className='flex pl-2'>
            <p className='text-lg font-light'>TonyTipster</p>
          </div>
        </div>
      </Link>
      {/* <WalletConnectBtn /> */}
      {/* <ConnectWalletButton /> */}
      <ConnectButton
        client={client}
        chain={sepolia}
      />

      {/* <div className="bg-slate-900 border-black flex p-[8px] rounded-[8px]">
        <img src="/blockies/blockie1.svg" alt="" className="w-[35px] h-[35px] mr-3" />
        <div>
          <p className="text-[12px]">0x67yz...3A4F</p>
          <p className="text-[12px] text-[#7c7a85] font-normal">0.8235 ETH</p>
        </div>
      </div> */}
    </div>
  )
}