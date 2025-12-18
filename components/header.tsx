"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { SmartCtaLink } from "@/components/smart-cta-link"

const modelLinks = [
  { href: "/models/chatgpt", label: "ChatGPT" },
  { href: "/models/claude", label: "Claude" },
  { href: "/models/gemini", label: "Gemini" },
]

const toolLinks = [
  { href: "/tools/paraphraser", label: "პარაფრეიზერი" },
  { href: "/tools/spellchecker", label: "სპელჩეკერი" },
  { href: "/tools/pdf-analyzer", label: "PDF ანალიზი" },
  { href: "/tools/translator", label: "მთარგმნელი" },
]

interface HeaderProps {
  hideLoginButton?: boolean
  hideNavigation?: boolean
  notSticky?: boolean
}

export default function Header({ hideLoginButton = false, hideNavigation = false, notSticky = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Determine if we should show the dark logo
  const isDarkTheme = !mounted ? true : theme === "dark" || resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)

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

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark")
  }

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
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src={isDarkTheme ? "/images/saasify-logo-dark.svg" : "/images/saasify-logo-light.svg"}
            alt="SaaSify Logo"
            width={150}
            height={35}
            className="h-auto max-w-[150px]"
            priority
          />
        </Link>
        {!hideNavigation && (
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              მახასიათებლები
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ფასი
            </Link>

            {/* Models Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('models')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
                მოდელები
                <ChevronDown className={`size-3.5 transition-transform ${activeDropdown === 'models' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'models' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-background/95 backdrop-blur-lg border rounded-lg shadow-lg py-2"
                  >
                    {modelLinks.map((link) => (
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

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('tools')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
                ინსტრუმენტები
                <ChevronDown className={`size-3.5 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'tools' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-44 bg-background/95 backdrop-blur-lg border rounded-lg shadow-lg py-2"
                  >
                    {toolLinks.map((link) => (
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
          </nav>
        )}
        <div className="hidden md:flex gap-3 items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDarkTheme ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {!hideLoginButton && (
            <>
              <Button variant="ghost" className="rounded-full" asChild>
                <Link href="https://chat.mypen.ge">
                  შესვლა
                </Link>
              </Button>
              <Button variant="default" className="rounded-full" asChild>
                <SmartCtaLink>
                  დაიწყე უფასოდ
                  <ChevronRight className="ml-1 size-4" />
                </SmartCtaLink>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDarkTheme ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="container py-4 flex flex-col gap-2">
            {!hideNavigation && (
              <>
                <Link href="/#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  მახასიათებლები
                </Link>
                <Link href="/#pricing" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  ფასი
                </Link>

                {/* Mobile Models Section */}
                <div className="border-t border-border/40 pt-2 mt-2">
                  <button
                    onClick={() => toggleMobileSection('models')}
                    className="w-full py-2 text-sm font-medium flex items-center justify-between"
                  >
                    მოდელები
                    <ChevronDown className={`size-4 transition-transform ${mobileExpanded === 'models' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'models' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 flex flex-col gap-1">
                          {modelLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="py-1.5 text-sm text-muted-foreground"
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

                {/* Mobile Tools Section */}
                <div>
                  <button
                    onClick={() => toggleMobileSection('tools')}
                    className="w-full py-2 text-sm font-medium flex items-center justify-between"
                  >
                    ინსტრუმენტები
                    <ChevronDown className={`size-4 transition-transform ${mobileExpanded === 'tools' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'tools' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 flex flex-col gap-1">
                          {toolLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="py-1.5 text-sm text-muted-foreground"
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

                <Link href="/blog" className="py-2 text-sm font-medium border-t border-border/40 pt-4 mt-2" onClick={() => setMobileMenuOpen(false)}>
                  ბლოგი
                </Link>
              </>
            )}
            {!hideLoginButton && (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="ghost" className="rounded-full w-full" asChild>
                  <Link href="https://chat.mypen.ge" onClick={() => setMobileMenuOpen(false)}>
                    შესვლა
                  </Link>
                </Button>
                <Button variant="default" className="rounded-full w-full" asChild>
                  <SmartCtaLink onClick={() => setMobileMenuOpen(false)}>
                    დაიწყე უფასოდ
                    <ChevronRight className="ml-1 size-4" />
                  </SmartCtaLink>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
