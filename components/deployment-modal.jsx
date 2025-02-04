"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, ExternalLink, Copy } from "lucide-react"
import Image from "next/image"

export function DeploymentModal({ isOpen, onClose, tokenData }) {
  const [deploymentStep, setDeploymentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  const steps = [
    "Uploading token image to IPFS",
    "Creating token metadata",
    "Deploying token contract",
    "Minting initial supply",
  ]

  // Simulated token address - replace with actual deployed token address
  const tokenAddress = "7nB3b3zcxPVYP8RHAjkeMWHXKyZxfkzJWZk4QqBGjdC4"

  useEffect(() => {
    if (isOpen) {
      const simulateDeployment = async () => {
        for (let i = 1; i <= steps.length; i++) {
          setDeploymentStep(i)
          setProgress((i / steps.length) * 100)
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
        setIsComplete(true)
      }
      simulateDeployment()
    }
  }, [isOpen])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (!isOpen) return null

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2md p-0">
        {!isComplete ? (
          <div className="p-6">
            <h3
              className="text-xl font-semibold mb-4 bg-gradient-solana text-transparent bg-clip-text">
              Deploying Your Token
            </h3>
            <div className="flex items-center justify-center align-center">
              <Loader2 className="h-16 w-16 animate-spin" />
            </div>
            {/* <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    {index + 1 < deploymentStep ? (
                      <CheckCircle2 className="h-4 w-4 text-solana-green" />
                    ) : index + 1 === deploymentStep ? (
                      <Loader2 className="h-4 w-4 text-solana-purple animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted" />
                    )}
                    <span
                      className={index + 1 <= deploymentStep ? "text-foreground" : "text-muted-foreground"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-6 w-6 text-solana-green" />
              <h3
                className="text-xl font-semibold bg-gradient-solana text-transparent bg-clip-text">
                Token Deployed Successfully!
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div
                  className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-solana-purple/20">
                  {tokenData.image ? (
                    <Image
                      src={tokenData.image || "/placeholder.svg"}
                      alt={tokenData.name}
                      fill
                      className="object-cover" />
                  ) : (
                    <div
                      className="w-full h-full bg-gradient-to-br from-solana-purple/5 to-solana-green/5" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{tokenData.name}</h4>
                  <p className="text-muted-foreground">{tokenData.symbol}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Token Address</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 rounded-md bg-muted font-mono text-sm">{tokenAddress}</code>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-solana-purple/20"
                      onClick={() => copyToClipboard(tokenAddress)}>
                      {copied ? <CheckCircle2 className="h-4 w-4 text-solana-green" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://explorer.solana.com/address/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full">
                    <Button
                      type="button"
                      className="w-full bg-gradient-solana hover:opacity-90 transition-opacity">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>)
  );
}

