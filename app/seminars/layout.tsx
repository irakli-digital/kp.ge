import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "სემინარები | ცოდნისმოყვარე პოდკასტი",
  description: "ცოდნისმოყვარე პოდკასტის სემინარები და ვორქშოპები. ცნობიერება, პიროვნული განვითარება და ტრანსფორმაცია.",
  alternates: {
    canonical: "https://kp.ge/seminars",
  },
  openGraph: {
    title: "სემინარები | ცოდნისმოყვარე პოდკასტი",
    description: "ცოდნისმოყვარე პოდკასტის სემინარები და ვორქშოპები. ცნობიერება, პიროვნული განვითარება და ტრანსფორმაცია.",
    url: "https://kp.ge/seminars",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ცოდნისმოყვარე პოდკასტი - სემინარები',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "სემინარები | ცოდნისმოყვარე პოდკასტი",
    description: "ცოდნისმოყვარე პოდკასტის სემინარები და ვორქშოპები.",
    images: ['/og-cover.png'],
  },
}

export default function SeminarsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
