import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "კონტაქტი | ცოდნისმოყვარე პოდკასტი",
  description: "დაგვიკავშირდით ნებისმიერი კითხვით. ცოდნისმოყვარე პოდკასტი - გვანცა ველთაური.",
  alternates: {
    canonical: "https://kp.ge/contact",
  },
  openGraph: {
    title: "კონტაქტი | ცოდნისმოყვარე პოდკასტი",
    description: "დაგვიკავშირდით ნებისმიერი კითხვით.",
    url: "https://kp.ge/contact",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ცოდნისმოყვარე პოდკასტი - კონტაქტი',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "კონტაქტი | ცოდნისმოყვარე პოდკასტი",
    description: "დაგვიკავშირდით ნებისმიერი კითხვით.",
    images: ['/og-cover.png'],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
