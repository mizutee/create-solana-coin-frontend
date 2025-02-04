import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingCard() {
  return (
    (<Card className="p-6 border-2 border-solana-green/20">
      <h3
        className="text-2xl font-bold mb-4 bg-gradient-solana text-transparent bg-clip-text">
        Premium Token Creation
      </h3>
      <div className="mb-6">
        <p className="text-3xl font-bold">0.1 SOL</p>
        <p className="text-muted-foreground">per token</p>
      </div>
      <ul className="space-y-3 mb-6">
        {[
          "Custom token name & symbol",
          "Customizable supply & decimals",
          "Upload custom token image",
          "Instant deployment",
          "100% ownership of your token",
        ].map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-solana-green" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>)
  );
}

