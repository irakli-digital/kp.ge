"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Bot, Sparkles, Zap, Check, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { HubPageHero, HubPageCta } from "@/components/hub"
import { SmartCtaLink } from "@/components/smart-cta-link"
import JsonLd from "@/components/JsonLd"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema"

// Schema keywords (Latin for invisible SEO)
const schemaKeywords = [
  "ai models georgia",
  "chatgpt saqartveloshi",
  "claude ai kartulad",
  "gemini georgia",
  "sauketheso ai modeli",
  "ai modelis shedareba",
  "gpt vs claude",
]

const models = [
  {
    name: "ChatGPT",
    provider: "OpenAI",
    versions: ["GPT-4o", "GPT-5"],
    description: "ყველაზე პოპულარული AI ასისტენტი - შესანიშნავია საერთო დანიშნულებით, კრეატიული წერისა და კოდირებისთვის.",
    icon: "🤖",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    href: "/models/chatgpt",
    strengths: ["ვერსატილობა", "კოდი", "კრეატიულობა"],
    color: "emerald",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    versions: ["Claude 3.5 Sonnet", "Claude Opus"],
    description: "საუკეთესო ქართული ენისთვის - ბუნებრივი, თანმიმდევრული და ეთიკური პასუხებით.",
    icon: "🧠",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    href: "/models/claude",
    strengths: ["ქართული ენა", "ლოგიკა", "უსაფრთხოება"],
    color: "orange",
  },
  {
    name: "Gemini",
    provider: "Google",
    versions: ["Gemini 2.0 Flash", "Gemini 2.5 Pro"],
    description: "Google-ის მძლავრი AI - სწრაფი, მულტიმოდალური და Google სერვისებთან ინტეგრირებული.",
    icon: "💫",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    href: "/models/gemini",
    strengths: ["სიჩქარე", "რესერჩი", "ვიზუალი"],
    color: "blue",
  },
]

const comparisonPoints = [
  {
    category: "ქართული ენა",
    chatgpt: "კარგი",
    claude: "საუკეთესო",
    gemini: "კარგი",
    winner: "claude",
  },
  {
    category: "კოდირება",
    chatgpt: "საუკეთესო",
    claude: "ძალიან კარგი",
    gemini: "კარგი",
    winner: "chatgpt",
  },
  {
    category: "სიჩქარე",
    chatgpt: "სწრაფი",
    claude: "საშუალო",
    gemini: "ძალიან სწრაფი",
    winner: "gemini",
  },
  {
    category: "კრეატიულობა",
    chatgpt: "საუკეთესო",
    claude: "ძალიან კარგი",
    gemini: "კარგი",
    winner: "chatgpt",
  },
]

export default function ModelsPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'AI მოდელები', url: 'https://mypen.ge/models' },
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
        name: 'AI მოდელები - ChatGPT, Claude, Gemini - Mypen.ge',
        description: 'შეადარეთ და გამოიყენეთ საუკეთესო AI მოდელები ერთ პლატფორმაზე: ChatGPT, Claude, Gemini ქართულად',
        url: 'https://mypen.ge/models',
        category: 'AI Model',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI მოდელები"
            title="ყველა AI მოდელი ერთ ადგილას"
            description="რატომ გადაიხადოთ $60+ თვეში? მიიღეთ ChatGPT, Claude და Gemini ერთი გამოწერით, ოპტიმიზებული ქართული ენისთვის."
            ctaText="სცადეთ უფასოდ"
            ctaId="cta_models_hero"
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
                  ხელმისაწვდომი მოდელები
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  აირჩიეთ თქვენთვის შესაფერისი მოდელი
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  თითოეულ მოდელს აქვს თავისი ძლიერი მხარეები. Mypen-ით შეგიძლიათ ყველას გამოცდა და საუკეთესოს არჩევა.
                </p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-6 md:grid-cols-3"
              >
                {models.map((model, i) => (
                  <motion.div key={i} variants={item}>
                    <Link href={model.href} className="block h-full">
                      <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 hover:border-brand/50 hover:shadow-lg transition-all group">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`size-14 rounded-xl ${model.iconBg} flex items-center justify-center text-3xl`}>
                              {model.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold group-hover:text-brand transition-colors">
                                {model.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{model.provider}</p>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-4">{model.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {model.versions.map((version, j) => (
                              <Badge key={j} variant="secondary" className="text-xs">
                                {version}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-2 mb-4">
                            {model.strengths.map((strength, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-brand" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center text-sm text-brand font-medium group-hover:gap-2 transition-all">
                            <span>გაიგეთ მეტი</span>
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
                  შედარება
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  რომელი მოდელი ჯობია?
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  პასუხი დამოკიდებულია თქვენს საჭიროებებზე. აი, მოკლე შედარება:
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-4 font-semibold">კატეგორია</th>
                      <th className="p-4 font-semibold text-center">ChatGPT</th>
                      <th className="p-4 font-semibold text-center">Claude</th>
                      <th className="p-4 font-semibold text-center">Gemini</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonPoints.map((point, i) => (
                      <tr key={i} className="border-b border-border/40">
                        <td className="p-4 font-medium">{point.category}</td>
                        <td className={`p-4 text-center ${point.winner === 'chatgpt' ? 'text-brand font-semibold' : 'text-muted-foreground'}`}>
                          {point.chatgpt}
                          {point.winner === 'chatgpt' && ' ⭐'}
                        </td>
                        <td className={`p-4 text-center ${point.winner === 'claude' ? 'text-brand font-semibold' : 'text-muted-foreground'}`}>
                          {point.claude}
                          {point.winner === 'claude' && ' ⭐'}
                        </td>
                        <td className={`p-4 text-center ${point.winner === 'gemini' ? 'text-brand font-semibold' : 'text-muted-foreground'}`}>
                          {point.gemini}
                          {point.winner === 'gemini' && ' ⭐'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  ვერ გადაწყვიტეთ? სცადეთ სამივე და თვითონ აირჩიეთ საუკეთესო.
                </p>
                <Button size="lg" className="rounded-full h-12 px-8" asChild>
                  <SmartCtaLink data-cta-id="cta_models_comparison">
                    შეადარეთ თვითონ
                    <ArrowRight className="ml-2 size-4" />
                  </SmartCtaLink>
                </Button>
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
                  რატომ Mypen?
                </h2>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="text-center"
                >
                  <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💸</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">დაზოგეთ $40+/თვეში</h3>
                  <p className="text-muted-foreground">ChatGPT + Claude + Gemini = $60+. Mypen ULTRA = 69 ლარი.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🇬🇪</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">ქართული ინტერფეისი</h3>
                  <p className="text-muted-foreground">ყველაფერი ქართულად - რეგისტრაციიდან გადახდამდე.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">მარტივი გადართვა</h3>
                  <p className="text-muted-foreground">ერთი კლიკით გადაერთეთ მოდელებს შორის.</p>
                </motion.div>
              </div>
            </div>
          </section>

          <HubPageCta
            title="მზად ხართ AI-ის გამოსაყენებლად?"
            description="სცადეთ ყველა მოდელი უფასოდ და აირჩიეთ თქვენთვის საუკეთესო."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_models_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
