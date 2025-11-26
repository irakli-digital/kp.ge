"use client"

import Link from "next/link"
import { useDeviceRedirect, getCtaUrl } from "@/hooks/use-device-redirect"
import { ReactNode, useEffect, useState } from "react"

interface SmartCtaLinkProps {
  children: ReactNode
  className?: string
  "aria-label"?: string
  "data-cta-id"?: string
  "data-usecase"?: string
}

export function SmartCtaLink({ 
  children, 
  className, 
  "aria-label": ariaLabel,
  "data-cta-id": ctaId,
  "data-usecase": usecase,
}: SmartCtaLinkProps) {
  const [mounted, setMounted] = useState(false)
  const deviceType = useDeviceRedirect()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use web URL during SSR and initial render to prevent hydration mismatch
  const targetUrl = mounted ? getCtaUrl(deviceType) : "https://chat.mypen.ge"

  return (
    <Link
      href={targetUrl}
      className={className}
      aria-label={ariaLabel}
      data-cta-id={ctaId}
      data-usecase={usecase}
      data-device-type={mounted ? deviceType : "web"}
    >
      {children}
    </Link>
  )
}

