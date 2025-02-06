"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/image-upload"
import { useWallet } from "@solana/wallet-adapter-react"
import { Switch } from "./ui/switch"
import { useForm } from "react-hook-form"
import { clusterApiUrl, Connection } from "@solana/web3.js"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export function TokenForm({ tokenData, setTokenData, onNext }) {
  const { connected, publicKey, connect, disconnect, wallet } = useWallet();
  const [balance, setBalance] = useState(0);
  const [devBalance, setDevBalance] = useState(0);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...tokenData,
      revokeFreezeAuthority: true,
      revokeMintAuthority: true,
    },
  })

  const validationBeforeNext = () => {
    for (const key in tokenData) {
      if (key !== 'revokeFreezeAuthority' && key !== 'revokeMintAuthority' && !tokenData[key]) {
        return Swal.fire({
          title: 'All fields must be filled!',
          text: "Please fill all of the fields!",
          icon: 'warning',
          confirmButtonText: "Close",
          customClass: {
            popup: 'bg-black text-white'
          }
        })
      }
    }
    onNext()
  }

  const handleChange = (e) => {
    setTokenData({
      ...tokenData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleNetwork = () => {
    setTokenData((prev) => ({...tokenData, network: prev.network === 'mainnet' ? 'devnet' : 'mainnet'}));
  }

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && publicKey) {
        const connection = new Connection("https://fittest-smart-shadow.solana-mainnet.quiknode.pro/72cf440b36fc0ff7c5ae92a46f6c5a66defabfc0", "confirmed")
        const devConnection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(publicKey)
        const walletBalanceDev = await devConnection.getBalance(publicKey)
        setBalance(walletBalance / 1e9) // Convert from lamports to SOL
        setDevBalance(walletBalanceDev / 1e9)
      }
    }

    fetchBalance()
  }, [connected, publicKey])

  return (
    (<Card className="p-6 border-2 border-solana-purple/20">
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold bg-gradient-solana text-transparent bg-clip-text">Create Your Meme Token</h2>
        <Badge variant="secondary">0.1 SOL</Badge>
      </div>
      <div className="flex justify-between items-center my-2">
        <h1>Your Balance: <Badge>{tokenData.network === 'mainnet' ? balance : devBalance} SOL</Badge></h1>
        <Button variant="destructive" onClick={disconnect}>Disconnect Wallet</Button>
      </div>
      <div className="flex justify-between items-center my-2">
        <h1>Change Network: <Badge variant={tokenData.network} onClick={toggleNetwork}>{tokenData.network}</Badge></h1>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Token Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Doge Coin"
            value={tokenData.name}
            onChange={handleChange}
            className="border-solana-purple/20 focus:border-solana-purple"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="symbol">Token Symbol</Label>
          <Input
            id="symbol"
            name="symbol"
            placeholder="e.g., DOGE"
            value={tokenData.symbol}
            onChange={handleChange}
            className="border-solana-purple/20 focus:border-solana-purple"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Tell us about your meme token"
            value={tokenData.description}
            onChange={handleChange}
            className="border-solana-purple/20 focus:border-solana-purple"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="supply">Total Supply</Label>
            <Input
              id="supply"
              name="supply"
              type="number"
              placeholder="e.g., 1000000"
              value={tokenData.supply}
              onChange={handleChange}
              className="border-solana-purple/20 focus:border-solana-purple"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimals">Decimals</Label>
            <Input
              id="decimals"
              name="decimals"
              type="number"
              placeholder="9"
              value={tokenData.decimals}
              onChange={handleChange}
              className="border-solana-purple/20 focus:border-solana-purple"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Token Image</Label>
          <ImageUpload
            value={tokenData.image}
            onChange={(value) => setTokenData({ ...tokenData, image: value })}
            required
          />
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="revokeFreezeAuthority" className="text-base">
                Revoke Freeze Authority
              </Label>
              <p className="text-sm text-gray-500">Permanently remove the ability to freeze token accounts</p>
            </div>
            <Switch
              id="revokeFreezeAuthority"
              {...register("revokeFreezeAuthority")}
              defaultChecked={tokenData.revokeFreezeAuthority}
              onCheckedChange={(checked) => setTokenData({ ...tokenData, revokeFreezeAuthority: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="revokeMintAuthority" className="text-base">
                Revoke Mint Authority
              </Label>
              <p className="text-sm text-gray-500">Permanently remove the ability to mint new tokens</p>
            </div>
            <Switch
              id="revokeMintAuthority"
              {...register("revokeMintAuthority")}
              defaultChecked={tokenData.revokeMintAuthority}
              onCheckedChange={(checked) => setTokenData({ ...tokenData, revokeMintAuthority: checked })}
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={validationBeforeNext}
          className="w-full bg-gradient-solana hover:opacity-90 transition-opacity">
          Next Step
        </Button>
      </form>

    </Card>)
  );
}

