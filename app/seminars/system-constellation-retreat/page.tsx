"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Clock,
  CheckCircle,
  Mail,
  ArrowRight,
  ChevronDown,
  Users,
  Mountain,
  Sparkles,
  Youtube,
  Waves,
  Lightbulb,
  Shield,
  Eye,
  Coffee,
  Utensils
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SystemConstellationRetreatPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  const day1Activities = [
    "სისტემური განლაგებები",
    "ტრანსფორმაციული სავარჯიშოები",
    "პირადი უკუკავშირი ტრენერებთან",
    "ბგერითი თერაპია"
  ]

  const day2Activities = [
    "სისტემური განლაგებები",
    "ღრმა თვითაღმოჩენის პროცესი",
    "ჯგუფური სესიები",
    "ბგერითი თერაპია"
  ]

  const valueCards = [
    {
      icon: <Lightbulb className="size-6" />,
      title: "უხილავი კავშირები",
      subtitle: "სისტემური დინამიკა",
      status: "გამოვლენილია"
    },
    {
      icon: <Shield className="size-6" />,
      title: "ენერგიის განთავისუფლება",
      subtitle: "წინაპრების ტვირთი",
      status: "გათავისუფლებულია"
    },
    {
      icon: <Users className="size-6" />,
      title: "ადგილი სისტემაში",
      subtitle: "ჰარმონია და ძალა",
      status: "ნაპოვნია"
    },
    {
      icon: <Eye className="size-6" />,
      title: "სხეულზე დაკვირვება",
      subtitle: "ემოციური კეთილდღეობა",
      status: "ათვისებულია"
    },
  ]

  const venueImages = [
    { src: "/images/system/facade.webp", alt: "სასტუმროს ფასადი" },
    { src: "/images/system/lobby.webp", alt: "ლობი" },
    { src: "/images/system/pool.webp", alt: "აუზი" },
    { src: "/images/system/jacuzzi.webp", alt: "ჯაკუზი" },
    { src: "/images/system/breakfast.webp", alt: "საუზმე" },
    { src: "/images/system/restaurant.webp", alt: "რესტორანი" },
    { src: "/images/system/enotca.webp", alt: "ენოთეკა" },
    { src: "/images/system/retreat.webp", alt: "რითრითი" },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0a0a0a]">
      <Header />

      <main className="flex-1 relative">
        {/* Subtle grain texture overlay */}
        <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Hero Section - Split Screen */}
        <section className="w-full min-h-[90vh] flex items-center relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-teal-950/10" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Badge */}
                <div className="mb-8">
                  <Badge className="rounded-none px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-transparent border-2 border-emerald-500/60 text-emerald-400">
                    1-3 ნოემბერი • SOLD OUT
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
                  სისტემური განლაგებების
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">
                    რითრითი
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-lg">
                  3 დღიანი ტრანსფორმაციული გამოცდილება მთებში.
                  <span className="text-neutral-300"> სისტემური განლაგებები, ბგერითი თერაპია და თვითაღმოჩენა.</span>
                </p>

                {/* Event details - minimal */}
                <div className="flex flex-wrap gap-6 text-sm text-neutral-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Mountain className="size-4" />
                    <span>გუდაური ლოჯი</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>გუდაური</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>მონაწილეები: 20+</span>
                  </div>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="size-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-medium text-white">
                        {["იბ", "ბა", "გვ", "დკ"][i]}
                      </div>
                    ))}
                  </div>
                  <span>20+ მონაწილე პირველ რითრითზე</span>
                </div>
              </motion.div>

              {/* Right - Waitlist Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="lg:pl-8"
              >
                <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 md:p-10">
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-emerald-500 mb-3 font-semibold">მომავალი რითრითი</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      გამოტოვე? დაესწარი შემდეგს.
                    </h2>
                    <p className="text-neutral-400">
                      დარეგისტრირდი პრიორიტეტულ სიაში და პირველმა შეიტყვე მომავალი რითრითის შესახებ.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-8"
                    >
                      <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                        <CheckCircle className="size-8 text-emerald-500" />
                      </div>
                      <p className="text-white font-medium text-lg mb-2">მადლობა!</p>
                      <p className="text-neutral-400 text-sm">შეგატყობინებთ ახალი რითრითის შესახებ</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="შეიყვანე ელფოსტა"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-14 bg-transparent border-0 border-b-2 border-neutral-700 rounded-none px-0 text-white placeholder:text-neutral-600 focus:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                        />
                        <Mail className="absolute right-0 top-1/2 -translate-y-1/2 size-5 text-neutral-600" />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-14 bg-white hover:bg-neutral-100 text-black font-semibold text-base rounded-none transition-all hover:scale-[1.02] active:scale-[0.98] group"
                      >
                        შემატყობინე პირველს
                        <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <p className="text-center text-xs text-neutral-600 pt-2">
                        <Users className="inline size-3 mr-1" />
                        შეუერთდი 150+ დაინტერესებულს
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What You Missed - Value Grid */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-4 font-semibold">რა მოხდა რითრითზე</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                ამას გამოტოვებდი
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {valueCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="bg-neutral-900/30 border-neutral-800 hover:border-emerald-500/30 transition-all duration-300 h-full group">
                    <CardContent className="p-6">
                      <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-extrabold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-neutral-500 mb-3">{card.subtitle}</p>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] border-teal-500/30 text-teal-500 bg-teal-500/5 font-semibold">
                        {card.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About - Cinematic Text */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-6 font-semibold text-center">მანიფესტი</p>

              <div className="space-y-6 text-center">
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                  გინდა დაინახო, რა უხილავი ძალები მართავს შენს ცხოვრებას?
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  ყოველი ჩვენგანი ცხოვრობს <span className="text-white">დიდ სისტემაში</span> – ოჯახში, საზოგადოებაში, ურთიერთობებში.
                  ხშირად ამ სისტემებში არსებული უხილავი კავშირები განსაზღვრავს ჩვენს
                  <span className="text-emerald-400"> არჩევანს და ცხოვრების გზას.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Venue Gallery */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-4 font-semibold">ლოკაცია</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                გუდაური ლოჯი
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                ადგილი, სადაც სიმშვიდე, ბუნება და კომფორტი ერთიანდება.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {venueImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* What's included at venue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Coffee className="size-4 text-emerald-500" />
                  <span className="text-sm">2 ღამე</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Utensils className="size-4 text-emerald-500" />
                  <span className="text-sm">საუზმე & ვახშამი</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Waves className="size-4 text-emerald-500" />
                  <span className="text-sm">აუზი & სპა</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Mountain className="size-4 text-emerald-500" />
                  <span className="text-sm">მთის ხედი</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Schedule - Accordion Style */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-4 font-semibold">პროგრამა</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                3 დღე ტრანსფორმაციის
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {/* Day 1 - Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-emerald-500/30 bg-emerald-500/5"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'day1' ? null : 'day1')}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-emerald-500">დღე I • 1 ნოემბერი</span>
                    <div>
                      <span className="text-white font-medium block">სისტემური განლაგებები</span>
                      <span className="text-xs text-neutral-500 mt-1 block">11:30 – 22:15</span>
                    </div>
                  </div>
                  <ChevronDown className={`size-5 text-emerald-500 transition-transform ${expandedSection === 'day1' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedSection === 'day1' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-emerald-500/20">
                        <ul className="space-y-2">
                          {day1Activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                              <span className="text-emerald-500/60 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Day 2 - Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-teal-500/30 bg-teal-500/5"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'day2' ? null : 'day2')}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-teal-500">დღე II • 2 ნოემბერი</span>
                    <div>
                      <span className="text-white font-medium block">ღრმა ტრანსფორმაცია</span>
                      <span className="text-xs text-neutral-500 mt-1 block">11:30 – 22:15</span>
                    </div>
                  </div>
                  <ChevronDown className={`size-5 text-teal-500 transition-transform ${expandedSection === 'day2' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedSection === 'day2' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-teal-500/20">
                        <ul className="space-y-2">
                          {day2Activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                              <span className="text-teal-500/60 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Day 3 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-neutral-800 bg-neutral-900/30"
              >
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-neutral-500">დღე III • 3 ნოემბერი</span>
                    <span className="text-white font-medium">საუზმე და დაბრუნება</span>
                  </div>
                  <span className="text-xs text-neutral-600">07:00 – 11:30</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Speakers - Hero Portraits */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-4 font-semibold">წამყვანები</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                შენი მეგზურები
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Speaker 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-8 text-center">
                  <div className="size-28 md:size-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mx-auto mb-6 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                    <span className="text-4xl md:text-5xl font-bold text-emerald-500/80">იბ</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">ია ბერსენაძე</h3>
                  <p className="text-emerald-500 uppercase tracking-widest text-xs font-semibold mb-4">ტრენერი</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    პიროვნული განვითარების ტრენერი
                  </p>
                </div>
              </motion.div>

              {/* Speaker 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-8 text-center">
                  <div className="size-28 md:size-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mx-auto mb-6 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                    <span className="text-4xl md:text-5xl font-bold text-emerald-500/80">ბა</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">ბაქარ აბრამიშვილი</h3>
                  <p className="text-emerald-500 uppercase tracking-widest text-xs font-semibold mb-4">ტრენერი</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    სისტემური განლაგებების ექსპერტი
                  </p>
                </div>
              </motion.div>

              {/* Speaker 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-8 text-center">
                  <div className="size-28 md:size-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mx-auto mb-6 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                    <span className="text-4xl md:text-5xl font-bold text-emerald-500/80">გვ</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">გვანცა ველთაური</h3>
                  <p className="text-emerald-500 uppercase tracking-widest text-xs font-semibold mb-4">ფასილიტატორი</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                  ფასილიტატორი
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Podcast Bridge */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-gradient-to-b from-neutral-950/50 to-transparent">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-widest text-emerald-500 mb-4 font-semibold">ვერ დაიცადო?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                დაიწყე მოგზაურობა ახლავე
              </h2>
              <p className="text-neutral-400 mb-10 text-lg">
                სანამ მომავალ რითრითს დაველოდებით, მოისმინე პოდკასტი და გაეცანი
                სისტემური განლაგებებისა და პიროვნული განვითარების თემებს.
              </p>

              {/* Podcast embeds placeholder - styled cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href="https://www.youtube.com/@KPODCAST_GE"
                    target="_blank"
                    className="group bg-neutral-900/50 border border-neutral-800 p-6 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="aspect-square bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-colors">
                      <Youtube className="size-12 text-emerald-500/60 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">ეპიზოდი #{i}</p>
                  </Link>
                ))}
              </div>

              <Button
                size="lg"
                className="rounded-none h-14 px-10 text-base bg-white hover:bg-neutral-100 text-black font-semibold transition-all group"
                asChild
              >
                <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 size-5" />
                  გამოიწერე არხი
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Previous Price - Anchoring */}
        <section className="w-full py-16 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="border border-neutral-800 bg-neutral-900/30 p-8 text-center">
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-semibold">წინა რითრითის ღირებულება</p>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="text-5xl font-bold text-neutral-400">2000</span>
                  <span className="text-neutral-500 text-lg">GEL</span>
                </div>
                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <p className="text-neutral-500 text-sm">
                    3 დღე • 2 ღამე • სისტემური განლაგებები • ბგერითი თერაპია
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-gradient-to-b from-emerald-950/10 to-transparent">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                შემდეგი რითრითი მალე
              </h2>
              <p className="text-neutral-400 mb-8">
                არ გამოტოვო მომავალი რითრითი. დარეგისტრირდი ახლა.
              </p>

              {isSubmitted ? (
                <div className="flex items-center justify-center gap-2 text-emerald-500">
                  <CheckCircle className="size-5" />
                  <span>უკვე დარეგისტრირებული ხარ!</span>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="შეიყვანე ელფოსტა"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 bg-neutral-900/50 border-neutral-800 rounded-none text-white placeholder:text-neutral-600 focus:border-emerald-500 focus-visible:ring-0"
                  />
                  <Button
                    type="submit"
                    className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    შემატყობინე
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
