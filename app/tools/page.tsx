"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { RefreshCw, Languages, FileText, SpellCheck, ArrowRight } from "lucide-react"
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
  "ai tools georgia",
  "ai instrumentebi",
  "teqstis gadaketeba",
  "targmani qartulad",
  "spellchecker qartulad",
  "pdf analyzer",
  "ai xelsawyo",
]

const tools = [
  {
    title: "ტექსტის გადაკეთება",
    description: "გადააკეთეთ ტექსტი ახალი სიტყვებით, შეინარჩუნეთ აზრი. სასარგებლოა პლაგიატის თავიდან ასაცილებლად.",
    icon: <RefreshCw className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    href: "/tools/paraphraser",
    keywords: ["პარაფრეიზერი", "ტექსტის გადაწერა", "პლაგიატი"],
  },
  {
    title: "თარგმანი",
    description: "თარგმნეთ ტექსტი და დოკუმენტები ქართულად ან ნებისმიერ ენაზე AI-ის დახმარებით.",
    icon: <Languages className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    href: "/tools/translator",
    keywords: ["თარგმანი", "თარგმნა", "ენის თარგმანი"],
  },
  {
    title: "გრამატიკის შემოწმება",
    description: "შეამოწმეთ და გაასწორეთ გრამატიკული შეცდომები ქართულ და ინგლისურ ტექსტებში.",
    icon: <SpellCheck className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    href: "/tools/spellchecker",
    keywords: ["სპელჩეკერი", "გრამატიკა", "შეცდომები"],
  },
  {
    title: "PDF ანალიზი",
    description: "ატვირთეთ PDF დოკუმენტი და დაუსვით AI-ს კითხვები მის შინაარსზე.",
    icon: <FileText className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    href: "/tools/pdf-analyzer",
    keywords: ["PDF", "დოკუმენტი", "ანალიზი"],
  },
]

export default function ToolsPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ინსტრუმენტები', url: 'https://mypen.ge/tools' },
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
        name: 'AI ინსტრუმენტები - Mypen.ge',
        description: 'ტექსტის დამუშავების AI ინსტრუმენტები ქართულად: პარაფრეიზერი, თარგმანი, სპელჩეკერი, PDF ანალიზატორი',
        url: 'https://mypen.ge/tools',
        category: 'AI Tool',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          <HubPageHero
            badge="AI ინსტრუმენტები"
            title="ტექსტის დამუშავების ინსტრუმენტები"
            description="გამოიყენეთ AI-ზე დაფუძნებული ინსტრუმენტები ტექსტის გადაკეთებისთვის, თარგმნისთვის, გრამატიკის შესამოწმებლად და PDF ანალიზისთვის."
            ctaText="სცადეთ უფასოდ"
            ctaId="cta_tools_hero"
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
                  ხელმისაწვდომი ინსტრუმენტები
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  აირჩიეთ სასურველი ინსტრუმენტი
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  ყველა ინსტრუმენტი ხელმისაწვდომია უფასოდ საბაზისო პაკეტით. PRO და ULTRA პაკეტებით მიიღებთ შეუზღუდავ გამოყენებას.
                </p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto"
              >
                {tools.map((tool, i) => (
                  <motion.div key={i} variants={item}>
                    <Link href={tool.href} className="block h-full">
                      <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 hover:border-brand/50 hover:shadow-lg transition-all group">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`size-14 rounded-xl ${tool.iconBg} flex items-center justify-center shrink-0`}>
                              {tool.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                                {tool.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">{tool.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {tool.keywords.map((keyword, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-brand font-medium mt-4 group-hover:gap-2 transition-all">
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  რატომ Mypen-ის ინსტრუმენტები?
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
                    <span className="text-2xl font-bold text-brand">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">ქართული ენის მხარდაჭერა</h3>
                  <p className="text-muted-foreground">ყველა ინსტრუმენტი ოპტიმიზებულია ქართული ენისთვის.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">უახლესი AI მოდელები</h3>
                  <p className="text-muted-foreground">GPT-4, Claude, Gemini - საუკეთესო მოდელები ერთ ადგილას.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-brand">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">ხელმისაწვდომი ფასი</h3>
                  <p className="text-muted-foreground">ყოველთვიური გამოწერა $60-ის ნაცვლად მხოლოდ 69 ლარად.</p>
                </motion.div>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="rounded-full h-12 px-8" asChild>
                  <SmartCtaLink data-cta-id="cta_tools_why">
                    დაიწყეთ ახლავე
                    <ArrowRight className="ml-2 size-4" />
                  </SmartCtaLink>
                </Button>
              </div>
            </div>
          </section>

          <HubPageCta
            title="მზად ხართ დასაწყებად?"
            description="სცადეთ ყველა ინსტრუმენტი უფასოდ და აღმოაჩინეთ AI-ის სიმძლავრე."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_tools_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
