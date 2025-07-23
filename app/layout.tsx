import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mypen.ge - ᲓᲐᲖᲝᲒᲔ ᲓᲠᲝ. ᲬᲔᲠᲔ ᲣᲙᲔᲗᲔᲡᲐᲓ",
  description: "ყველა საბაზისო ინსტრუმენტი AI-სთან მუშაობის დასაწყებად.",
  icons: {
    icon: "/images/favicon.png",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" className="dark" suppressHydrationWarning>
      <head>
        <Script id="prevent-flash" strategy="beforeInteractive">
          {`
            (function() {
              // Apply dark mode immediately to prevent flash
              document.documentElement.classList.add('dark');
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
