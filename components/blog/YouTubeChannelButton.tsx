import Link from "next/link"
import { Youtube, ExternalLink } from "lucide-react"

export default function YouTubeChannelButton() {
  return (
    <div className="my-8 flex items-center gap-4 p-4 bg-red-950/20 border border-red-500/20 rounded-lg">
      <div className="p-2 bg-red-600/20 rounded-lg shrink-0">
        <Youtube className="size-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">უყურე მეტ ვიდეოებს YouTube-ზე</p>
      </div>
      <Link
        href="https://www.youtube.com/@KPODCAST_GE"
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-cta-button shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-xs font-semibold transition-colors"
      >
        არხი
        <ExternalLink className="size-3" />
      </Link>
    </div>
  )
}
