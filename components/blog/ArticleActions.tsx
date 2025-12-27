"use client"

import { useState, useEffect, useRef } from "react"
import { Share2, Link, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArticleActionsProps {
  slug: string
  title: string
  initialClaps: number
}

// Hand/Palm icon for clap
function ClapIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {filled ? (
        // Filled version
        <path d="M18 11V6a1 1 0 0 0-2 0v4m0 0V4a1 1 0 0 0-2 0v6m0 0V3a1 1 0 0 0-2 0v7m0 0V5a1 1 0 0 0-2 0v5.5M6 11a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-1H6v1zm0 0V9a2 2 0 0 1 2-2h.5" />
      ) : (
        // Outline version - raised hand/palm
        <>
          <path d="M18 10V6a1 1 0 0 0-1-1 1 1 0 0 0-1 1v4" />
          <path d="M16 6V4a1 1 0 0 0-1-1 1 1 0 0 0-1 1v6" />
          <path d="M14 4V3a1 1 0 0 0-1-1 1 1 0 0 0-1 1v7" />
          <path d="M12 5V4a1 1 0 0 0-1-1 1 1 0 0 0-1 1v6" />
          <path d="M10 9V7a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5" />
          <path d="M8 13v-2a1 1 0 0 0-1-1 1 1 0 0 0-1 1v4c0 3.5 2.5 6 6 6h1c3.5 0 6-2.5 6-6v-3" />
        </>
      )}
    </svg>
  )
}

// Spark/burst animation particles
function SparkAnimation({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Circular burst particles */}
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-primary animate-spark"
          style={{
            transform: `rotate(${i * 60}deg) translateY(-20px)`,
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
      {/* Ring burst */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-primary animate-ring" />
    </div>
  )
}

// X (Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Facebook icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// LinkedIn icon
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function ArticleActions({ slug, title, initialClaps }: ArticleActionsProps) {
  const [claps, setClaps] = useState(initialClaps)
  const [hasClapped, setHasClapped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const userClapped = localStorage.getItem(`user-clapped-${slug}`)
    if (userClapped) setHasClapped(true)
  }, [slug])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showShareMenu])

  const handleClap = async () => {
    if (hasClapped) return

    setClaps(prev => prev + 1)
    setHasClapped(true)
    setIsAnimating(true)
    localStorage.setItem(`user-clapped-${slug}`, "true")

    setTimeout(() => setIsAnimating(false), 700)

    try {
      const response = await fetch('/api/blog/clap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })

      if (response.ok) {
        const data = await response.json()
        setClaps(data.claps)
      }
    } catch (error) {
      console.error('Failed to save clap:', error)
    }
  }

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu)
    setCopied(false)
  }

  const url = `https://kp.ge/blog/${slug}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
    setShowShareMenu(false)
  }

  const formatClaps = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
    }
    return count.toString()
  }

  return (
    <>
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes spark {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-24px) scale(0);
          }
        }
        @keyframes ring {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }
        @keyframes bounce-clap {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        .animate-spark {
          animation: spark 0.6s ease-out forwards;
        }
        .animate-ring {
          animation: ring 0.6s ease-out forwards;
        }
        .animate-bounce-clap {
          animation: bounce-clap 0.3s ease-out;
        }
      `}</style>

      <div className="sticky bottom-4 sm:bottom-6 z-40 flex justify-center pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg px-1.5 sm:px-2 py-1 sm:py-1.5">
          {/* Clap Button */}
          <button
            onClick={handleClap}
            disabled={hasClapped}
            className={cn(
              "relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all",
              hasClapped
                ? "text-primary cursor-default"
                : "hover:bg-muted/50 active:scale-95"
            )}
            aria-label="მოწონება"
          >
            <span className={cn("relative", isAnimating && "animate-bounce-clap")}>
              <ClapIcon
                className="h-5 w-5 sm:h-6 sm:w-6"
                filled={hasClapped}
              />
              <SparkAnimation isActive={isAnimating} />
            </span>
            {claps > 0 && (
              <span className="text-sm sm:text-base font-medium text-muted-foreground">
                {formatClaps(claps)}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-5 sm:h-6 bg-border/50" />

          {/* Share Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleShareMenu}
              className={cn(
                "flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all hover:bg-muted/50 active:scale-95",
                showShareMenu && "bg-muted/50"
              )}
              aria-label="გაზიარება"
            >
              <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Share Menu Dropdown */}
            {showShareMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-xl shadow-xl py-1.5 sm:py-2 min-w-[180px] sm:min-w-[220px] overflow-hidden">
                {/* Copy link */}
                <button
                  onClick={copyLink}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-left hover:bg-muted transition-colors flex items-center gap-2.5 sm:gap-3"
                >
                  {copied ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Link className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span>{copied ? "კოპირებულია!" : "ლინკის კოპირება"}</span>
                </button>

                <div className="h-px bg-border mx-2 my-1" />

                {/* Share on X */}
                <button
                  onClick={shareToX}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-left hover:bg-muted transition-colors flex items-center gap-2.5 sm:gap-3"
                >
                  <XIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>გაზიარება X-ზე</span>
                </button>

                {/* Share on Facebook */}
                <button
                  onClick={shareToFacebook}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-left hover:bg-muted transition-colors flex items-center gap-2.5 sm:gap-3"
                >
                  <FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1877F2] flex-shrink-0" />
                  <span>გაზიარება Facebook-ზე</span>
                </button>

                {/* Share on LinkedIn */}
                <button
                  onClick={shareToLinkedIn}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-left hover:bg-muted transition-colors flex items-center gap-2.5 sm:gap-3"
                >
                  <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A66C2] flex-shrink-0" />
                  <span>გაზიარება LinkedIn-ზე</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
