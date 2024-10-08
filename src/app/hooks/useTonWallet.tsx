import {
  TonConnect,
  Wallet,
  WalletInfoCurrentlyInjected,
  isWalletInfoCurrentlyInjected,
} from "@tonconnect/sdk"
import { useEffect, useState } from "react"

export const useTonWallet = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [availableWallets, setAvailableWallets] = useState<
    WalletInfoCurrentlyInjected[]
  >([])

  useEffect(() => {
    const connector = new TonConnect()

    setTonConnect(connector)

    const getCurrentlyInjectedWalletInfos = async () => {
      if (connector) {
        const walletsList = await connector.getWallets()
        const currentlyInjectedWalletInfos = walletsList.filter(
          isWalletInfoCurrentlyInjected
        )
        setAvailableWallets(currentlyInjectedWalletInfos)
      }
    }

    getCurrentlyInjectedWalletInfos()

    const unsubscribe = connector.onStatusChange(async (wallet) => {
      if (wallet) {
        setWallet(wallet)
      } else {
        setWallet(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleConnect = async (walletInfo: WalletInfoCurrentlyInjected) => {
    if (tonConnect && !tonConnect.connected) {
      tonConnect.connect({
        jsBridgeKey: walletInfo.jsBridgeKey,
      })
      return
    }
  }

  const handleDisconnect = () => {
    if (tonConnect?.connected) {
      tonConnect.disconnect()
    } else {
      setWallet(null)
    }
  }

  return {
    tonConnect,
    wallet,
    handleConnect,
    handleDisconnect,
    availableWallets,
  }
}
