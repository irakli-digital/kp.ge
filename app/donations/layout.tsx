import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "მხარდაჭერა | ცოდნისმოყვარე პოდკასტი",
  description: "მხარი დაუჭირეთ ცოდნისმოყვარე პოდკასტს და გახდით ცოდნის გავრცელების ნაწილი.",
  alternates: {
    canonical: "https://kp.ge/donations",
  },
  openGraph: {
    title: "მხარდაჭერა | ცოდნისმოყვარე პოდკასტი",
    description: "მხარი დაუჭირეთ ცოდნისმოყვარე პოდკასტს და გახდით ცოდნის გავრცელების ნაწილი.",
    url: "https://kp.ge/donations",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ცოდნისმოყვარე პოდკასტი - მხარდაჭერა',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "მხარდაჭერა | ცოდნისმოყვარე პოდკასტი",
    description: "მხარი დაუჭირეთ ცოდნისმოყვარე პოდკასტს.",
    images: ['/og-cover.png'],
  },
}

export default function DonationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
