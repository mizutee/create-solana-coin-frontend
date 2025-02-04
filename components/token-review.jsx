import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export function TokenReview({ tokenData, onBack, onNext }) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(Number(num));
  }

  return (
    (<Card className="p-6 border-2 border-solana-purple/20">
      <h2
        className="text-2xl font-bold mb-6 bg-gradient-solana text-transparent bg-clip-text">Review Token Details</h2>
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

        <div className="space-y-4">
          <h3 className="font-semibold">Token Configuration</h3>
          <div className="grid gap-2">
            {[
              { label: "Name", value: tokenData.name },
              { label: "Symbol", value: tokenData.symbol },
              { label: "Total Supply", value: formatNumber(tokenData.supply) },
              { label: "Decimals", value: tokenData.decimals },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-solana-green flex-shrink-0" />
                <div className="flex justify-between w-full">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="border-solana-purple/20">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-solana hover:opacity-90 transition-opacity">
          Deploy Token
        </Button>
      </div>
    </Card>)
  );
}

