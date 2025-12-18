"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import JsonLd from "@/components/JsonLd"

interface FaqItem {
  question: string
  answer: string
}

interface HubPageFaqProps {
  title?: string
  subtitle?: string
  faqs: FaqItem[]
}

export function HubPageFaq({
  title = "ხშირად დასმული კითხვები",
  subtitle,
  faqs,
}: HubPageFaqProps) {
  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
