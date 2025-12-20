"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Youtube, Mail, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage(data.message)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(data.error)
      }
    } catch {
      setSubmitStatus("error")
      setStatusMessage("დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით")
    } finally {
      setIsSubmitting(false)
    }
  }

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
      description: "მოგვწერეთ პირდაპირ ელფოსტაზე",
      icon: <Mail className="size-6" />,
      href: "mailto:gvantsa@kp.ge",
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
                შეავსეთ ფორმა ან აირჩიეთ თქვენთვის მოსახერხებელი საკომუნიკაციო არხი.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl mx-auto mb-16"
            >
              <Card className="border-border bg-card/50">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">სახელი</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="თქვენი სახელი"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">ელ-ფოსტა</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-muted/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">შეტყობინება</Label>
                      <Textarea
                        id="message"
                        placeholder="თქვენი შეტყობინება..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-muted/50 border-border resize-none"
                      />
                    </div>

                    {submitStatus !== "idle" && (
                      <div
                        className={`p-4 rounded-lg ${
                          submitStatus === "success"
                            ? "bg-green-500/10 text-green-500 border border-green-500/30"
                            : "bg-red-500/10 text-red-500 border border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {submitStatus === "success" && <CheckCircle className="size-5" />}
                          {statusMessage}
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          იგზავნება...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 size-4" />
                          გაგზავნა
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-center text-muted-foreground mb-6">ან დაგვიკავშირდით პირდაპირ:</p>
              <div className="grid gap-6 md:grid-cols-2">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
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
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
