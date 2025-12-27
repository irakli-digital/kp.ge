"use client"

import { useState, useEffect, useRef } from "react"
import { Share2, Link, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArticleActionsProps {
  slug: string
  title: string
  initialClaps: number
}

// Clapping hands icon
function ClapIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 540.5 446.9" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={filled ? 0 : 14}>
      {/* Main clapping hands */}
      <path d="M109.2388686,342.1889608c42.5699463,23.9499512,83.4399414,53.4299927,126.1199341,76.8800049,30.5599976,16.7799683,65.2700195,20.9499512,98.9500122,11.2699585,3.4299927-.9899902,14.0499878-5.7399902,16.1799927-5.8299561,3.3900146-.1400146,12.6900024,2.8199463,17.0300293,3.3999634,47.3699951,6.3599854,94.9500122-14.9400024,122.0899658-53.7700195,29.8600464-42.75,50.460022-84.4499512,34.6000366-137.9199829-15.3099976-51.5899658-56.5800171-74.2399902-100-99.5-15.6799927-8.1300049-33.6500244-2.2099609-41.7000122,13.3200073-3.4899902,6.7399902-4.7600098,13.8599854-4.8099976,21.4400024-.3300171.3699951-3.8300171-1.9099731-4.460022-2.289978-26.1999512-15.7000122-52.039978-32.0400391-78.1999512-47.8000488-23.8500366-13.6699829-54.1600342,3.6000366-53.8400269,31.0900269-26.210022-8.2600098-51.2199707,10.9199829-48.4399414,38.6900024.6599121,6.5999756,3.9799194,12.1099854,6.9399414,17.7999878-27.0300293,11.8400269-27.9499512,49.9299927-2.5,64.2600098-23.8000488,14.710022-25.2399902,46.25-1.8599854,62.3599854,38.5700073,25.3599854,81.1699829,46.960022,119.3200073,72.6799927.8899536.6100464,2.0899658,1.1500244,2.539978,2.2000122-20.960022,3.5499878-42.4000244,1.2000122-61.8400269-7.3999634-4.7299805-2.1000366-9.1499634-4.8000488-13.6199951-7.3800049-40.5899658-23.460022-79.6399536-49.75-120.1998901-73.3000488-12.6000977-9.3299561-2.7200928-27.1699829,11.1499023-22.6499634,2.3699951.7799683,4.6899414,2.6900024,7.3800049,3.1199951,13.3499756,2.1099854,22.0699463-13.0800171,13.6300049-23.6300049-1.3699951-1.7000122-3.2800293-2.7600098-5.0400391-3.960022-6.8099365-4.6199951-25.6999512-13.7299805-29.6799316-19.3200073-7.5400391-10.5899658,1.75-25.5099487,14.2399902-19.7399902,2.4299316,1.1199951,5.0600586,3.5400391,7.4799805,4.5200195,11.4899902,4.6799927,23.1099854-5.289978,19.75-17.25-3.8100586-13.5700073-29.3800049-14.4500122-30.2700195-30.2299805-.4499512-7.960022,5.1700439-14.1000366,13.2700195-13.2700195,4.7299805.4799805,9.6899414,5.6699829,14.0700684,7.4299927,15.3798828,6.2200317,26.8299561-12.6099854,13.6899414-23.6900024-28.4100342-23.9099731-70.0800781-.0599976-64.3699951,35.3699951,1.0100098,6.2700195,3.7600098,11,6.8599854,16.3800049-27.1400146,11.5100098-28.0300293,49.6300049-3,64.2700195l-7.75,6.2399902c-16.3599854,17.5700073-13.3900147,42.6500244,6.2900391,56.210022ZM332.8588027,392.0689657l-125.8199463-76.6800537c-11.9900513-9.8999634-.9400024-28.2199707,13.5-21.5l62.6599731,37.8400269c15.8400269,4.4799805,25.9899902-15.0100098,12.960022-25.460022l-89.2300415-54.7699585c-9.7399902-10-2.0700073-27.7300415,12.4299927-21.9299927,33.3700562,20.2999878,66.5,41.0999756,100.2000122,60.7999878,16.0100098,4.789978,26.0100098-14.2700195,13.6099854-25.1099854l-111.9799805-68.5200195c-11.7199707-10.9299927-.3399658-30.4400024,14.3500366-20.8500366l110.8099976,67.6900024c15.9699707,6.6400146,27.8999634-12.75,15.3099976-24.3099976-28.3200073-18.6499634-58.6100464-34.4599609-86.9200439-53.0799561-4.4699707-2.9400024-7.9899902-4.9200439-9.3999634-10.6000366-2.1900024-8.789978,3.9299927-17.6300049,13.4899902-15.9899902,2.3499756.4000244,5.2199707,2.4799805,7.3300171,3.6699829,44.2399902,25.0200195,86.2699585,54.3200073,130.3999634,79.6000366,10.8599854,4.6699829,22.0400391-3.0499878,20.5800171-15.0800171-1.9500122-16.1500244-34.1099854-17.1699829-35.9299927-36.5599976-.6600342-7,3.039978-17.8300171,11.9400024-13.9500122,35.9699707,22.7399902,71.8099976,37.1199951,87.0599976,80.4400024,15.9299927,45.2700195,0,76.2700195-23.6099854,113.4100342-32.6199951,51.3399658-88.1199951,69.8099976-143.7400513,40.9400024Z"/>
      {/* Spark/burst lines */}
      <g>
        <path d="M15.0535196,147.2284137l42.9857429,37.2230278c11.700072,5.6858117,22.3253802-7.474958,14.4398505-17.8486439l-41.7901834-36.1929167c-11.724721-6.5231846-22.9511785,6.0351948-15.63541,16.8185328Z"/>
        <path d="M197.2072055,27.5829278l4.1369805,55.6418044c4.1921097,12.2179331,21.6927921,10.4945369,22.8034186-2.5786315l-3.9146229-55.3607081c-.6189953-2.6838844-2.6730988-5.6538673-5.0553022-7.0548648-7.8619014-4.6246226-17.0603494.3061006-17.970474,9.3524Z"/>
        <path d="M293.4050785,79.8435171c-8.8644634,13.9836896,9.3389742,27.3594658,19.173832,13.9409776,6.5309021-14.5808947,14.4717594-28.7028312,20.8780402-43.3220797.9270501-2.1068049,2.4074221-5.3176631,2.9518336-7.4355282.9816396-3.7728206-1.1275965-9.5483673-4.4525536-11.5574028-5.536055-3.3532944-13.5204143-2.8669547-16.9361398,3.1819236-8.0073896,14.1817231-13.610133,30.8804198-21.6150124,45.1921094Z"/>
        <path d="M134.7274126,104.082184c-8.8530038-14.3557002-17.1368112-29.9919045-26.5191575-43.9865779-1.6278089-2.4149842-3.1667969-5.2464505-5.755738-6.7504407-9.0069801-5.2371485-20.2280908,3.2711815-17.0576615,13.5816515.5570956,1.8318311,1.9866311,3.9322399,2.9388104,5.6618175,8.0198731,14.4787868,18.1319913,28.5031062,26.5891332,42.7995643,8.8253306,9.2714472,23.3503542.8614116,19.8046133-11.3060147Z"/>
      </g>
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
