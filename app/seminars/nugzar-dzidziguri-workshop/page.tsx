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
  Brain,
  Sparkles,
  Target,
  Zap,
  Youtube,
  Shield,
  Lightbulb,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NugzarDzidziguriWorkshopPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    setEmail("")
  }

  const day1Topics = [
    "დრამატული სამკუთხედი – მსხვერპლი, მოძალადე და მხსნელი",
    "რატომ ვირჩევთ ამ როლებს?",
    "თვითდაკვირვების პრაქტიკული დავალებები",
    "რეალური ცხოვრების მაგალითების ანალიზი",
    "მედიტაცია და რელაქსაცია"
  ]

  const day2Topics = [
    "ალტერნატიული, ჯანსაღი როლები",
    "გადაწყვეტილების მიღების ხელოვნება",
    "მოტივაციის ფსიქოლოგია",
    "ახალი მდგომარეობის ინტეგრაცია",
    "ენერგიის განახლება"
  ]

  const valueCards = [
    {
      icon: <Lightbulb className="size-6" />,
      title: "დრამატული სამკუთხედი",
      subtitle: "როლების იდენტიფიკაცია",
      status: "გამოვლენილია"
    },
    {
      icon: <Shield className="size-6" />,
      title: "ჯანსაღი ალტერნატივები",
      subtitle: "ტრანსფორმაციის გზა",
      status: "ათვისებულია"
    },
    {
      icon: <Brain className="size-6" />,
      title: "თვითდაკვირვება",
      subtitle: "შაბლონების აღმოჩენა",
      status: "პრაქტიკულია"
    },
    {
      icon: <Heart className="size-6" />,
      title: "ემოციური თავისუფლება",
      subtitle: "შინაგანი ძალა",
      status: "მიღწეულია"
    },
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-violet-950/10" />

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
                  <Badge className="rounded-none px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-transparent border-2 border-purple-500/60 text-purple-400">
                    3-4 მაისი • SOLD OUT
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
                  ტრანსფორმაციის
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500">
                    ვორქშოპი
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-lg">
                  როგორ გათავისუფლდე დესტრუქციული როლებისგან და შეცვალო შენი ცხოვრება.
                  <span className="text-neutral-300"> ორდღიანი ინტენსიური გამოცდილება ნუგზარ ძიძიგურთან.</span>
                </p>

                {/* Event details - minimal */}
                <div className="flex flex-wrap gap-6 text-sm text-neutral-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>10:00 – 18:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>თბილისი</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>მონაწილეები: 16</span>
                  </div>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="size-8 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-medium text-white">
                        {["ნძ", "გვ", "ია", "ბა"][i]}
                      </div>
                    ))}
                  </div>
                  <span>16 მონაწილე პირველ ვორქშოპზე</span>
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
                    <p className="text-xs uppercase tracking-widest text-purple-500 mb-3 font-semibold">მომავალი ვორქშოპი</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      გამოტოვე? დაესწარი შემდეგს..
                    </h2>
                    <p className="text-neutral-400">
                      დარეგისტრირდი პრიორიტეტულ სიაში და პირველმა შეიტყვე მომავალი ვორქშოპის შესახებ.
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
                      <p className="text-neutral-400 text-sm">შეგატყობინებთ ახალი ვორქშოპის შესახებ</p>
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
                          className="h-14 bg-transparent border-0 border-b-2 border-neutral-700 rounded-none px-0 text-white placeholder:text-neutral-600 focus:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
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
                        შეუერთდი 100+ დაინტერესებულს
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
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">რა მოხდა ვორქშოპზე</p>
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
                  <Card className="bg-neutral-900/30 border-neutral-800 hover:border-purple-500/30 transition-all duration-300 h-full group">
                    <CardContent className="p-6">
                      <div className="size-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-extrabold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-neutral-500 mb-3">{card.subtitle}</p>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em] border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-semibold">
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
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-6 font-semibold text-center">მანიფესტი</p>

              <div className="space-y-6 text-center">
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                  ეს არ იყო უბრალოდ ვორქშოპი.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  ეს იყო შენი შანსი, გაგეცნობიერებინა <span className="text-white">რა გიშლის ხელს</span> ბედნიერ ცხოვრებაში
                  და როგორ შეცვალო ეს <span className="text-purple-400">ერთხელ და სამუდამოდ.</span>
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  თუ ცხოვრებაში ერთსა და იმავე ნეგატიურ სცენარებში ხვდები,
                  თუ ურთიერთობებში კვლავ და კვლავ იმავე პრობლემებს ეჯახები.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">გალერეა</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                ფოტოები ვორქშოპიდან
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((num, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={`/images/nugzar-dzidzi/gallery-${num}.webp`}
                    alt={`ვორქშოპის ფოტო ${num}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
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
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">პროგრამა</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                2 დღე ტრანსფორმაციის
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {/* Day 1 - Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-purple-500/30 bg-purple-500/5"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'day1' ? null : 'day1')}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-purple-500">დღე I • 3 მაისი</span>
                    <div>
                      <span className="text-white font-medium block">გააცნობიერე, სად ხარ ახლა</span>
                      <span className="text-xs text-neutral-500 mt-1 block">10:00 – 18:00</span>
                    </div>
                  </div>
                  <ChevronDown className={`size-5 text-purple-500 transition-transform ${expandedSection === 'day1' ? 'rotate-180' : ''}`} />
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
                      <div className="px-6 pb-6 pt-2 border-t border-purple-500/20">
                        <ul className="space-y-2">
                          {day1Topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                              <span className="text-purple-500/60 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                              <span>{topic}</span>
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
                className="border border-violet-500/30 bg-violet-500/5"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === 'day2' ? null : 'day2')}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-violet-500">დღე II • 4 მაისი</span>
                    <div>
                      <span className="text-white font-medium block">შენი ტრანსფორმაციის გზა</span>
                      <span className="text-xs text-neutral-500 mt-1 block">10:00 – 18:00</span>
                    </div>
                  </div>
                  <ChevronDown className={`size-5 text-violet-500 transition-transform ${expandedSection === 'day2' ? 'rotate-180' : ''}`} />
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
                      <div className="px-6 pb-6 pt-2 border-t border-violet-500/20">
                        <ul className="space-y-2">
                          {day2Topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                              <span className="text-violet-500/60 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">წამყვანები</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                შენი მეგზურები
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Speaker 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-8 md:p-10 text-center">
                  {/* Large initial */}
                  <div className="size-32 md:size-40 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 mx-auto mb-6 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                    <span className="text-5xl md:text-6xl font-bold text-purple-500/80">ნძ</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">ნუგზარ ძიძიგური</h3>
                  <p className="text-purple-500 uppercase tracking-widest text-xs font-semibold mb-4">ტრენერი</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    პიროვნული განვითარებისა და ტრანსფორმაციის ექსპერტი
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
                <div className="relative overflow-hidden bg-neutral-900 border border-neutral-800 p-8 md:p-10 text-center">
                  {/* Large initial */}
                  <div className="size-32 md:size-40 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 mx-auto mb-6 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                    <span className="text-5xl md:text-6xl font-bold text-purple-500/80">გვ</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">გვანცა ველთაური</h3>
                  <p className="text-purple-500 uppercase tracking-widest text-xs font-semibold mb-4">ფასილიტატორი</p>
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
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">ვერ დაიცადო?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                დაიწყე მოგზაურობა ახლავე
              </h2>
              <p className="text-neutral-400 mb-10 text-lg">
                სანამ მომავალ ვორქშოპს დაველოდებით, მოისმინე პოდკასტი და გაეცანი
                პიროვნული განვითარებისა და ტრანსფორმაციის თემებს.
              </p>

              {/* Podcast embeds placeholder - styled cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href="https://www.youtube.com/@KPODCAST_GE"
                    target="_blank"
                    className="group bg-neutral-900/50 border border-neutral-800 p-6 hover:border-purple-500/30 transition-all"
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-violet-500/20 transition-colors">
                      <Youtube className="size-12 text-purple-500/60 group-hover:text-purple-500 transition-colors" />
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
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-4 font-semibold">წინა ვორქშოპის ღირებულება</p>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="text-5xl font-bold text-neutral-400">650</span>
                  <span className="text-neutral-500 text-lg">GEL</span>
                </div>
                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <p className="text-neutral-500 text-sm">
                    16 საათი • პრაქტიკული მეთოდები • პირადი უკუკავშირი
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-gradient-to-b from-purple-950/10 to-transparent">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                შემდეგი ვორქშოპი მალე
              </h2>
              <p className="text-neutral-400 mb-8">
                არ გამოტოვო მომავალი ვორქშოპი. დარეგისტრირდი ახლა.
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
                    className="h-14 bg-neutral-900/50 border-neutral-800 rounded-none text-white placeholder:text-neutral-600 focus:border-purple-500 focus-visible:ring-0"
                  />
                  <Button
                    type="submit"
                    className="h-14 px-8 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold rounded-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
