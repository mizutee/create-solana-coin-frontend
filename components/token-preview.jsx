import { Card } from "@/components/ui/card"
import Image from "next/image"

export function TokenPreview({ tokenData }) {
  return (
    (<Card className="p-6 border-2 border-solana-green/20">
      <h2
        className="text-2xl font-bold mb-6 bg-gradient-solana text-transparent bg-clip-text">Token Preview</h2>
      <div className="space-y-6">
        <div
          className="aspect-square relative rounded-lg overflow-hidden border-2 border-solana-purple/20">
          {tokenData.image ? (
            <Image
              src={tokenData.image || "/placeholder.svg"}
              alt={tokenData.name}
              fill
              className="object-cover" />
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br from-solana-purple/5 to-solana-green/5 flex items-center justify-center">
              <span className="text-muted-foreground">Upload Token Image</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-solana-purple">Name</h3>
            <p className="text-xl">{tokenData.name || "Your Token Name"}</p>
          </div>

          <div>
            <h3 className="font-medium text-solana-purple">Symbol</h3>
            <p className="text-xl">{tokenData.symbol || "SYMBOL"}</p>
          </div>

          <div>
            <h3 className="font-medium text-solana-purple">Description</h3>
            <p>{tokenData.description || "Your token description will appear here"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-solana-purple">Supply</h3>
              <p>{tokenData.supply || "0"}</p>
            </div>

            <div>
              <h3 className="font-medium text-solana-purple">Decimals</h3>
              <p>{tokenData.decimals}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>)
  );
}

