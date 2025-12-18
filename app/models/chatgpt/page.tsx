"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MessageSquare, Lightbulb, Code, FileText, Globe, Zap, Check, ArrowRight } from "lucide-react"
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
  "chatgpt georgia",
  "chatgpt saqartveloshi",
  "gpt kartulad",
  "chatgpt qartuladm",
  "openai georgia",
  "gpt 4 georgia",
  "gpt 5 georgia",
]

const features = [
  {
    title: "ბუნებრივი საუბარი",
    description: "ChatGPT-ს ესმის კონტექსტი და პასუხობს ისე, როგორც ადამიანი - ბუნებრივად და გასაგებად.",
    icon: <MessageSquare className="size-6 stroke-[1.5] text-emerald-500" />,
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    title: "კრეატიული წერა",
    description: "სტატიები, პოსტები, სცენარები, ლექსები - ChatGPT დაგეხმარებათ ნებისმიერი ტიპის კონტენტის შექმნაში.",
    icon: <Lightbulb className="size-6 stroke-[1.5] text-amber-500" />,
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
  },
  {
    title: "კოდის წერა და ანალიზი",
    description: "დაწერეთ, გაასწორეთ და გააანალიზეთ კოდი Python, JavaScript, TypeScript და სხვა ენებზე.",
    icon: <Code className="size-6 stroke-[1.5] text-blue-500" />,
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    title: "დოკუმენტების ანალიზი",
    description: "ატვირთეთ PDF, Word ან ტექსტური ფაილები და მიიღეთ შეჯამება, ანალიზი ან პასუხები.",
    icon: <FileText className="size-6 stroke-[1.5] text-purple-500" />,
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    title: "მრავალენოვანი მხარდაჭერა",
    description: "ChatGPT კარგად მუშაობს ქართულთან - წერს, თარგმნის და პასუხობს მშობლიურ ენაზე.",
    icon: <Globe className="size-6 stroke-[1.5] text-cyan-500" />,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    title: "სწრაფი პასუხები",
    description: "მიიღეთ პასუხები წამებში - ChatGPT ოპტიმიზებულია სისწრაფისა და ეფექტურობისთვის.",
    icon: <Zap className="size-6 stroke-[1.5] text-rose-500" />,
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
  },
]

const useCases = [
  {
    title: "სტუდენტებისთვის",
    description: "რეფერატების დაწერა, კვლევა, სწავლის მასალების შეჯამება და კითხვებზე პასუხები.",
  },
  {
    title: "ბიზნესისთვის",
    description: "იმეილების შედგენა, პრეზენტაციები, ანგარიშები და კლიენტებთან კომუნიკაცია.",
  },
  {
    title: "დეველოპერებისთვის",
    description: "კოდის წერა, debugging, კოდის განმარტება და ტექნიკური დოკუმენტაცია.",
  },
  {
    title: "კონტენტ-მეიკერებისთვის",
    description: "ბლოგები, სოციალური მედიის პოსტები, სკრიპტები და მარკეტინგული ტექსტები.",
  },
]

const steps = [
  {
    number: "1",
    title: "შედით Mypen.ge-ზე",
    description: "დარეგისტრირდით უფასოდ ან შედით არსებული ანგარიშით.",
  },
  {
    number: "2",
    title: "აირჩიეთ ChatGPT მოდელი",
    description: "მოდელების სიიდან აირჩიეთ ChatGPT (GPT-4 ან GPT-5).",
  },
  {
    number: "3",
    title: "დაიწყეთ საუბარი",
    description: "დაწერეთ თქვენი კითხვა ან მოთხოვნა ქართულად და მიიღეთ პასუხი.",
  },
]

const faqs = [
  {
    question: "როგორ გამოვიყენო ChatGPT საქართველოში?",
    answer: "Mypen.ge-ზე შეგიძლიათ გამოიყენოთ ChatGPT პირდაპირ, VPN-ის გარეშე. უბრალოდ დარეგისტრირდით და დაიწყეთ საუბარი ქართულად.",
  },
  {
    question: "არის ChatGPT უფასო?",
    answer: "დიახ, Mypen Light პაკეტი უფასოა და მოიცავს ყოველდღიურ ტოკენებს ChatGPT-ით სარგებლობისთვის. უფრო მეტი გამოყენებისთვის შეგიძლიათ აირჩიოთ PRO ან ULTRA პაკეტი.",
  },
  {
    question: "რა განსხვავებაა GPT-4 და GPT-5 შორის?",
    answer: "GPT-5 არის უახლესი და ყველაზე მძლავრი მოდელი, რომელიც უკეთესად ამუშავებს რთულ ამოცანებს. GPT-4 კარგია ყოველდღიური ამოცანებისთვის და უფრო სწრაფია.",
  },
  {
    question: "შეუძლია ChatGPT-ს ქართულად წერა?",
    answer: "დიახ, ChatGPT კარგად მუშაობს ქართულ ენაზე. Mypen-ზე ის ოპტიმიზებულია ქართული გრამატიკისა და სტილისთვის.",
  },
  {
    question: "როგორ ავტვირთო ფაილები ChatGPT-ში?",
    answer: "Mypen-ზე შეგიძლიათ ატვირთოთ PDF, Word, ტექსტური ფაილები და სურათები. უბრალოდ დააჭირეთ ატვირთვის ღილაკს და აირჩიეთ ფაილი.",
  },
  {
    question: "რა ამოცანებს ასრულებს ChatGPT საუკეთესოდ?",
    answer: "ChatGPT იდეალურია ტექსტის წერისთვის, კოდის გენერაციისთვის, თარგმნისთვის, შეჯამებისთვის და საუბრისთვის. ასევე კარგია ბრეინსტორმინგისა და იდეების გენერაციისთვის.",
  },
]

export default function ChatGPTPage() {
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'მოდელები', url: 'https://mypen.ge/models' },
    { name: 'ChatGPT', url: 'https://mypen.ge/models/chatgpt' },
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
        name: 'ChatGPT საქართველოში - Mypen.ge',
        description: 'გამოიყენეთ ChatGPT ქართულად - GPT-4 და GPT-5 მოდელები ერთ პლატფორმაზე',
        url: 'https://mypen.ge/models/chatgpt',
        category: 'AI Model',
        keywords: schemaKeywords,
      })} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="flex min-h-[100dvh] flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HubPageHero
            badge="OpenAI-ს მოდელი"
            title="ChatGPT საქართველოში"
            description="გამოიყენეთ მსოფლიოში ყველაზე პოპულარული AI ასისტენტი ქართულად. წერეთ, კოდეთ, თარგმნეთ და მიიღეთ პასუხები ნებისმიერ კითხვაზე - Mypen.ge-ზე."
            ctaText="სცადეთ ChatGPT უფასოდ"
            ctaId="cta_chatgpt_hero"
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
                  რა შეუძლია ChatGPT-ს?
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
                  როგორ იყენებენ ქართველები ChatGPT-ს
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
                    <div className="size-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand">{step.number}</span>
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
                  <SmartCtaLink data-cta-id="cta_chatgpt_steps">
                    დაიწყეთ ახლავე
                    <ArrowRight className="ml-2 size-4" />
                  </SmartCtaLink>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Comparison Section */}
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
                  შედარება
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  რატომ ChatGPT Mypen-ით?
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="border-border/40">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-muted-foreground">პირდაპირ OpenAI-ზე</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        საჭიროა VPN საქართველოდან
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        $20/თვე ChatGPT Plus-ისთვის
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        მხოლოდ ერთი მოდელი
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✕</span>
                        უცხოური გადახდის მეთოდები
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-brand/50 bg-brand/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Mypen.ge-ით</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="text-brand size-5 mt-0.5" />
                        პირდაპირი წვდომა VPN-ის გარეშე
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="text-brand size-5 mt-0.5" />
                        უფასო პაკეტი + ხელმისაწვდომი ფასები
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="text-brand size-5 mt-0.5" />
                        ChatGPT + Claude + Gemini ერთად
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="text-brand size-5 mt-0.5" />
                        ქართული ბარათით გადახდა
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="w-full py-16 md:py-24 bg-muted/30">
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
                <Link href="/blog/chatgpt-saqartveloshi" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">როგორ გამოვიყენოთ ChatGPT საქართველოში</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/chatgpt-vs-claude-georgia" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">ChatGPT vs Claude: რომელი ჯობია?</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/blog/sauketheso-ai-modeli-2025" className="block">
                  <Card className="h-full border-border/40 hover:border-brand/50 transition-colors">
                    <CardContent className="p-4">
                      <p className="font-medium">საუკეთესო AI მოდელი 2025</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <HubPageFaq
            title="ხშირად დასმული კითხვები ChatGPT-ზე"
            faqs={faqs}
          />

          {/* CTA Section */}
          <HubPageCta
            title="მზად ხართ ChatGPT-ის გამოსაყენებლად?"
            description="შეუერთდით 10,000+ ქართველ მომხმარებელს, რომლებიც უკვე იყენებენ ChatGPT-ს Mypen-ით."
            ctaText="დაიწყეთ უფასოდ"
            ctaId="cta_chatgpt_bottom"
            variant="gradient"
          />
        </main>

        <Footer />
      </div>
    </>
  )
}
