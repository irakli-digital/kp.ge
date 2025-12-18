"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Languages, FileText, Zap, Target, Globe, Sparkles, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { HubPageHero, HubPageCta, HubPageFaq } from "@/components/hub"
import { SmartCtaLink } from "@/components/smart-cta-link"
import JsonLd from "@/components/JsonLd"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema"

const schemaKeywords = [
  "targmna ai",
  "mtargmneli",
  "inglisuridan kartulad",
  "translator english georgian",
  "kartulidan inglisuri",
]

const features = [
  {
    title: "კონტექსტური თარგმნა",
    description: "AI ესმის კონტექსტს და თარგმნის აზრობრივად, არა სიტყვასიტყვით.",
    icon: <Languages className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "დოკუმენტების თარგმნა",
    description: "ატვირთეთ PDF ან Word და მიიღეთ თარგმანი - ფორმატის შენარჩუნებით.",
    icon: <FileText className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "სწრაფი შედეგი",
    description: "დიდი ტექსტების თარგმნა წამებში - დაზოგეთ დრო.",
    icon: <Zap className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "ზუსტი თარგმანი",
    description: "AI ითვალისწინებს ნიუანსებს, იდიომებს და ტერმინოლოგიას.",
    icon: <Target className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "100+ ენა",
    description: "თარგმნეთ ნებისმიერი ენიდან ნებისმიერ ენაზე.",
    icon: <Globe className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "სტილის შენარჩუნება",
    description: "ფორმალური, არაფორმალური, ტექნიკური - სტილი რჩება.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "სტუდენტებისთვის",
    description: "უცხოური სტატიების, სახელმძღვანელოების თარგმნა.",
  },
  {
    title: "ბიზნესისთვის",
    description: "კონტრაქტების, წერილების, დოკუმენტების თარგმნა.",
  },
  {
    title: "მოგზაურებისთვის",
    description: "მენიუების, ტაბლოების, ინსტრუქციების თარგმნა.",
  },
  {
    title: "მთარგმნელებისთვის",
    description: "სწრაფი დრაფტის მიღება, რომელსაც შემდეგ დახვეწავთ.",
  },
]

const steps = [
  {
    number: "1",
    title: "შეიყვანეთ ტექსტი",
    description: "ჩასვით ტექსტი ან ატვირთეთ დოკუმენტი.",
  },
  {
    number: "2",
    title: "აირჩიეთ ენები",
    description: "მიუთითეთ საწყისი და სამიზნე ენა.",
  },
  {
    number: "3",
    title: "მიიღეთ თარგმანი",
    description: "AI თარგმნის კონტექსტის გათვალისწინებით.",
  },
]

const faqs = [
  {
    question: "რით განსხვავდება AI მთარგმნელი Google Translate-ისგან?",
    answer: "AI მთარგმნელი ესმის კონტექსტს და თარგმნის აზრობრივად. Google Translate ხშირად თარგმნის სიტყვასიტყვით, რაც არაბუნებრივ შედეგს იძლევა.",
  },
  {
    question: "შეუძლია დოკუმენტების თარგმნა?",
    answer: "დიახ, შეგიძლიათ ატვირთოთ PDF ან Word დოკუმენტი და AI თარგმნის მთელ ტექსტს ფორმატის შენარჩუნებით.",
  },
  {
    question: "რა ენებს მხარს უჭერს?",
    answer: "Mypen-ის AI მთარგმნელი მხარს უჭერს 100+ ენას, მათ შორის ქართულს, ინგლისურს, რუსულს, გერმანულს და სხვა.",
  },
  {
    question: "რამდენად ზუსტია თარგმანი?",
    answer: "AI თარგმანი ძალიან ზუსტია ყოველდღიური და ბიზნეს ტექსტებისთვის. ტექნიკური ან იურიდიული დოკუმენტებისთვის რეკომენდებულია პროფესიონალის გადახედვა.",
  },
  {
    question: "არის უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ თარგმნოთ ტექსტები უფასოდ ყოველდღიური ლიმიტით. დიდი დოკუმენტებისთვის აირჩიეთ PRO ან ULTRA.",
  },
]

export default function TranslatorPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ინსტრუმენტები', url: 'https://mypen.ge/tools' },
    { name: 'მთარგმნელი', url: 'https://mypen.ge/tools/translator' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <JsonLd data={generateProductSchema({
        name: 'AI მთარგმნელი - Mypen.ge',
        description: 'თარგმნეთ ტექსტები და დოკუმენტები AI-ით - კონტექსტური და ზუსტი თარგმანი',
        url: 'https://mypen.ge/tools/translator',
        category: 'AI Tool',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI ინსტრუმენტი"
            title="AI მთარგმნელი"
            description="თარგმნეთ ტექსტები და დოკუმენტები AI-ით - მიიღეთ კონტექსტური, ბუნებრივი თარგმანი 100+ ენაზე."
            ctaText="თარგმნეთ უფასოდ"
            ctaId="cta_translator_hero"
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
                  რატომ AI მთარგმნელი?
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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">ვისთვისაა სასარგებლო?</h2>
              </div>

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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">3 მარტივი ნაბიჯი</h2>
              </div>

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
                  <SmartCtaLink data-cta-id="cta_translator_steps">
                    დაიწყეთ თარგმნა
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
                <Link href="/blog/inglisuridan-kartulad-targmna" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ინგლისურიდან ქართულად თარგმნა AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/pdf-targmna-analizi" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">PDF თარგმნა და ანალიზი</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <HubPageFaq faqs={faqs} />

          <HubPageCta
            title="მზად ხართ თარგმნისთვის?"
            description="სცადეთ AI მთარგმნელი უფასოდ - მიიღეთ კონტექსტური თარგმანი."
            ctaText="თარგმნეთ უფასოდ"
            ctaId="cta_translator_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
