"use client"

import { useEffect, useMemo, useState } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

export function WalletContextProvider({ children }) {
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), [])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  )

  const [autoConnectAttempted, setAutoConnectAttempted] = useState(false)

  useEffect(() => {
    if (!autoConnectAttempted) {
      setAutoConnectAttempted(true) // Prevent infinite loop
    }
  }, [autoConnectAttempted])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={autoConnectAttempted}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
