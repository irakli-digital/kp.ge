"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Play, Clock, Heart, Brain, Atom, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface LatestVideo {
  id: string
  title: string
  thumbnail: string
  duration: string
}

interface YouTubeStats {
  subscriberCount: string
  videoCount: string
  viewCount: string
  latestVideo: LatestVideo | null
  latestVideos: LatestVideo[]
}

export default function LandingPage() {
  const [stats, setStats] = useState<YouTubeStats>({
    subscriberCount: "...",
    videoCount: "...",
    viewCount: "...",
    latestVideo: null,
    latestVideos: [],
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/youtube-stats')
        const data = await response.json()
        setStats({
          subscriberCount: data.subscriberCount || "10K+",
          videoCount: data.videoCount || "50+",
          viewCount: data.viewCount || "100K+",
          latestVideo: data.latestVideo || null,
          latestVideos: data.latestVideos || [],
        })
      } catch (error) {
        console.error('Failed to fetch YouTube stats:', error)
        setStats({
          subscriberCount: "10K+",
          videoCount: "50+",
          viewCount: "100K+",
          latestVideo: null,
          latestVideos: [],
        })
      }
    }
    fetchStats()
  }, [])
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Featured episode - the latest/best one
  const featuredEpisode = {
    id: "eoHyQ7T0fQ8",
    title: "ცნობიერების პრინციპები - როგორ მივიღოთ გადაწყვეტილებები",
    category: "ცნობიერება",
    duration: "1:45:00",
    description: "ჩაღრმავება გადაწყვეტილების მიღების მექანიზმებში და ცნობიერების პრინციპებში.",
  }

  const latestEpisodes = [
    {
      id: "eoHyQ7T0fQ8",
      title: "ცნობიერების პრინციპები",
      category: "ცნობიერება",
      duration: "1:45:00",
      thumbnail: `https://img.youtube.com/vi/eoHyQ7T0fQ8/maxresdefault.jpg`,
    },
    {
      id: "v6g1Ou8y0a8",
      title: "მენტალური ჯანმრთელობა",
      category: "ჯანმრთელობა",
      duration: "1:32:00",
      thumbnail: `https://img.youtube.com/vi/v6g1Ou8y0a8/maxresdefault.jpg`,
    },
    {
      id: "I4hIocEA3t4",
      title: "პიროვნული განვითარება",
      category: "განვითარება",
      duration: "1:28:00",
      thumbnail: `https://img.youtube.com/vi/I4hIocEA3t4/maxresdefault.jpg`,
    },
  ]

  const topics = [
    {
      title: "საკუთარი თავის ფსიქოლოგია",
      description: "თვითშეფასება, ემოციები და შინაგანი ბალანსი.",
      icon: <Brain className="size-6" />,
      gradient: "from-rose-500/20 to-pink-500/20",
      borderColor: "border-rose-500/30",
      iconColor: "text-rose-500",
    },
    {
      title: "სხეული და დღეგრძელობა",
      description: "ჯანსაღი ცხოვრების წესი და პრევენცია.",
      icon: <Heart className="size-6" />,
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-500",
    },
    {
      title: "მეცნიერება და აღმოჩენები",
      description: "საოცარი ფაქტები და თანამედროვე კვლევები.",
      icon: <Atom className="size-6" />,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-500",
    },
    {
      title: "ზრდა და ტრანსფორმაცია",
      description: "პრაქტიკული რჩევები თვითგანვითარებისთვის.",
      icon: <Sparkles className="size-6" />,
      gradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-500",
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0a0a0a]">
      <Header />

      <main className="flex-1 relative">
        {/* Subtle grain texture */}
        <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Hero Section - Split Screen */}
        <section className="w-full min-h-[85vh] flex items-center relative overflow-hidden">
          {/* YouTube Video Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 scale-150">
              <iframe
                src="https://www.youtube.com/embed/qfRwK6O_EhM?autoplay=1&mute=1&loop=1&playlist=qfRwK6O_EhM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&iv_load_policy=3"
                title="Background Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
                style={{ border: 'none' }}
              />
            </div>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-orange-950/20" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Schedule pill */}
              <div className="mb-6">
                <Badge className="rounded-full px-4 py-2 text-xs font-semibold tracking-wide bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-sm">
                  ახალი ეპიზოდი ყოველ ოთხშაბათს
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
                ცოდნისმოყვარე
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                  პოდკასტი
                </span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                ჩაღრმავდი მენტალური ჯანმრთელობის, მეცნიერებისა და გონების არქიტექტურის თემებში
                <span className="text-white font-medium"> გვანცა ველთაურთან ერთად.</span>
              </p>

              {/* Platform buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-none bg-red-600 hover:bg-red-700 text-white font-semibold text-base transition-all group"
                  asChild
                >
                  <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    უყურე YouTube-ზე
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-none border-neutral-500/50 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white font-semibold text-base"
                  asChild
                >
                  <Link href="https://open.spotify.com/show/12W0rak7PaZnhYnCeQ60mt" target="_blank" rel="noopener noreferrer">
                    <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center text-sm text-neutral-400">
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-white block">{stats.videoCount}</span>
                  ეპიზოდი
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-white block">{stats.subscriberCount}</span>
                  გამომწერი
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-bold text-white block">{stats.viewCount}</span>
                  მოსმენა
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Episode - Big Player */}
        <section className="w-full py-16 md:py-20 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">უახლესი ეპიზოდი</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {stats.latestVideo?.title || featuredEpisode.title}
                </h2>
              </div>

              {/* Video embed with custom overlay */}
              <div className="relative group">
                <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${stats.latestVideo?.id || featuredEpisode.id}`}
                    title={stats.latestVideo?.title || featuredEpisode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  />
                </div>

                {/* Meta info below */}
                <div className="flex items-center justify-between mt-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="rounded-none border-amber-500/30 text-amber-500 bg-amber-500/5 text-xs uppercase tracking-wider">
                      პოდკასტი
                    </Badge>
                    {(stats.latestVideo?.duration || featuredEpisode.duration) && (
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {stats.latestVideo?.duration || featuredEpisode.duration}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`https://www.youtube.com/watch?v=${stats.latestVideo?.id || featuredEpisode.id}`}
                    target="_blank"
                    className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    უყურე YouTube-ზე
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Latest Episodes Grid */}
        <section className="w-full py-16 md:py-20 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">ეპიზოდები</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">მოისმინე პოდკასტი</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Show episodes 2-4 (skip first one which is shown above as featured) */}
              {(stats.latestVideos.length > 1 ? stats.latestVideos.slice(1, 4) : latestEpisodes).map((episode, i) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={`https://www.youtube.com/watch?v=${episode.id}`}
                    target="_blank"
                    className="group block"
                  >
                    <Card className="h-full overflow-hidden bg-neutral-900/30 border-neutral-800 hover:border-amber-500/30 transition-all duration-300">
                      <CardContent className="p-0">
                        {/* Thumbnail with play overlay */}
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={episode.thumbnail || `https://img.youtube.com/vi/${episode.id}/maxresdefault.jpg`}
                            alt={episode.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-colors" />
                          {/* Play button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all group-hover:scale-110 shadow-xl shadow-black/30">
                              <Play className="size-7 text-black ml-1 drop-shadow-md" fill="black" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <Badge variant="outline" className="mb-3 rounded-none text-[10px] uppercase tracking-wider border-amber-500/30 text-amber-500 bg-amber-500/5">
                            პოდკასტი
                          </Badge>
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {episode.title}
                          </h3>
                          <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                            <span className="text-neutral-500 text-sm flex items-center gap-2">
                              <Clock className="size-4" />
                              {episode.duration}
                            </span>
                            <span className="text-white bg-neutral-800 hover:bg-amber-500 px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
                              <Play className="size-4" fill="currentColor" />
                              მოსმენა
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center pt-12"
            >
              <Button
                size="lg"
                className="h-14 px-10 rounded-none bg-white hover:bg-neutral-100 text-black font-semibold text-base transition-all group"
                asChild
              >
                <Link href="https://www.youtube.com/@KPODCAST_GE" target="_blank" rel="noopener noreferrer">
                  ნახე ყველა ეპიზოდი
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Topics - Editorial Style */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">თემატიკა</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">რაზე ვსაუბრობთ</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                მოისმინე საინტერესო ინტერვიუები, ისტორიები და მიიღე პრაქტიკული რჩევები.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {topics.map((topic, i) => (
                <motion.div key={i} variants={item}>
                  <Card className={`h-full bg-gradient-to-br ${topic.gradient} border ${topic.borderColor} hover:border-opacity-60 transition-all duration-300 group`}>
                    <CardContent className="p-6">
                      <div className={`size-12 rounded-lg bg-neutral-900/50 flex items-center justify-center mb-4 ${topic.iconColor}`}>
                        {topic.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {topic.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Host */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-neutral-950/50">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square max-w-sm mx-auto relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/guest photos/გვანვა ველთაური.jpg"
                    alt="გვანცა ველთაური"
                    fill
                    className="object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">წამყვანი</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">გვანცა ველთაური</h2>
                <div className="space-y-4 text-neutral-400">
                  <p>
                    ვისაუბრებთ მნიშვნელოვან და საინტერესო თემებზე საინტერესო სტუმრებთან, სხვადასხვა დარგის
                    სპეციალისტებთან თუ უბრალოდ გამორჩეულ ადამიანებთან ერთად.
                  </p>
                  <p>
                    დიდი იმედი მაქვს, რომ თითოეული პოდკასტიდან მინიმუმ ერთი ადამიანი მაინც გაიგებს ახალ რამეს
                    ან სხვა თვალით შეხედავს უკვე არსებულს.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Workshops CTA */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">ვორქშოპები და სემინარები</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                შეისწავლე ცნობიერების პრინციპები
              </h2>
              <p className="text-neutral-400 text-lg mb-10">
                გეპატიჟებით პრაქტიკულ სემინარებზე, სადაც ცნობიერებასთან და მის მექანიზმებთან
                დაკავშირებულ საკითხებს განვიხილავთ.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 rounded-none border-neutral-700 bg-transparent hover:bg-neutral-900 text-white font-semibold text-base"
                asChild
              >
                <Link href="/seminars/consciousness">
                  გაიგე მეტი
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Inner Circle / Support Section */}
        <section className="w-full py-20 md:py-28 border-t border-neutral-800/50 bg-gradient-to-b from-amber-950/10 to-transparent">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-semibold">შინაგანი წრე</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                შეუერთდი შინაგან წრეს
              </h2>
              <p className="text-neutral-400 text-lg mb-4">
                ყველა ეპიზოდი ყოველთვის სრულიად უფასო იქნება, რადგან გვჯერა, რომ ცოდნა ყველასთვის
                ხელმისაწვდომი უნდა იყოს!
              </p>
              <p className="text-neutral-500 mb-10">
                მხარი დაუჭირე დამოუკიდებელ ჟურნალისტიკას და მიიღე ადრეული წვდომა სემინარებზე.
              </p>
              <Button
                size="lg"
                className="h-14 px-10 rounded-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-base transition-all group"
                asChild
              >
                <Link href="/donations">
                  <Users className="mr-2 size-5" />
                  შეუერთდი
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
