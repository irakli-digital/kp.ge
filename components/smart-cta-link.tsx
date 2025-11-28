"use client"

import { useDeviceRedirect, getCtaUrl } from "@/hooks/use-device-redirect"
import { ReactNode, useEffect, useState } from "react"
import { trackInitiateCheckout } from "@/lib/tiktok-pixel"

interface SmartCtaLinkProps {
  children: ReactNode
  className?: string
  "aria-label"?: string
  "data-cta-id"?: string
  "data-usecase"?: string
  "data-tier"?: string
  "data-value"?: string
  onClick?: () => void
}

export function SmartCtaLink({ 
  children, 
  className, 
  "aria-label": ariaLabel,
  "data-cta-id": ctaId,
  "data-usecase": usecase,
  "data-tier": tier,
  "data-value": value,
  onClick,
}: SmartCtaLinkProps) {
  const [mounted, setMounted] = useState(false)
  const deviceType = useDeviceRedirect()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use web URL during SSR and initial render to prevent hydration mismatch
  const targetUrl = mounted ? getCtaUrl(deviceType) : "https://chat.mypen.ge"

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track TikTok InitiateCheckout for pricing-related CTAs
    if (tier && value) {
      const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0
      if (numericValue > 0) {
        trackInitiateCheckout({
          tier: tier.toLowerCase(),
          value: numericValue,
          currency: '₾',
          eventId: `InitiateCheckout_${ctaId || 'unknown'}_${Date.now()}`,
        })
      }
    }
    
    // Call custom onClick handler if provided
    if (onClick) {
      onClick()
    }
    
    // For external links (App Store, Play Store), ensure they always work
    // Don't prevent default - let the browser handle the navigation naturally
  }

  // Use regular anchor tag for external URLs to avoid Next.js Link issues with App Store links
  return (
    <a
      href={targetUrl}
      className={className}
      aria-label={ariaLabel}
      data-cta-id={ctaId}
      data-usecase={usecase}
      data-device-type={mounted ? deviceType : "web"}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

