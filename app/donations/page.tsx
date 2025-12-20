"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Copy, Check, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function DonationsPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const bankAccounts = [
    {
      bank: "თიბისი ბანკი",
      iban: "GE56TB7271145061600032",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      bank: "საქართველოს ბანკი",
      iban: "GE16BG0000000603223831",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
  ]

  const copyToClipboard = async (iban: string) => {
    try {
      await navigator.clipboard.writeText(iban)
      setCopiedAccount(iban)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />

      <main className="flex-1 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#171717] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-6" variant="secondary">
                <Heart className="size-4 mr-2" />
                მხარდაჭერა
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  ცოდნისმოყვარე
                </span>
                {" "}პოდკასტი
              </h1>

              <div className="text-muted-foreground space-y-4 mb-10">
                <p className="text-lg">
                  ჩვენი პოდკასტის მისიაა ცნობისმოყვარეობის გაღვივება და ახალი 
                  აღმოჩენების ხელშეწყობა.
                </p>
                <p className="text-lg font-medium text-foreground">
                  ჩვენი ეპიზოდები ყოველთვის უფასო იქნება, რადგან გვჯერა, რომ ცოდნა ყველასთვის ხელმისაწვდომი უნდა იყოს.
                </p>
                <p>
                  თუ სურვილი გაქვთ, შეგიძლიათ მხარი დაუჭიროთ პოდკასტს დონაციით. დიდი მადლობა!
                </p>
              </div>

              {/* Bank Accounts */}
              <div className="max-w-md mx-auto space-y-4 mb-10">
                <p className="text-sm text-muted-foreground mb-6">
                  დააკოპირეთ სასურველი საბანკო ანგარიში
                </p>

                {bankAccounts.map((account) => (
                  <motion.div
                    key={account.iban}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className={`overflow-hidden border ${account.borderColor} ${account.bgColor} hover:shadow-md transition-all`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-left">
                            <p className={`text-sm font-semibold bg-gradient-to-r ${account.color} bg-clip-text text-transparent`}>
                              {account.bank}
                            </p>
                            <p className="text-sm font-mono text-muted-foreground mt-1">
                              {account.iban}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(account.iban)}
                            className="shrink-0"
                          >
                            {copiedAccount === account.iban ? (
                              <>
                                <Check className="size-4 mr-1 text-green-500" />
                                <span className="text-green-500">დაკოპირდა</span>
                              </>
                            ) : (
                              <>
                                <Copy className="size-4 mr-1" />
                                კოპირება
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <p className="text-sm text-muted-foreground pt-4">
                  მიმღები: <span className="font-medium text-foreground">გვანცა ველთაური</span>
                </p>
              </div>

              {/* Thank you message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-b from-amber-500/5 to-orange-500/5 rounded-2xl p-8 max-w-md mx-auto"
              >
                <Heart className="size-12 mx-auto mb-4 text-amber-500" />
                <h2 className="text-xl font-bold mb-2">მადლობა მხარდაჭერისთვის!</h2>
                <p className="text-muted-foreground text-sm">
                  თქვენი წვლილი გვეხმარება უფრო მეტი საინტერესო კონტენტის შექმნაში.
                </p>
              </motion.div>

              {/* YouTube CTA */}
              <div className="pt-12">
                <p className="text-muted-foreground mb-4">
                  ასევე, შეგიძლიათ მხარი დაუჭიროთ პოდკასტს YouTube არხის გამოწერით.
                </p>
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  asChild
                >
                  <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 size-5" />
                    გამოიწერე არხი
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
