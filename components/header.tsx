"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

const seminarLinks = [
  { href: "/seminars/consciousness", label: "ცნობიერების სემინარი" },
  { href: "/seminars/nugzar-dzidziguri-workshop", label: "ნუგზარ ძიძიგურის ვორქშოპი" },
  { href: "/seminars/system-constellation-retreat", label: "სისტემური განლაგების რიტრიტი" },
]

interface HeaderProps {
  hideLoginButton?: boolean
  hideNavigation?: boolean
  notSticky?: boolean
}

export default function Header({ hideNavigation = false, notSticky = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const toggleMobileSection = (section: string) => {
    setMobileExpanded(mobileExpanded === section ? null : section)
  }

  return (
    <header
      className={`${notSticky ? '' : 'sticky top-0'} z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-md" : "bg-transparent"}`}
    >
      <div className="container flex h-20 items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 font-bold z-10">
          <Image
            src="/images/Logo/logo-dark.svg"
            alt="ცოდნისმოყვარე პოდკასტი"
            width={191}
            height={46}
            className="h-[46px] w-auto"
            priority
          />
        </Link>
        {!hideNavigation && (
          <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <Link
              href="https://www.youtube.com/@KPODCAST_GE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ეპიზოდები
            </Link>

            {/* Seminars Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('seminars')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
                სემინარები
                <ChevronDown className={`size-3.5 transition-transform ${activeDropdown === 'seminars' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'seminars' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-background/95 backdrop-blur-lg border rounded-lg shadow-lg py-2"
                  >
                    {seminarLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ბლოგი
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              კონტაქტი
            </Link>
          </nav>
        )}
        <div className="hidden md:flex gap-3 items-center">
          <Button variant="outline" className="rounded-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400" asChild>
            <Link href="/donations">
              მხარდაჭერა
            </Link>
          </Button>

          <Button variant="default" className="rounded-full bg-red-600 hover:bg-red-700" asChild>
            <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 size-4" />
              გამოიწერე
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 inset-x-0 bg-background border-b border-border overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-1">
              {!hideNavigation && (
                <>
                  <Link
                    href="https://www.youtube.com/@KPODCAST_GE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 text-base font-medium text-foreground/90 hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ეპიზოდები
                  </Link>

                  {/* Mobile Seminars Section */}
                  <div className="border-t border-border pt-3 mt-2">
                    <button
                      onClick={() => toggleMobileSection('seminars')}
                      className="w-full py-3 text-base font-medium text-foreground/90 flex items-center justify-between"
                    >
                      სემინარები
                      <ChevronDown className={`size-4 text-muted-foreground transition-transform ${mobileExpanded === 'seminars' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === 'seminars' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-3 flex flex-col gap-1 border-l border-border ml-2">
                            {seminarLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/blog" className="py-3 text-base font-medium text-foreground/90 hover:text-foreground transition-colors border-t border-border mt-2" onClick={() => setMobileMenuOpen(false)}>
                    ბლოგი
                  </Link>

                  <Link href="/contact" className="py-3 text-base font-medium text-foreground/90 hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    კონტაქტი
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-3 pt-4 mt-3 border-t border-border">
                <Button className="w-full h-12 rounded-none bg-amber-500/10 border border-amber-500/50 text-amber-500 hover:bg-amber-500/20 font-semibold" asChild>
                  <Link href="/donations" onClick={() => setMobileMenuOpen(false)}>
                    მხარდაჭერა
                  </Link>
                </Button>
                <Button className="w-full h-12 rounded-none bg-red-600 hover:bg-red-700 text-white font-semibold" asChild>
                  <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                    <Youtube className="mr-2 size-4" />
                    გამოიწერე არხი
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
