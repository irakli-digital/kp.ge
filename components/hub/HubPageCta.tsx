"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SmartCtaLink } from "@/components/smart-cta-link"

interface HubPageCtaProps {
  title: string
  description: string
  ctaText?: string
  ctaId?: string
  variant?: "default" | "gradient"
}

export function HubPageCta({
  title,
  description,
  ctaText = "დაიწყე უფასოდ",
  ctaId = "cta_hub_bottom",
  variant = "default",
}: HubPageCtaProps) {
  const bgClasses = variant === "gradient"
    ? "bg-gradient-to-r from-primary/10 via-brand/10 to-secondary/10"
    : "bg-muted/30"

  return (
    <section className={`w-full py-16 md:py-24 ${bgClasses}`}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>

          <Button
            size="lg"
            className="rounded-full h-14 px-10 text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            asChild
          >
            <SmartCtaLink
              aria-label={ctaText}
              data-cta-id={ctaId}
            >
              {ctaText}
              <ArrowRight className="ml-2 size-5" />
            </SmartCtaLink>
          </Button>

          <p className="mt-4 text-sm text-muted-foreground">
            საკრედიტო ბარათი არ არის საჭირო
          </p>
        </motion.div>
      </div>
    </section>
  )
}
