"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmartCtaLink } from "@/components/smart-cta-link"

interface HubPageHeroProps {
  badge?: string
  title: string
  description: string
  ctaText?: string
  ctaId?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export function HubPageHero({
  badge,
  title,
  description,
  ctaText = "დაიწყე უფასოდ",
  ctaId = "cta_hub_hero",
  secondaryCtaText,
  secondaryCtaHref,
}: HubPageHeroProps) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {badge && (
            <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              {badge}
            </Badge>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-[65ch] mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full h-12 px-8 text-base transition-all hover:scale-105 hover:shadow-lg"
              asChild
            >
              <SmartCtaLink
                aria-label={ctaText}
                data-cta-id={ctaId}
              >
                {ctaText}
                <ArrowRight className="ml-2 size-4" />
              </SmartCtaLink>
            </Button>

            {secondaryCtaText && secondaryCtaHref && (
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base"
                asChild
              >
                <a href={secondaryCtaHref}>
                  {secondaryCtaText}
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute -bottom-20 -right-20 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-50" />
        <div className="absolute -top-20 -left-20 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl opacity-50" />
      </div>
    </section>
  )
}
