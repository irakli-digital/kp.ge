"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, Languages, Zap, BookOpen, Lightbulb, Target, ArrowRight } from "lucide-react"
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
  "spellchecker kartulad",
  "gramatikis shemowmeba",
  "spell checker georgia",
  "ortografiis shemowmeba",
  "kartuli enis shemowmeba",
]

const features = [
  {
    title: "ორთოგრაფიის შემოწმება",
    description: "აღმოაჩინეთ და გაასწორეთ მართლწერის შეცდომები ქართულ ტექსტში.",
    icon: <CheckCircle className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "გრამატიკის ანალიზი",
    description: "AI ამოიცნობს გრამატიკულ შეცდომებს და შესთავაზებს გასწორებას.",
    icon: <BookOpen className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "ქართული ენა 100%",
    description: "სპეციალურად ოპტიმიზებული ქართული ენისთვის - ესმის კონტექსტი.",
    icon: <Languages className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "სწრაფი შემოწმება",
    description: "დიდი ტექსტების შემოწმება წამებში - დაზოგეთ დრო.",
    icon: <Zap className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "სტილის რჩევები",
    description: "მიიღეთ რჩევები ტექსტის გასაუმჯობესებლად.",
    icon: <Lightbulb className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
  {
    title: "პუნქტუაცია",
    description: "შეამოწმეთ მძიმეები, წერტილები და სხვა სასვენი ნიშნები.",
    icon: <Target className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
]

const useCases = [
  {
    title: "სტუდენტებისთვის",
    description: "რეფერატების, ნაშრომების და საკურსოების შემოწმება.",
  },
  {
    title: "პროფესიონალებისთვის",
    description: "ბიზნეს წერილების, ანგარიშების გადახედვა.",
  },
  {
    title: "მწერლებისთვის",
    description: "სტატიების, ბლოგების ორთოგრაფიის შემოწმება.",
  },
  {
    title: "მთარგმნელებისთვის",
    description: "თარგმანების გრამატიკული სისწორის უზრუნველყოფა.",
  },
]

const steps = [
  {
    number: "1",
    title: "ჩასვით ტექსტი",
    description: "დააკოპირეთ ტექსტი ჩათში.",
  },
  {
    number: "2",
    title: "მოითხოვეთ შემოწმება",
    description: "სთხოვეთ AI-ს გრამატიკის შემოწმება.",
  },
  {
    number: "3",
    title: "მიიღეთ გასწორება",
    description: "AI მონიშნავს შეცდომებს და შესთავაზებს გასწორებას.",
  },
]

const faqs = [
  {
    question: "როგორ მუშაობს ქართული სპელჩეკერი?",
    answer: "AI ანალიზებს თქვენს ტექსტს, ამოიცნობს ორთოგრაფიულ და გრამატიკულ შეცდომებს და გთავაზობთ გასწორების ვარიანტებს კონტექსტის გათვალისწინებით.",
  },
  {
    question: "შეუძლია AI-ს კონტექსტის გაგება?",
    answer: "დიახ, განსხვავებით ჩვეულებრივი სპელჩეკერებისგან, AI ესმის კონტექსტს და ამოიცნობს შეცდომებს, რომლებიც მხოლოდ კონტექსტში ჩანს.",
  },
  {
    question: "რა ტიპის შეცდომებს ამოიცნობს?",
    answer: "AI ამოიცნობს ორთოგრაფიულ შეცდომებს, გრამატიკულ შეცდომებს, პუნქტუაციის პრობლემებს და სტილისტურ შეუსაბამობებს.",
  },
  {
    question: "არის უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ შეამოწმოთ ტექსტები უფასოდ ყოველდღიური ლიმიტით.",
  },
  {
    question: "შეიძლება დიდი დოკუმენტების შემოწმება?",
    answer: "დიახ, PRO და ULTRA პაკეტებით შეგიძლიათ შეამოწმოთ დიდი დოკუმენტები შეზღუდვის გარეშე.",
  },
]

export default function SpellcheckerPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ინსტრუმენტები', url: 'https://mypen.ge/tools' },
    { name: 'სპელჩეკერი', url: 'https://mypen.ge/tools/spellchecker' },
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
        name: 'ქართული სპელჩეკერი - Mypen.ge',
        description: 'შეამოწმეთ ქართული ტექსტის გრამატიკა და ორთოგრაფია AI-ით',
        url: 'https://mypen.ge/tools/spellchecker',
        category: 'AI Tool',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI ინსტრუმენტი"
            title="ქართული სპელჩეკერი"
            description="შეამოწმეთ ქართული ტექსტის გრამატიკა, ორთოგრაფია და პუნქტუაცია AI-ის დახმარებით - სწრაფად და ზუსტად."
            ctaText="შეამოწმეთ უფასოდ"
            ctaId="cta_spellchecker_hero"
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
                  რა შეუძლია სპელჩეკერს?
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
                  <SmartCtaLink data-cta-id="cta_spellchecker_steps">
                    დაიწყეთ შემოწმება
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
                <Link href="/blog/kartuli-spellchecker" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ქართული სპელჩეკერი: გრამატიკის შემოწმება AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/textis-gadafrasireba-ai" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ტექსტის გადაფრასირება AI-ით</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          <HubPageFaq faqs={faqs} />

          <HubPageCta
            title="მზად ხართ ტექსტის შესამოწმებლად?"
            description="სცადეთ ქართული სპელჩეკერი უფასოდ."
            ctaText="შეამოწმეთ უფასოდ"
            ctaId="cta_spellchecker_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
