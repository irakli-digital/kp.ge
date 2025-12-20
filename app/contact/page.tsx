"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Youtube, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const contactMethods = [
    {
      title: "YouTube",
      description: "გამოიწერეთ არხი და გაგვიზიარეთ თქვენი მოსაზრებები კომენტარებში",
      icon: <Youtube className="size-6" />,
      href: "https://www.youtube.com/@KPODCAST_GE",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      title: "ელფოსტა",
      description: "მოგვწერეთ ელფოსტაზე",
      icon: <Mail className="size-6" />,
      href: "mailto:contact@kp.ge",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
    },
  ]

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
                <MessageCircle className="size-4 mr-2" />
                კონტაქტი
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                დაგვიკავშირდი
              </h1>

              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                გაქვთ კითხვა, შეთავაზება ან უბრალოდ გსურთ საუბარი? 
                აირჩიეთ თქვენთვის მოსახერხებელი საკომუნიკაციო არხი.
              </p>

              {/* Contact methods */}
              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <Card className={`h-full overflow-hidden border ${method.borderColor} ${method.bgColor} hover:shadow-md transition-all cursor-pointer group`}>
                        <CardContent className="p-6 text-center">
                          <div className={`size-14 rounded-full ${method.bgColor} mx-auto mb-4 flex items-center justify-center ${method.color}`}>
                            {method.icon}
                          </div>
                          <h2 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                            {method.title}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            {method.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Additional info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 p-8 rounded-2xl bg-gradient-to-b from-amber-500/5 to-orange-500/5"
              >
                <h2 className="text-xl font-bold mb-4">გვანცა ველთაური</h2>
                <p className="text-muted-foreground mb-6">
                  ცოდნისმოყვარე პოდკასტის ავტორი და წამყვანი.
                  მოხარული ვიქნები თქვენი გამოხმაურებით!
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
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
