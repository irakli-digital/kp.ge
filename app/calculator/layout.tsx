import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "სპონსორობის კონფიგურატორი | ცოდნისმოყვარე პოდკასტი",
  description: "შექმენით თქვენი პერსონალიზებული სპონსორობის პაკეტი ცოდნისმოყვარე პოდკასტისთვის. აირჩიეთ თანამშრომლობის ტიპი და მიიღეთ შეთავაზება.",
  alternates: {
    canonical: "https://kp.ge/calculator",
  },
  openGraph: {
    title: "სპონსორობის კონფიგურატორი | ცოდნისმოყვარე პოდკასტი",
    description: "შექმენით თქვენი პერსონალიზებული სპონსორობის პაკეტი. 3.3M+ ნახვა, Premium აუდიტორია.",
    url: "https://kp.ge/calculator",
    siteName: "ცოდნისმოყვარე პოდკასტი",
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'ცოდნისმოყვარე პოდკასტი - სპონსორობა',
      }
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "სპონსორობის კონფიგურატორი | ცოდნისმოყვარე პოდკასტი",
    description: "შექმენით თქვენი პერსონალიზებული სპონსორობის პაკეტი.",
    images: ['/og-cover.png'],
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
