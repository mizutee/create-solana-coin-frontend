import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletContextProvider } from "@/context/WalletProvider"
import ValidateWallet from "@/components/validateWallet"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletContextProvider>
            <ValidateWallet>
              {children}
            </ValidateWallet>
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
