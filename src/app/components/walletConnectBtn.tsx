"use client"
import { useTonWallet } from "../hooks/useTonWallet"
import Modal from "./modal"
import React, { useState } from "react"
import Image from "next/image"
import { WalletInfoCurrentlyInjected } from "@tonconnect/sdk"

const WalletList = ({
  availableWallets,
  connectTowallet,
}: {
  availableWallets: WalletInfoCurrentlyInjected[]
  connectTowallet: (walletInfo: WalletInfoCurrentlyInjected) => void
}) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {availableWallets.map((walletInfo, index) => (
          <div
            key={index}
            className='border border-gray-800 rounded-lg p-3'
            onClick={() => connectTowallet(walletInfo)}
          >
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <Image
                  src={
                    walletInfo.imageUrl
                      ? walletInfo.imageUrl
                      : "/assets/tontipster-logo.png"
                  }
                  alt='Tontipster Logo'
                  width={50}
                  height={50}
                  className='mr-2 rounded-xl'
                />
                <span className='text-sm'>{walletInfo.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WalletConnectBtn() {
  const { handleConnect, wallet, handleDisconnect, availableWallets } =
    useTonWallet()

  const [walletModalOpen, setWalletModalOpen] = useState(false)

  const openWalletModal = async () => {
    setWalletModalOpen(true)
  }

  const connectTowallet = (walletInfo: WalletInfoCurrentlyInjected) => {
    handleConnect(walletInfo)
    setWalletModalOpen(false)
  }


  return (
    <div className='flex w-full justify-end'>
      {wallet ? (
        <button
          className='bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg'
          onClick={handleDisconnect}
        >
          DISCONNECT WALLET
        </button>
      ) : (
        <button
          className='bg-[#673BB7] hover:bg-[#422479] text-white font-bold p-2 rounded-lg'
          onClick={openWalletModal}
        >
          CONNECT WALLET
        </button>
      )}
      <Modal
        title='Choose wallet'
        children={
          <WalletList
            connectTowallet={connectTowallet}
            availableWallets={availableWallets}
          />
        }
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </div>
  )
}
