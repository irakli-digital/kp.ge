import Link from "next/link"
import { Youtube } from "lucide-react"

export default function YouTubeChannelButton() {
  return (
    <Link
      href="https://www.youtube.com/@KPODCAST_GE"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors"
    >
      <Youtube className="size-4" />
      YouTube არხი
    </Link>
  )
}
