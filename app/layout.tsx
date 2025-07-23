import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import AnnouncementBanner from "@/components/announcement-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mypen.ge - ᲓᲐᲖᲝᲒᲔ ᲓᲠᲝ. ᲬᲔᲠᲔ ᲣᲙᲔᲗᲔᲡᲐᲓ",
  description: "ყველა საბაზისო ინსტრუმენტი AI-სთან მუშაობის დასაწყებად.",
  icons: {
    icon: "/images/favicon.svg",
  },
  generator: "v0.dev",
  metadataBase: new URL('https://mypen.ge'),
  openGraph: {
    title: "Mypen.ge - ᲓᲐᲖᲝᲒᲔ ᲓᲠᲝ. ᲬᲔᲠᲔ ᲣᲙᲔᲗᲔᲡᲐᲓ",
    description: "ყველა საბაზისო ინსტრუმენტი AI-სთან მუშაობის დასაწყებად.",
    url: 'https://mypen.ge',
    siteName: 'Mypen.ge',
    images: [
      {
        url: '/images/og-image.webp', // <- OG IMAGE PATH HERE
        width: 1200,
        height: 630,
        alt: 'Mypen.ge - AI ინსტრუმენტები',
      }
    ],
    locale: 'ka_GE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mypen.ge - ᲓᲐᲖᲝᲒᲔ ᲓᲠᲝ. ᲬᲔᲠᲔ ᲣᲙᲔᲗᲔᲡᲐᲓ",
    description: "ყველა საბაზისო ინსტრუმენტი AI-სთან მუშაობის დასაწყებად.",
    images: ['/images/og-image.jpg'], // <- TWITTER IMAGE PATH HERE
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
