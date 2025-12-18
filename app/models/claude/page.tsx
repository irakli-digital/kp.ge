"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Pen, Brain, Shield, FileText, Languages, Sparkles, Check, ArrowRight } from "lucide-react"
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
  "claude ai georgia",
  "claude kartulad",
  "anthropic georgia",
  "claude 3.5",
  "claude sonnet georgia",
  "claude opus georgia",
]

const features = [
  {
    title: "ბუნებრივი წერის სტილი",
    description: "Claude-ს აქვს ყველაზე ბუნებრივი და ადამიანური წერის სტილი - იდეალური ქართული ტექსტებისთვის.",
    icon: <Pen className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "ღრმა ანალიზი",
    description: "Claude განსაკუთრებით კარგია რთული ტექსტების გაანალიზებასა და დეტალური პასუხების მიწოდებაში.",
    icon: <Brain className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "უსაფრთხო და ეთიკური",
    description: "Anthropic-მა შექმნა Claude უსაფრთხოებაზე ფოკუსით - ის თავს არიდებს მავნე კონტენტს.",
    icon: <Shield className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "გრძელი დოკუმენტები",
    description: "Claude Opus-ს შეუძლია 200,000+ ტოკენის დამუშავება - იდეალური დიდი დოკუმენტებისთვის.",
    icon: <FileText className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "მულტილინგვური",
    description: "Claude კარგად ესმის და წერს ქართულად, ინგლისურად და სხვა ენებზე.",
    icon: <Languages className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    title: "კრეატიულობა",
    description: "Claude იდეალურია კრეატიული წერისთვის - სტატიები, სცენარები, მარკეტინგული ტექსტები.",
    icon: <Sparkles className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
]

const useCases = [
  {
    title: "მწერლებისთვის",
    description: "სტატიები, ბლოგები, სცენარები, კრეატიული წერა - Claude-ს ბუნებრივი სტილი იდეალურია.",
  },
  {
    title: "მკვლევარებისთვის",
    description: "აკადემიური ტექსტების ანალიზი, ლიტერატურის მიმოხილვა, კვლევის შეჯამება.",
  },
  {
    title: "იურისტებისთვის",
    description: "კონტრაქტების ანალიზი, იურიდიული დოკუმენტების შედგენა და გადახედვა.",
  },
  {
    title: "მარკეტერებისთვის",
    description: "რეკლამის ტექსტები, ბრენდის ხმა, სოციალური მედიის კონტენტი.",
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
    title: "აირჩიეთ Claude",
    description: "მოდელების სიიდან აირჩიეთ Claude Sonnet ან Opus.",
  },
  {
    number: "3",
    title: "დაიწყეთ წერა",
    description: "მიეცით ინსტრუქციები და მიიღეთ მაღალი ხარისხის ტექსტი.",
  },
]

const faqs = [
  {
    question: "რა არის Claude AI?",
    answer: "Claude არის Anthropic-ის მიერ შექმნილი AI ასისტენტი, რომელიც ცნობილია ბუნებრივი წერის სტილითა და უსაფრთხოებით. ის განსაკუთრებით კარგია კრეატიული წერისა და ანალიზისთვის.",
  },
  {
    question: "რა განსხვავებაა Claude Sonnet და Opus-ს შორის?",
    answer: "Claude Sonnet არის სწრაფი და ეფექტური - კარგია ყოველდღიური ამოცანებისთვის. Claude Opus არის ყველაზე მძლავრი, იდეალური რთული ანალიზისა და გრძელი დოკუმენტებისთვის.",
  },
  {
    question: "შეუძლია Claude-ს ქართულად წერა?",
    answer: "დიახ, Claude კარგად მუშაობს ქართულ ენაზე და წერს ბუნებრივი სტილით. Mypen-ზე ის ოპტიმიზებულია ქართული ტექსტებისთვის.",
  },
  {
    question: "როგორ გამოვიყენო Claude საქართველოში?",
    answer: "Mypen.ge-ზე შეგიძლიათ გამოიყენოთ Claude პირდაპირ, VPN-ის გარეშე. დარეგისტრირდით და აირჩიეთ Claude მოდელების სიიდან.",
  },
  {
    question: "რისთვის არის Claude უკეთესი ვიდრე ChatGPT?",
    answer: "Claude უკეთესია კრეატიული წერისთვის, გრძელი დოკუმენტების ანალიზისთვის და ბუნებრივი სტილის ტექსტებისთვის. ChatGPT უკეთესია კოდისა და ტექნიკური ამოცანებისთვის.",
  },
  {
    question: "არის Claude უფასო?",
    answer: "Mypen Light პაკეტით შეგიძლიათ გამოიყენოთ Claude უფასოდ ყოველდღიური ტოკენების ლიმიტით. PRO და ULTRA პაკეტები გთავაზობთ უფრო მეტ გამოყენებას.",
  },
]

export default function ClaudePage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'მოდელები', url: 'https://mypen.ge/models' },
    { name: 'Claude', url: 'https://mypen.ge/models/claude' },
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
        name: 'Claude AI ქართულად - Mypen.ge',
        description: 'გამოიყენეთ Claude AI ქართულად - Anthropic-ის მოდელები ერთ პლატფორმაზე',
        url: 'https://mypen.ge/models/claude',
        category: 'AI Model',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HubPageHero
            badge="Anthropic-ის მოდელი"
            title="Claude AI ქართულად"
            description="გამოიყენეთ Claude - AI, რომელსაც აქვს ყველაზე ბუნებრივი წერის სტილი. იდეალური კრეატიული წერისთვის, ანალიზისთვის და გრძელი დოკუმენტებისთვის."
            ctaText="სცადეთ Claude უფასოდ"
            ctaId="cta_claude_hero"
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
                  რატომ Claude?
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
                  ვისთვისაა Claude საუკეთესო
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
                    <div className="size-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-500">{step.number}</span>
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
                  <SmartCtaLink data-cta-id="cta_claude_steps">
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
                <Link href="/blog/claude-ai-kartulad" className="block">
                  <Card className="h-full border-border/40 hover:border-purple-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">Claude AI ქართულად: რატომ არის უკეთესი წერისთვის</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/chatgpt-vs-claude-georgia" className="block">
                  <Card className="h-full border-border/40 hover:border-purple-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ChatGPT vs Claude: რომელი ჯობია?</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/gpt5-vs-claude-opus-coding" className="block">
                  <Card className="h-full border-border/40 hover:border-purple-500/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">GPT-5 vs Claude Opus: კოდის წერაში</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <HubPageFaq
            title="ხშირად დასმული კითხვები Claude-ზე"
            faqs={faqs}
          />

          {/* CTA Section */}
          <HubPageCta
            title="მზად ხართ Claude-ის გამოსაყენებლად?"
            description="გამოიყენეთ Claude - AI ყველაზე ბუნებრივი წერის სტილით."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_claude_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
