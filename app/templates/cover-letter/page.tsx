"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Pen, Target, Sparkles, Zap, Heart, CheckCircle, ArrowRight } from "lucide-react"
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
  "samotivacio werili",
  "cover letter georgia",
  "motivaciis werili",
  "samotivacio werilის dawera",
  "cover letter shabloni",
]

const features = [
  {
    title: "პერსონალიზებული წერილი",
    description: "AI შექმნის წერილს, რომელიც პირდაპირ მიმართავს კომპანიას და პოზიციას.",
    icon: <Pen className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "ვაკანსიაზე მორგება",
    description: "მიუთითეთ ვაკანსია და AI ხაზს გაუსვამს რელევანტურ გამოცდილებას.",
    icon: <Target className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "პროფესიონალური ტონი",
    description: "ფორმალური, მეგობრული ან კრეატიული - აირჩიეთ სტილი.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "სწრაფი შედეგი",
    description: "მიიღეთ მზა წერილი წუთებში, არა საათებში.",
    icon: <Zap className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "ემოციური კავშირი",
    description: "AI დაგეხმარებათ გამოხატოთ მოტივაცია და ენთუზიაზმი.",
    icon: <Heart className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "გრამატიკის შემოწმება",
    description: "AI უზრუნველყოფს სრულყოფილ გრამატიკას და სტილს.",
    icon: <CheckCircle className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "პირველი სამსახური",
    description: "წარმოადგინეთ ენთუზიაზმი და სწავლის სურვილი.",
  },
  {
    title: "კარიერის ცვლილება",
    description: "ახსენით რატომ გსურთ ახალი მიმართულება.",
  },
  {
    title: "უცხოეთში დასაქმება",
    description: "პროფესიონალური ინგლისური სამოტივაციო წერილი.",
  },
  {
    title: "სტაჟირება",
    description: "გამოარჩიეთ თავი სხვა კანდიდატებისგან.",
  },
]

const steps = [
  {
    number: "1",
    title: "მიაწოდეთ ინფორმაცია",
    description: "თქვენი გამოცდილება, უნარები და რატომ გსურთ ეს პოზიცია.",
  },
  {
    number: "2",
    title: "მიუთითეთ კომპანია",
    description: "კომპანიის სახელი და პოზიცია - AI მოარგებს წერილს.",
  },
  {
    number: "3",
    title: "მიიღეთ წერილი",
    description: "AI შექმნის პერსონალიზებულ სამოტივაციო წერილს.",
  },
]

const faqs = [
  {
    question: "რა უნდა შეიცავდეს სამოტივაციო წერილი?",
    answer: "სამოტივაციო წერილი უნდა შეიცავდეს: მოკლე შესავალს, რატომ გსურთ ეს პოზიცია, თქვენს რელევანტურ გამოცდილებას და უნარებს, და მოტივაციას კომპანიაში მუშაობისთვის.",
  },
  {
    question: "რა სიგრძის უნდა იყოს წერილი?",
    answer: "იდეალური სამოტივაციო წერილი არის 250-400 სიტყვა (დაახლოებით 1 გვერდი). AI შექმნის ოპტიმალური სიგრძის წერილს.",
  },
  {
    question: "შეუძლია AI-ს წერილის პერსონალიზება?",
    answer: "დიახ, თუ მიუთითებთ კომპანიის სახელს და პოზიციას, AI შექმნის პერსონალიზებულ წერილს, რომელიც პირდაპირ მიმართავს ამ ვაკანსიას.",
  },
  {
    question: "რა ენებზე შეიძლება წერილის შექმნა?",
    answer: "შეგიძლიათ შექმნათ სამოტივაციო წერილი ქართულად, ინგლისურად და სხვა ენებზე.",
  },
  {
    question: "როგორ განსხვავდება CV-სგან?",
    answer: "CV არის ფაქტობრივი ინფორმაცია თქვენი გამოცდილების შესახებ. სამოტივაციო წერილი არის თხრობითი ტექსტი, რომელიც ხსნის რატომ ხართ იდეალური კანდიდატი.",
  },
]

export default function CoverLetterPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'შაბლონები', url: 'https://mypen.ge/templates' },
    { name: 'სამოტივაციო წერილი', url: 'https://mypen.ge/templates/cover-letter' },
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
        name: 'სამოტივაციო წერილი AI-ით - Mypen.ge',
        description: 'შექმენით პერსონალიზებული სამოტივაციო წერილი AI-ის დახმარებით',
        url: 'https://mypen.ge/templates/cover-letter',
        category: 'Template',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI შაბლონი"
            title="სამოტივაციო წერილის შექმნა"
            description="შექმენით პერსონალიზებული სამოტივაციო წერილი, რომელიც გამოგარჩევთ კონკურენტებისგან - AI დაგეხმარებათ გამოხატოთ მოტივაცია და ენთუზიაზმი."
            ctaText="შექმენით წერილი უფასოდ"
            ctaId="cta_cover_hero"
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
                  რატომ AI სამოტივაციო წერილი?
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
                  <SmartCtaLink data-cta-id="cta_cover_steps">
                    შექმენით წერილი
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
                <Link href="/blog/samotivacio-werili-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">სამოტივაციო წერილის დაწერა AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/cv-dawera-ai-2025" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">როგორ დავწეროთ CV AI-ით</p>
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
            title="მზად ხართ სამოტივაციო წერილის შესაქმნელად?"
            description="შექმენით პერსონალიზებული წერილი AI-ით - გამოირჩიეთ კონკურენტებისგან."
            ctaText="შექმენით წერილი უფასოდ"
            ctaId="cta_cover_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
