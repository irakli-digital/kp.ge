import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ცნობიერების პრინციპები: პრაქტიკული სემინარი | ცოდნისმოყვარე პოდკასტი",
  description: "ექვსსაათიანი პრაქტიკული სემინარი ცნობიერების მექანიზმებისა და მათი მართვის შესახებ. დავით კანდელაკი და გვანცა ველთაური.",
  alternates: {
    canonical: "https://kp.ge/seminars/consciousness",
  },
  openGraph: {
    title: "ცნობიერების პრინციპები: პრაქტიკული სემინარი",
    description: "ექვსსაათიანი პრაქტიკული სემინარი ცნობიერების მექანიზმებისა და მათი მართვის შესახებ.",
    url: "https://kp.ge/seminars/consciousness",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ცნობიერების პრინციპები - სემინარი',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ცნობიერების პრინციპები: პრაქტიკული სემინარი",
    description: "ექვსსაათიანი პრაქტიკული სემინარი ცნობიერების მექანიზმებისა და მათი მართვის შესახებ.",
    images: ['/og-cover.png'],
  },
}

export default function ConsciousnessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
