"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Search, Zap, Image as ImageIcon, Globe, Code, Sparkles, Check, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { HubPageHero, HubPageCta, HubPageFaq } from "@/components/hub"
import { SmartCtaLink } from "@/components/smart-cta-link"
import JsonLd from "@/components/JsonLd"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema"

// Schema keywords (Latin for invisible SEO)
const schemaKeywords = [
  "gemini georgia",
  "google ai kartulad",
  "gemini pro georgia",
  "bard georgia",
  "google gemini saqartveloshi",
]

const features = [
  {
    title: "რეალურ დროში ძიება",
    description: "Gemini-ს აქვს პირდაპირი წვდომა Google Search-ზე - მიიღეთ უახლესი ინფორმაცია.",
    icon: <Search className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "სწრაფი პასუხები",
    description: "Gemini Flash არის ერთ-ერთი ყველაზე სწრაფი AI მოდელი - იდეალური სწრაფი ამოცანებისთვის.",
    icon: <Zap className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "სურათების ანალიზი",
    description: "ატვირთეთ სურათები და მიიღეთ დეტალური ანალიზი, აღწერა ან ტექსტის ამოღება.",
    icon: <ImageIcon className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "მულტილინგვური",
    description: "Google-ს აქვს საუკეთესო ქართული ენის მხარდაჭერა - Gemini კარგად წერს ქართულად.",
    icon: <Globe className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "კოდის გენერაცია",
    description: "Gemini Pro იდეალურია კოდის წერისა და debugging-ისთვის სხვადასხვა ენებზე.",
    icon: <Code className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    title: "კრეატიულობა",
    description: "იდეების გენერაცია, ბრეინსტორმინგი და კრეატიული ამოცანები - Gemini-ს ძლიერი მხარე.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
]

const useCases = [
  {
    title: "კვლევისთვის",
    description: "რეალურ დროში ძიება და fact-checking - იდეალური აქტუალური ინფორმაციისთვის.",
  },
  {
    title: "სტუდენტებისთვის",
    description: "სწრაფი პასუხები, ახსნა-განმარტებები და სასწავლო მასალების მომზადება.",
  },
  {
    title: "დეველოპერებისთვის",
    description: "კოდის გენერაცია, debugging და ტექნიკური დოკუმენტაცია.",
  },
  {
    title: "მარკეტერებისთვის",
    description: "ტრენდების კვლევა, კონტენტის იდეები და კონკურენტების ანალიზი.",
  },
]

const steps = [
  {
    number: "1",
    title: "შედით Mypen.ge-ზე",
    description: "დარეგისტრირდით უფასოდ და შედით პლატფორმაზე.",
  },
  {
    number: "2",
    title: "აირჩიეთ Gemini",
    description: "მოდელების სიიდან აირჩიეთ Gemini Flash ან Pro.",
  },
  {
    number: "3",
    title: "დაიწყეთ საუბარი",
    description: "დასვით კითხვები და მიიღეთ პასუხები რეალურ დროში.",
  },
]

const faqs = [
  {
    question: "რა არის Google Gemini?",
    answer: "Gemini არის Google-ის მიერ შექმნილი AI მოდელი, რომელიც ცნობილია სისწრაფით, რეალურ დროში ძიებითა და მულტიმოდალური შესაძლებლობებით.",
  },
  {
    question: "რა განსხვავებაა Gemini Flash და Pro-ს შორის?",
    answer: "Gemini Flash არის უსწრაფესი - იდეალური მარტივი ამოცანებისთვის. Gemini Pro უფრო მძლავრია და უკეთესია რთული ანალიზისთვის.",
  },
  {
    question: "შეუძლია Gemini-ს ინტერნეტში ძიება?",
    answer: "დიახ, Gemini-ს აქვს პირდაპირი წვდომა Google Search-ზე და შეუძლია უახლესი ინფორმაციის მოძიება რეალურ დროში.",
  },
  {
    question: "როგორ გამოვიყენო Gemini საქართველოში?",
    answer: "Mypen.ge-ზე შეგიძლიათ გამოიყენოთ Gemini პირდაპირ, Google ანგარიშის გარეშე. დარეგისტრირდით და აირჩიეთ Gemini მოდელი.",
  },
  {
    question: "შეუძლია Gemini-ს სურათების ანალიზი?",
    answer: "დიახ, Gemini-ს შეუძლია სურათების ანალიზი, აღწერა და ტექსტის ამოღება. ატვირთეთ სურათი და დასვით კითხვა.",
  },
  {
    question: "არის Gemini უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ გამოიყენოთ Gemini Flash უფასოდ. PRO და ULTRA პაკეტები გთავაზობთ Gemini Pro-ზე წვდომას.",
  },
]

export default function GeminiPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'მოდელები', url: 'https://mypen.ge/models' },
    { name: 'Gemini', url: 'https://mypen.ge/models/gemini' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={generateProductSchema({
        name: 'Google Gemini საქართველოში - Mypen.ge',
        description: 'გამოიყენეთ Gemini ქართულად - Google-ის AI მოდელი რეალურ დროში ძიებით',
        url: 'https://mypen.ge/models/gemini',
        category: 'AI Model',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HubPageHero
            badge="Google-ის მოდელი"
            title="Gemini საქართველოში"
            description="გამოიყენეთ Google Gemini - AI, რომელსაც აქვს პირდაპირი წვდომა ინტერნეტზე. მიიღეთ უახლესი ინფორმაცია და სწრაფი პასუხები."
            ctaText="სცადეთ Gemini უფასოდ"
            ctaId="cta_gemini_hero"
          />

          {/* Features Section */}
          <section className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                  შესაძლებლობები
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  რატომ Gemini?
                </h2>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {features.map((feature, i) => (
                  <motion.div key={i} variants={item}>
                    <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className={`size-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                  გამოყენების სფეროები
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  ვისთვისაა Gemini საუკეთესო
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground">{useCase.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                  როგორ მუშაობს
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  3 მარტივი ნაბიჯი
                </h2>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="text-center"
                  >
                    <div className="size-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-500">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8"
                  asChild
                >
                  <SmartCtaLink data-cta-id="cta_gemini_steps">
                    დაიწყეთ ახლავე
                    <ArrowRight className="ml-2 size-4" />
                  </SmartCtaLink>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  დაკავშირებული სტატიები
                </h2>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
                <Link href="/blog/gemini-vs-chatgpt-research" className="block">
                  <Card className="h-full border-border/40 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">Gemini vs ChatGPT: კვლევაში რომელი ჯობია?</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/sauketheso-ai-modeli-2025" className="block">
                  <Card className="h-full border-border/40 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">საუკეთესო AI მოდელი 2025</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/chatgpt-vs-claude-georgia" className="block">
                  <Card className="h-full border-border/40 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ChatGPT vs Claude: რომელი ჯობია?</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <HubPageFaq
            title="ხშირად დასმული კითხვები Gemini-ზე"
            faqs={faqs}
          />

          {/* CTA Section */}
          <HubPageCta
            title="მზად ხართ Gemini-ის გამოსაყენებლად?"
            description="გამოიყენეთ Google Gemini - AI რეალურ დროში ძიებით."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_gemini_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
