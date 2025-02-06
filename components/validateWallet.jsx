"use client";

import { useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import Swal from "sweetalert2";

export default function ValidateWallet({ children }) {
    const { disconnect, wallet } = useWallet()

    useEffect(() => {
        if (wallet?.adapter.name === "Solflare") {
            Swal.fire({
                title: 'Please choose other wallet!',
                text: 'Solflare wallet is disabled for now :( Please choose another wallet',
                icon: 'info',
                customClass: {
                    popup: 'bg-black text-white'
                }
            })
            disconnect()
        }
    }, [wallet, disconnect])

    return <>{children}</>
}
