"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2, CheckCircle, Mail } from "lucide-react"
import { useTheme } from "next-themes"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkTheme = !mounted ? true : theme === "dark" || resolvedTheme === "dark"

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error)
      }
    } catch {
      setStatus("error")
      setMessage("დაფიქსირდა შეცდომა")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src={isDarkTheme ? "/images/Logo/logo-dark.svg" : "/images/Logo/logo-light.svg"}
                alt="ცოდნისმოყვარე პოდკასტი"
                width={191}
                height={46}
                className="h-[46px] w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              პოდკასტი, სადაც ცნობისმოყვარეობა ხვდება ახალ აღმოჩენებს.
            </p>
            <div className="flex gap-4">
              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@KPODCAST_GE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="sr-only">YouTube</span>
              </Link>
              {/* Spotify */}
              <Link
                href="https://open.spotify.com/show/12W0rak7PaZnhYnCeQ60mt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="sr-only">Spotify</span>
              </Link>
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/podcastofknowing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/kpodcast_ge/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* პოდკასტი */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold">პოდკასტი</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  მთავარი
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  ეპიზოდები
                </Link>
              </li>
              <li>
                <Link href="/donations" className="text-muted-foreground hover:text-foreground transition-colors">
                  დონაცია
                </Link>
              </li>
            </ul>
          </div>

          {/* სემინარები */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold">სემინარები</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/seminars/consciousness" className="text-muted-foreground hover:text-foreground transition-colors">
                  ცნობიერების სემინარი
                </Link>
              </li>
              <li>
                <Link href="/seminars/nugzar-dzidziguri-workshop" className="text-muted-foreground hover:text-foreground transition-colors">
                  ნუგზარ ძიძიგურის ვორქშოპი
                </Link>
              </li>
              <li>
                <Link href="/seminars/system-constellation-retreat" className="text-muted-foreground hover:text-foreground transition-colors">
                  სისტემური განლაგების რიტრიტი
                </Link>
              </li>
            </ul>
          </div>

          {/* ინფორმაცია */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold">ინფორმაცია</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  ბლოგი
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  კონტაქტი
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  კონფიდენციალურობის პოლიტიკა
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  წესები და პირობები
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/40 pt-8">
          <div className="max-w-md">
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Mail className="size-4" />
              გამოიწერე სიახლეები
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              მიიღე შეტყობინებები ახალი ეპიზოდების და სემინარების შესახებ.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="შენი ელ-ფოსტა"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-10 px-3 rounded-md border border-border bg-muted/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-4 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "გამოწერა"
                )}
              </button>
            </form>
            {status !== "idle" && (
              <div
                className={`mt-3 text-sm flex items-center gap-2 ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === "success" && <CheckCircle className="size-4" />}
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ცოდნისმოყვარე პოდკასტი. ყველა უფლება დაცულია.
          </p>
        </div>
      </div>
    </footer>
  )
}
