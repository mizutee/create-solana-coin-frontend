"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TokenForm } from "@/components/token-form"
import { TokenReview } from "@/components/token-review"
import { TokenDeploy } from "@/components/token-deploy"
import { Steps } from "@/components/steps"
import { PricingCard } from "@/components/pricing-card"
import { TokenPreview } from "@/components/token-preview"
import { useWallet } from "@solana/wallet-adapter-react" // Import the wallet hook
import { WalletModalButton } from "@solana/wallet-adapter-react-ui" // Import the built-in button

export function TokenCreator() {
  const { connected, connect, disconnect, wallet } = useWallet()
  const [currentStep, setCurrentStep] = useState(1)
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    description: "",
    supply: "1000000000",
    decimals: "9",
    image: "",
    revokeFreezeAuthority: true,
    revokeMintAuthority: true,
    network: "mainnet"
  })

  const renderStep = () => {
    if (!connected) {
      return (
        <>
          <Card className="p-6 border-2 border-solana-purple/20">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-solana text-transparent bg-clip-text">
              Connect Wallet
            </h2>
            <p className="text-muted-foreground mb-4">
              Connect your Wallet to create your meme token
            </p>
            <WalletModalButton className="w-full bg-gradient-solana hover:opacity-90 transition-opacity">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Your Wallet
            </WalletModalButton>
          </Card>
          <PricingCard />
        </>
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <TokenForm
            tokenData={tokenData}
            setTokenData={setTokenData}
            onNext={() => setCurrentStep(2)} />
        )
      case 2:
        return (
          <TokenReview
            tokenData={tokenData}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)} />
        )
      case 3:
        return <TokenDeploy setTokenData={setTokenData} tokenData={tokenData} setCurrentStep={setCurrentStep} onBack={() => setCurrentStep(2)} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <Steps currentStep={currentStep} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">{renderStep()}</div>

        <div className="space-y-4">
          <TokenPreview tokenData={tokenData} />
        </div>
      </div>
    </div>
  )
}
