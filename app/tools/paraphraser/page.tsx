"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { RefreshCw, Sparkles, Zap, Target, Shield, Clock, ArrowRight } from "lucide-react"
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
  "textis gadaketeba",
  "paraphraser kartulad",
  "gadafrasireba",
  "teqstis gadaketeba",
  "rewrite text georgian",
  "parafrazireba",
]

const features = [
  {
    title: "ტექსტის გადაკეთება",
    description: "გადააკეთეთ ტექსტი ახალი სიტყვებით, შეინარჩუნეთ აზრი.",
    icon: <RefreshCw className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "სტილის არჩევა",
    description: "აკადემიური, კრეატიული, ოფიციალური ან არაფორმალური - აირჩიეთ სტილი.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "სწრაფი შედეგი",
    description: "მიიღეთ გადაკეთებული ტექსტი წამებში - დაზოგეთ დრო.",
    icon: <Zap className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "აზრის შენარჩუნება",
    description: "ტექსტის მნიშვნელობა და კონტექსტი რჩება უცვლელი.",
    icon: <Target className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "პლაგიატის თავიდან აცილება",
    description: "გადააკეთეთ ტექსტი ორიგინალურობის გაზრდისთვის.",
    icon: <Shield className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "დროის დაზოგვა",
    description: "რაც ხელით საათებს მოითხოვდა, AI წამებში აკეთებს.",
    icon: <Clock className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "სტუდენტებისთვის",
    description: "რეფერატების გადაკეთება, ციტატების პერიფრაზირება, ორიგინალურობის გაზრდა.",
  },
  {
    title: "კონტენტ-მეიკერებისთვის",
    description: "ბლოგების განახლება, სოციალური მედიის პოსტების ვარიაციები.",
  },
  {
    title: "მარკეტერებისთვის",
    description: "რეკლამის ტექსტების A/B ვერსიები, იმეილების ვარიაციები.",
  },
  {
    title: "მთარგმნელებისთვის",
    description: "თარგმანის გაუმჯობესება, ბუნებრივი ენის მიღწევა.",
  },
]

const steps = [
  {
    number: "1",
    title: "ჩასვით ტექსტი",
    description: "დააკოპირეთ და ჩასვით ტექსტი, რომლის გადაკეთებაც გსურთ.",
  },
  {
    number: "2",
    title: "აირჩიეთ სტილი",
    description: "მიუთითეთ სასურველი სტილი (ფორმალური, კრეატიული და სხვ.).",
  },
  {
    number: "3",
    title: "მიიღეთ შედეგი",
    description: "AI გადააკეთებს ტექსტს და მიიღებთ ახალ ვერსიას.",
  },
]

const faqs = [
  {
    question: "რა არის ტექსტის პარაფრაზირება?",
    answer: "პარაფრაზირება ნიშნავს ტექსტის გადაწერას სხვა სიტყვებით, ძირითადი აზრის შენარჩუნებით. ეს დაგეხმარებათ პლაგიატის თავიდან აცილებაში და ტექსტის ორიგინალურობის გაზრდაში.",
  },
  {
    question: "როგორ მუშაობს AI პარაფრეიზერი?",
    answer: "AI ანალიზებს თქვენს ტექსტს, ესმის კონტექსტი და აზრი, შემდეგ გადაწერს მას ახალი სიტყვებითა და სტრუქტურით, შეინარჩუნებს რა მნიშვნელობას.",
  },
  {
    question: "შეინარჩუნებს AI ტექსტის აზრს?",
    answer: "დიახ, Mypen-ის AI პარაფრეიზერი სპეციალურად შექმნილია იმისთვის, რომ შეინარჩუნოს ორიგინალი ტექსტის მნიშვნელობა და კონტექსტი.",
  },
  {
    question: "შემიძლია აკადემიური ტექსტების გადაკეთება?",
    answer: "დიახ, შეგიძლიათ აირჩიოთ აკადემიური სტილი და AI გადააკეთებს ტექსტს შესაბამისი ფორმალური ენით.",
  },
  {
    question: "არის ეს უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ გამოიყენოთ პარაფრეიზერი უფასოდ ყოველდღიური ლიმიტით. უფრო მეტი გამოყენებისთვის აირჩიეთ PRO ან ULTRA.",
  },
  {
    question: "რა ენებს მხარს უჭერს?",
    answer: "Mypen-ის პარაფრეიზერი კარგად მუშაობს ქართულ და ინგლისურ ენებზე, ასევე სხვა ენებზე.",
  },
]

export default function ParaphraserPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ინსტრუმენტები', url: 'https://mypen.ge/tools' },
    { name: 'პარაფრეიზერი', url: 'https://mypen.ge/tools/paraphraser' },
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
      <JsonLd data={generateProductSchema({
        name: 'ტექსტის გადაკეთება AI-ით - Mypen.ge',
        description: 'გადააკეთეთ ტექსტი ახალი სიტყვებით - AI პარაფრეიზერი ქართულად',
        url: 'https://mypen.ge/tools/paraphraser',
        category: 'AI Tool',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI ინსტრუმენტი"
            title="ტექსტის გადაკეთება AI-ით"
            description="გადააკეთეთ ნებისმიერი ტექსტი ახალი სიტყვებით - შეინარჩუნეთ აზრი, გააუმჯობესეთ სტილი და აირიდეთ პლაგიატი."
            ctaText="სცადეთ უფასოდ"
            ctaId="cta_paraphraser_hero"
          />

          <section className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                  შესაძლებლობები
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  რა შეუძლია პარაფრეიზერს?
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
                    <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10">
                      <CardContent className="p-6">
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

          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                  გამოყენება
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  ვისთვისაა სასარგებლო?
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full border-border/40">
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

          <section className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
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
                    transition={{ delay: i * 0.15 }}
                    className="text-center"
                  >
                    <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="rounded-full h-12 px-8" asChild>
                  <SmartCtaLink data-cta-id="cta_paraphraser_steps">
                    დაიწყეთ ახლავე
                    <ArrowRight className="ml-2 size-4" />
                  </SmartCtaLink>
                </Button>
              </div>
            </div>
          </section>

          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold">დაკავშირებული სტატიები</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
                <Link href="/blog/textis-gadafrasireba-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ტექსტის გადაფრასირება AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/kartuli-spellchecker" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ქართული სპელჩეკერი</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <HubPageFaq faqs={faqs} />

          <HubPageCta
            title="მზად ხართ ტექსტის გადასაკეთებლად?"
            description="სცადეთ AI პარაფრეიზერი უფასოდ და დაზოგეთ დრო."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_paraphraser_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
