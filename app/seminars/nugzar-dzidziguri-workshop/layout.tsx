import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ტრანსფორმაციის ვორქშოპი | ნუგზარ ძიძიგური",
  description: "ორდღიანი ინტენსიური ვორქშოპი: გათავისუფლდი დესტრუქციული როლებისგან და შეცვალე შენი ცხოვრება. ნუგზარ ძიძიგური და გვანცა ველთაური.",
  alternates: {
    canonical: "https://kp.ge/seminars/nugzar-dzidziguri-workshop",
  },
  openGraph: {
    title: "ტრანსფორმაციის ვორქშოპი | ნუგზარ ძიძიგური",
    description: "ორდღიანი ინტენსიური ვორქშოპი: გათავისუფლდი დესტრუქციული როლებისგან და შეცვალე შენი ცხოვრება.",
    url: "https://kp.ge/seminars/nugzar-dzidziguri-workshop",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ტრანსფორმაციის ვორქშოპი - ნუგზარ ძიძიგური',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ტრანსფორმაციის ვორქშოპი | ნუგზარ ძიძიგური",
    description: "ორდღიანი ინტენსიური ვორქშოპი: გათავისუფლდი დესტრუქციული როლებისგან.",
    images: ['/og-cover.png'],
  },
}

export default function NugzarWorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
