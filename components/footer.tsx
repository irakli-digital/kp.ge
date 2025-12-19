"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 font-bold">
              <Link href="/">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  ცოდნისმოყვარე
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              პოდკასტი, სადაც ცნობისმოყვარეობა ხვდება აღმოჩენას.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.youtube.com/@KPODCAST_GE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
                <span className="sr-only">YouTube</span>
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

          {/* ვორქშოპები */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold">ვორქშოპები</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/seminars/consciousness" className="text-muted-foreground hover:text-foreground transition-colors">
                  ცნობიერების სემინარი
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
                  კონფიდენციალურობა
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
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ცოდნისმოყვარე პოდკასტი. ყველა უფლება დაცულია.
          </p>
        </div>
      </div>
    </footer>
  )
}
