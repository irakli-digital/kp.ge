import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "სისტემური განლაგება: რა არის და როგორ მუშაობს | რითრითი გუდაურში",
  description: "სისტემური განლაგება (Family Constellations) — თერაპიული მეთოდი ოჯახური და ურთიერთობის დინამიკის გამოსავლენად. შეუერთდით ჩვენს 3-დღიან რითრითს გუდაურში.",
  keywords: [
    "სისტემური განლაგება",
    "სისტემური განლაგებები",
    "family constellations",
    "ოჯახური განლაგებები",
    "ბერტ ჰელინგერი",
    "bert hellinger",
    "თერაპია",
    "რითრითი",
    "გუდაური",
    "sistemuri ganlageба",
    "sistemuri ganlageba",
    "family constellations georgia",
  ],
  openGraph: {
    title: "სისტემური განლაგება | რითრითი გუდაურში",
    description: "3 დღიანი ტრანსფორმაციული გამოცდილება მთებში. სისტემური განლაგებები, ბგერითი თერაპია და თვითაღმოჩენა.",
    type: "website",
    locale: "ka_GE",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'სისტემური განლაგება | რითრითი გუდაურში',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "სისტემური განლაგება | რითრითი გუდაურში",
    description: "3 დღიანი ტრანსფორმაციული გამოცდილება მთებში.",
    images: ['/og-cover.png'],
  },
  alternates: {
    canonical: "https://kp.ge/seminars/system-constellation-retreat",
  },
}

export default function SystemConstellationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
