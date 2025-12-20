import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ცოდნისმოყვარე პოდკასტი - გვანცა ველთაური",
  description: "პოდკასტი, სადაც ცნობისმოყვარეობა ხვდება აღმოჩენას. მენტალური და ფიზიკური ჯანმრთელობა, სამეცნიერო ფენომენები და პიროვნული განვითარება.",
  icons: {
    icon: "/images/favicon.svg",
  },
  metadataBase: new URL('https://kp.ge'),
  openGraph: {
    title: "ცოდნისმოყვარე პოდკასტი - გვანცა ველთაური",
    description: "პოდკასტი, სადაც ცნობისმოყვარეობა ხვდება აღმოჩენას. მენტალური და ფიზიკური ჯანმრთელობა, სამეცნიერო ფენომენები და პიროვნული განვითარება.",
    url: 'https://kp.ge',
    siteName: 'ცოდნისმოყვარე პოდკასტი',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'ცოდნისმოყვარე პოდკასტი',
      }
    ],
    locale: 'ka_GE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ცოდნისმოყვარე პოდკასტი - გვანცა ველთაური",
    description: "პოდკასტი, სადაც ცნობისმოყვარეობა ხვდება აღმოჩენას.",
    images: ['/images/og-image.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka" className="dark">
      <head />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
