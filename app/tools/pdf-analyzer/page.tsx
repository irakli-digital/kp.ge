"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Search, Table, MessageSquare, Download, Zap, ArrowRight } from "lucide-react"
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
  "pdf analizi",
  "dokumentis analizi",
  "pdf ai",
  "pdf shejameba",
  "dokumentis damuSaveba",
]

const features = [
  {
    title: "PDF შეჯამება",
    description: "ატვირთეთ დიდი PDF და მიიღეთ მოკლე, გასაგები შეჯამება.",
    icon: <FileText className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "ინფორმაციის ძიება",
    description: "დასვით კითხვები დოკუმენტის შესახებ და მიიღეთ ზუსტი პასუხები.",
    icon: <Search className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "მონაცემების ამოღება",
    description: "ამოიღეთ ცხრილები, რიცხვები და მთავარი მონაცემები.",
    icon: <Table className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "კითხვა-პასუხი",
    description: "ესაუბრეთ დოკუმენტს - დასვით კითხვები ბუნებრივ ენაზე.",
    icon: <MessageSquare className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "მრავალი ფორმატი",
    description: "PDF, Word, Excel, PowerPoint - ყველა ფორმატის მხარდაჭერა.",
    icon: <Download className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "სწრაფი დამუშავება",
    description: "დიდი დოკუმენტების ანალიზი წამებში.",
    icon: <Zap className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "სტუდენტებისთვის",
    description: "სახელმძღვანელოების, სტატიების და კვლევების შეჯამება.",
  },
  {
    title: "მკვლევარებისთვის",
    description: "სამეცნიერო ნაშრომების ანალიზი და ლიტერატურის მიმოხილვა.",
  },
  {
    title: "იურისტებისთვის",
    description: "კონტრაქტების, ხელშეკრულებების ანალიზი.",
  },
  {
    title: "ბიზნესისთვის",
    description: "ანგარიშების, პრეზენტაციების გადახედვა.",
  },
]

const steps = [
  {
    number: "1",
    title: "ატვირთეთ ფაილი",
    description: "ატვირთეთ PDF ან სხვა დოკუმენტი.",
  },
  {
    number: "2",
    title: "დასვით კითხვა",
    description: "სთხოვეთ შეჯამება ან დასვით კითხვები.",
  },
  {
    number: "3",
    title: "მიიღეთ პასუხი",
    description: "AI გააანალიზებს და გაგცემთ პასუხს.",
  },
]

const faqs = [
  {
    question: "რა ზომის PDF შეიძლება ატვირთვა?",
    answer: "Mypen ULTRA-ით შეგიძლიათ ატვირთოთ დიდი PDF ფაილები. Light და PRO პაკეტებს აქვთ ზომის ლიმიტი.",
  },
  {
    question: "შეუძლია AI-ს ცხრილების ამოღება?",
    answer: "დიახ, AI-ს შეუძლია ამოიცნოს და ამოიღოს ცხრილები PDF დოკუმენტებიდან.",
  },
  {
    question: "რა ენებს მხარს უჭერს?",
    answer: "Mypen მხარს უჭერს ქართულ, ინგლისურ და სხვა ენებს - შეგიძლიათ ატვირთოთ სხვადასხვა ენის დოკუმენტები.",
  },
  {
    question: "შეიძლება Word/Excel ფაილების ანალიზი?",
    answer: "დიახ, გარდა PDF-ისა, შეგიძლიათ ატვირთოთ Word, Excel და PowerPoint ფაილები.",
  },
  {
    question: "რამდენად ზუსტია შეჯამება?",
    answer: "AI ცდილობს შეინარჩუნოს ყველა მთავარი პუნქტი. რთული ან ტექნიკური დოკუმენტებისთვის შეგიძლიათ დამატებითი კითხვების დასმა.",
  },
]

export default function PdfAnalyzerPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ინსტრუმენტები', url: 'https://mypen.ge/tools' },
    { name: 'PDF ანალიზი', url: 'https://mypen.ge/tools/pdf-analyzer' },
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
        name: 'PDF ანალიზი AI-ით - Mypen.ge',
        description: 'გააანალიზეთ, შეაჯამეთ და დაუსვით კითხვები PDF დოკუმენტებს AI-ით',
        url: 'https://mypen.ge/tools/pdf-analyzer',
        category: 'AI Tool',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI ინსტრუმენტი"
            title="PDF ანალიზი AI-ით"
            description="ატვირთეთ PDF ან Word დოკუმენტი და მიიღეთ შეჯამება, ამოიღეთ მონაცემები ან დაუსვით კითხვები - AI დაგეხმარებათ."
            ctaText="სცადეთ უფასოდ"
            ctaId="cta_pdf_hero"
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
                  რა შეუძლია PDF ანალიზატორს?
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
                  <SmartCtaLink data-cta-id="cta_pdf_steps">
                    ატვირთეთ დოკუმენტი
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
              <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
                <Link href="/blog/pdf-targmna-analizi" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">PDF თარგმნა და ანალიზი</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/referatis-dawera-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">რეფერატის დაწერა AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/wignis-shejameba-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">წიგნის შეჯამება AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <HubPageFaq faqs={faqs} />

          <HubPageCta
            title="მზად ხართ დოკუმენტის გასაანალიზებლად?"
            description="ატვირთეთ PDF და მიიღეთ შეჯამება წამებში."
            ctaText="სცადეთ უფასოდ"
            ctaId="cta_pdf_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
