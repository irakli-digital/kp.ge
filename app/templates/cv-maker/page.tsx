"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Sparkles, Zap, Target, CheckCircle, Download, ArrowRight } from "lucide-react"
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
  "cv dawera",
  "reziumes dawera",
  "cv shabloni",
  "cv maker georgia",
  "cv is dawera",
  "rezume shabloni",
]

const features = [
  {
    title: "პროფესიონალური CV",
    description: "AI დაგეხმარებათ შექმნათ პროფესიონალური CV, რომელიც გამოარჩევს კონკურენტებისგან.",
    icon: <FileText className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "პერსონალიზაცია",
    description: "მორგებული CV თითოეული ვაკანსიისთვის - AI გაითვალისწინებს პოზიციის მოთხოვნებს.",
    icon: <Target className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "საკვანძო სიტყვები",
    description: "AI ჩართავს საკვანძო სიტყვებს, რომლებსაც HR-ები და ATS სისტემები ეძებენ.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "სწრაფი შედეგი",
    description: "შექმენით CV წუთებში - არა საათებში.",
    icon: <Zap className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "გრამატიკის შემოწმება",
    description: "AI შეამოწმებს გრამატიკას და სტილს - დარწმუნდებით პროფესიონალიზმში.",
    icon: <CheckCircle className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "მრავალი ფორმატი",
    description: "მიიღეთ CV სხვადასხვა ფორმატში - Word, PDF ან ტექსტი.",
    icon: <Download className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "პირველი სამსახური",
    description: "კარიერის დასაწყებად - AI დაგეხმარებათ სწორად წარმოადგინოთ უნარები.",
  },
  {
    title: "კარიერის ცვლილება",
    description: "ახალ სფეროში გადასვლისთვის - გადმოიტანეთ გამოცდილება.",
  },
  {
    title: "დაწინაურება",
    description: "შიდა ვაკანსიებისთვის - ხაზი გაუსვით მიღწევებს.",
  },
  {
    title: "ფრილანსერებისთვის",
    description: "პროექტების და კლიენტების წარმოსადგენად.",
  },
]

const steps = [
  {
    number: "1",
    title: "შეიყვანეთ ინფორმაცია",
    description: "მიაწოდეთ AI-ს თქვენი გამოცდილება, უნარები და განათლება.",
  },
  {
    number: "2",
    title: "მიუთითეთ პოზიცია",
    description: "რა ვაკანსიისთვის ამზადებთ CV-ს - AI მოარგებს კონტენტს.",
  },
  {
    number: "3",
    title: "მიიღეთ CV",
    description: "AI შექმნის პროფესიონალურ CV-ს, რომელსაც დახვეწავთ.",
  },
]

const faqs = [
  {
    question: "როგორ მუშაობს AI CV მეიკერი?",
    answer: "თქვენ მიაწვდით AI-ს თქვენს გამოცდილებას, უნარებს და იმ პოზიციას, რომელზეც აპლიკაციას აკეთებთ. AI შექმნის პროფესიონალურ CV-ს, რომელიც მორგებულია ვაკანსიაზე.",
  },
  {
    question: "შეუძლია AI-ს CV-ს პერსონალიზება?",
    answer: "დიახ, AI-ს შეუძლია მოარგოს CV თითოეულ ვაკანსიას - ხაზს უსვამს რელევანტურ გამოცდილებას და უნარებს.",
  },
  {
    question: "რა ენებზე შეიძლება CV-ს შექმნა?",
    answer: "შეგიძლიათ შექმნათ CV ქართულად, ინგლისურად და სხვა ენებზე.",
  },
  {
    question: "როგორ გავიტანო CV?",
    answer: "შეგიძლიათ დააკოპიროთ ტექსტი ან სთხოვოთ AI-ს ფორმატირებული ვერსია Word-ისთვის.",
  },
  {
    question: "არის უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ შექმნათ CV უფასოდ. უფრო დეტალური CV-ებისთვის და მრავალჯერადი გენერაციისთვის აირჩიეთ PRO ან ULTRA.",
  },
  {
    question: "შეამოწმებს AI გრამატიკას?",
    answer: "დიახ, AI ავტომატურად შეამოწმებს გრამატიკას, ორთოგრაფიას და სტილს.",
  },
]

export default function CvMakerPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'შაბლონები', url: 'https://mypen.ge/templates' },
    { name: 'CV მეიკერი', url: 'https://mypen.ge/templates/cv-maker' },
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
        name: 'CV მეიკერი AI-ით - Mypen.ge',
        description: 'შექმენით პროფესიონალური CV AI-ის დახმარებით - სწრაფად და მარტივად',
        url: 'https://mypen.ge/templates/cv-maker',
        category: 'Template',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI შაბლონი"
            title="CV-ის შექმნა AI-ით"
            description="შექმენით პროფესიონალური CV წუთებში - AI დაგეხმარებათ სწორად წარმოადგინოთ გამოცდილება და უნარები თითოეული ვაკანსიისთვის."
            ctaText="შექმენით CV უფასოდ"
            ctaId="cta_cv_hero"
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
                  რატომ AI CV მეიკერი?
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
                  <SmartCtaLink data-cta-id="cta_cv_steps">
                    შექმენით CV
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
                <Link href="/blog/cv-dawera-ai-2025" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">როგორ დავწეროთ CV AI-ით (2025)</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/cv-vs-rezume-ganskhvaveba" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">CV vs რეზიუმე: განსხვავება</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/intervius-momzadeba-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ინტერვიუს მომზადება AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <HubPageFaq faqs={faqs} />

          <HubPageCta
            title="მზად ხართ CV-ის შესაქმნელად?"
            description="შექმენით პროფესიონალური CV AI-ით - გამოირჩიეთ კონკურენტებისგან."
            ctaText="შექმენით CV უფასოდ"
            ctaId="cta_cv_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
