export function Steps({ currentStep }) {
  const steps = ["Connect Wallet", "Token Details", "Review & Deploy"]

  return (
    (<div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center space-y-2 relative">
          <div
            className={`rounded-full w-10 h-10 flex items-center justify-center border-2 transition-colors ${
              index + 1 <= currentStep
                ? "border-solana-purple bg-solana-purple/10 text-solana-purple"
                : "border-muted bg-background text-muted-foreground"
            }`}>
            {index + 1}
          </div>
          <span
            className={`text-sm font-medium ${
              index + 1 <= currentStep ? "text-solana-purple" : "text-muted-foreground"
            }`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`absolute top-5 left-1/2 w-[calc(100%-2rem)] h-[2px] -z-10 ${
                index + 1 < currentStep ? "bg-solana-purple" : "bg-muted"
              }`} />
          )}
        </div>
      ))}
    </div>)
  );
}

