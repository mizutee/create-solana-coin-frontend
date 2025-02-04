"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Copy, ExternalLink, Loader2 } from "lucide-react"
import axios from "axios"
import { useWallet } from "@solana/wallet-adapter-react"
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function TokenDeploy({ tokenData, setCurrentStep, onBack }) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [created, setCreated] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const { wallet } = useWallet();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const startDeployment = async () => {
    const { data } = await axios({
      method: "POST",
      url: "http://localhost:8080/pay-fee",
      data: {
        publicKey: wallet.adapter.publicKey
      }
    })
    const { transaction, code } = data;
    const transactions = Transaction.from(Buffer.from(transaction, "base64"));

    // Connect to Solana
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Sign and send transaction
    const signature = await wallet.adapter.sendTransaction(transactions, connection);

    const latestBlockhash = await connection.getLatestBlockhash();
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    }, "confirmed");

    // Check transaction status
    if (confirmation.value.err) {
      console.error("Transaction failed:", confirmation.value.err);
    } else {
      // console.log("Transaction successful! ✅");
      console.log(`Transaction: https://solscan.io/tx/${signature}?cluster=devnet`);
      setIsDeploying(true);

      const responseCreateToken = await axios.post("http://localhost:8080/api/v1/create-token", {
        ...tokenData,
        code,
        publicKey: wallet.adapter.publicKey
      });

      setTokenAddress(responseCreateToken?.data?.address);
      setCreated(true);
    }

    // const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
    // const transaction = new Transaction();
    // const recepient = new PublicKey("BjzupgD9PYjksPDXez2r2TokDAf3EntZvSM9Y1dCE7zS");

    // transaction.add(
    //   SystemProgram.transfer({
    //     fromPubkey: wallet.adapter.publicKey,
    //     toPubkey: recepient,
    //     lamports: 0.15 * 1e9
    //   })
    // );

    // const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    // transaction.recentBlockhash = blockhash;
    // transaction.feePayer = wallet.adapter.publicKey;

    // Send transaction (wallet handles signing)
    // const signature = await wallet.adapter.sendTransaction(transaction, connection);

    // // Wait for confirmation
    // const confirmation = await connection.confirmTransaction(
    //   { signature, blockhash, lastValidBlockHeight },
    //   "confirmed"
    // );

    // if (confirmation.value.err) {
    //   console.error("Transaction failed", confirmation.value.err);
    //   return;
    // }

    // console.log("Transaction successful, signature:", signature);


  };


  useEffect(() => {
    if (created && !isDeploying) {
      setCurrentStep(1);
    }
  }, [isDeploying])

  return (<>
    <Card className="p-6 border-2 border-solana-purple/20">
      <h2
        className="text-2xl font-bold mb-6 bg-gradient-solana text-transparent bg-clip-text">Deploy Your Token</h2>

      <div className="space-y-6 mb-6">
        <div
          className="grid gap-4 p-4 rounded-lg bg-gradient-to-br from-solana-purple/5 to-solana-green/5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="font-bold">0.1 SOL</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="font-bold">~0.00001 SOL</span>
          </div> */}
          <div className="border-t border-border my-2" />
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-solana-purple">0.1 SOL</span>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-solana-purple/20">
          <h3 className="font-medium mb-2">Before you deploy:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Make sure you have enough SOL in your wallet for fees</li>
            <li>• Double-check your token details in the preview</li>
            <li>• Token creation cannot be undone after deployment</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="border-solana-purple/20">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={startDeployment}
          className="flex-1 bg-gradient-solana hover:opacity-90 transition-opacity">
          Deploy Now
        </Button>
      </div>
    </Card>
    {/* <DeploymentModal
      isOpen={isDeploying}
      onClose={() => setIsDeploying(false)}
      tokenData={tokenData} /> */}
    (<Dialog open={isDeploying} onOpenChange={() => setIsDeploying(false)}>
      <DialogContent className="sm:max-w-2md p-0">
        <VisuallyHidden>
          <DialogTitle>
            Token Deployment
          </DialogTitle>
        </VisuallyHidden>
        {!created ? (
          <div className="p-6">
            <h3
              className="text-xl font-semibold mb-4 bg-gradient-solana text-transparent bg-clip-text">
              Deploying Your Token
            </h3>
            <div className="flex items-center justify-center align-center">
              <Loader2 className="h-16 w-16 animate-spin" />
            </div>
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
  </>);
}

