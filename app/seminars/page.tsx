"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SeminarsPage() {
  const seminars = [
    {
      title: "სისტემური განლაგებება რითრითი გუდაურში",
      description: "სამდღიანი ტრანსფორმაციული რიტრიტი გუდაურში: სისტემური განლაგებები, ბგერითი თერაპია და თვითაღმოჩენის უნიკალური გამოცდილება.",
      href: "/seminars/system-constellation-retreat",
      status: "past",
      date: "1-3 ნოემბერი",
      speakers: ["ია ბერსენაძე", "ბაქარ აბრამიშვილი", "გვანცა ველთაური"],
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "ცნობიერების პრინციპები: პრაქტიკული სემინარი",
      description: "ექვსსაათიანი პრაქტიკული სემინარი ცნობიერების მექანიზმებისა და მათი მართვის შესახებ.",
      href: "/seminars/consciousness",
      status: "past",
      date: "21 სექტემბერი",
      speakers: ["დავით კანდელაკი", "გვანცა ველთაური"],
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "ტრანსფორმაციის ვორქშოპი",
      description: "ორდღიანი ინტენსიური ვორქშოპი: გათავისუფლდი დესტრუქციული როლებისგან და შეცვალე შენი ცხოვრება.",
      href: "/seminars/nugzar-dzidziguri-workshop",
      status: "past",
      date: "3-4 მაისი",
      speakers: ["ნუგზარ ძიძიგური", "გვანცა ველთაური"],
      gradient: "from-purple-500 to-violet-500",
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />

      <main className="flex-1 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#171717] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-6" variant="secondary">
                <Calendar className="size-4 mr-2" />
                ვორქშოპები და სემინარები
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                ვორქშოპები და{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  სემინარები
                </span>
              </h1>

              <p className="text-muted-foreground text-lg">
                გეპატიჟებით პრაქტიკულ სემინარებსა და ვორქშოპებზე, რომლებიც ეძღვნება ცნობიერებას, 
                პიროვნულ განვითარებასა და ტრანსფორმაციას.
              </p>
            </motion.div>

            {/* Seminars list */}
            <div className="max-w-2xl mx-auto space-y-4">
              {seminars.map((seminar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={seminar.href}>
                    <Card className="overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 hover:border-amber-500/50 transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {seminar.status === "past" && (
                            <Badge variant="outline" className="text-xs">ჩატარდა</Badge>
                          )}
                          <span className="text-sm text-muted-foreground">{seminar.date}</span>
                        </div>

                        <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                          {seminar.title}
                        </h2>

                        <p className="text-muted-foreground text-sm mb-4">
                          {seminar.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {seminar.speakers.join(", ")}
                          </div>
                          <ArrowRight className="size-5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
