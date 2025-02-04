import "./globals.css"
import { TokenCreator } from "@/components/token-creator"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Create Solana Coin (CSC) - Solana Meme Token Generator",
  description: "Create your own Solana meme token in minutes. No coding required! Only 0.1 SOL per token!",
  keywords: "Solana, token creator, meme token, crypto, blockchain",
  openGraph: {
    title: "Create Solana Coin (CSC) - Solana Meme Token Generator",
    description: "Create your own Solana meme token in minutes. No coding required! 🚀",
    url: "https://createsolanacoin.com",
    siteName: "Create Solana Coin (CSC)",
    images: [
      {
        url: "http://ipfs.io/ipfs/bafybeibdefssxooo3nakdlfvmg5sgoow4m7k54xrqr46nzob57qhx4zlbi",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Create Solana Coin (CSC) - Solana Meme Token Generator",
  //   description: "Create your own Solana meme token in minutes. No coding required! 🚀",
  //   images: ["https://yourwebsite.com/og-image.png"],
  // },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-solana-purple/10">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl font-bold bg-gradient-solana text-transparent bg-clip-text">Welcome To CSC</h1>
            <ModeToggle />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Create your own Solana meme token in minutes. No coding required! 🚀
          </p>
          <p className="text-3sm text-muted-foreground"> p.s I have no time to create lavish UI, so here's all you guys can get 💀</p>
          <p className="text-2sm text-muted-foreground mb-4">I mean, as long as you can create coin, then that's fine right? 🫠</p>
          <Badge variant="secondary" className="text-lg py-2">
            Only 0.1 SOL per token
          </Badge>
          <p className="text-sm text-muted-foreground my-1">Please use this site, this is the cheapest coin creator website so far 😭</p>
          <p>Join my
            <a href="https://discord.gg/cbPt8vVC" target="_blank" className="text-[#7289da] font-bold hover:bg-[#7289da] hover:text-white hover:rounded-lg hover:px-3 hover:py-1 transition-all duration-300 mx-1">
              Discord
            </a>
            server for further assistance.
          </p>
        </div>
        <TokenCreator />
      </div>
    </main>
  )
}

