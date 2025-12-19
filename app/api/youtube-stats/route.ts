import { NextResponse } from 'next/server'

// Cache the stats for 1 hour to avoid hitting API limits
let cachedStats: {
  subscriberCount: string
  videoCount: string
  viewCount: string
  latestVideo: {
    id: string
    title: string
    thumbnail: string
    duration: string
  } | null
  timestamp: number
} | null = null

const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

// Podcast playlist ID (from the URL you provided)
const PODCAST_PLAYLIST_ID = 'PLd32eByNRq4DoX5YBFYz3UiOLfp6QvOg4'

// Format ISO 8601 duration to human readable
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''

  const hours = match[1] ? parseInt(match[1]) : 0
  const minutes = match[2] ? parseInt(match[2]) : 0
  const seconds = match[3] ? parseInt(match[3]) : 0

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export async function GET() {
  // Return cached data if still valid
  if (cachedStats && Date.now() - cachedStats.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedStats)
  }

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: 'YouTube API credentials not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch channel statistics (subscribers, total views)
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`)
    }

    const channelData = await channelResponse.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found')
    }

    const channelStats = channelData.items[0].statistics

    // Fetch playlist to get podcast episode count and latest video
    const playlistItemsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${PODCAST_PLAYLIST_ID}&maxResults=1&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    let episodeCount = '50+'
    let latestVideo: { id: string; title: string; thumbnail: string; duration: string } | null = null

    if (playlistItemsResponse.ok) {
      const playlistItemsData = await playlistItemsResponse.json()

      // Get the latest video details
      if (playlistItemsData.items && playlistItemsData.items.length > 0) {
        const latestItem = playlistItemsData.items[0]
        const videoId = latestItem.contentDetails.videoId

        // Fetch video details for duration
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`,
          { next: { revalidate: 3600 } }
        )

        let duration = ''
        if (videoResponse.ok) {
          const videoData = await videoResponse.json()
          if (videoData.items && videoData.items.length > 0) {
            duration = formatDuration(videoData.items[0].contentDetails.duration)
          }
        }

        latestVideo = {
          id: videoId,
          title: latestItem.snippet.title,
          thumbnail: latestItem.snippet.thumbnails?.maxres?.url ||
                     latestItem.snippet.thumbnails?.high?.url ||
                     `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: duration,
        }
      }
    }

    // Fetch playlist details for episode count
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=${PODCAST_PLAYLIST_ID}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    )

    if (playlistResponse.ok) {
      const playlistData = await playlistResponse.json()
      if (playlistData.items && playlistData.items.length > 0) {
        // Subtract 3 to exclude non-podcast videos in the playlist
        const rawCount = playlistData.items[0].contentDetails.itemCount
        const adjustedCount = Math.max(0, rawCount - 3)
        episodeCount = adjustedCount.toString()
      }
    }

    // Format numbers for display
    const formatNumber = (num: string) => {
      const n = parseInt(num, 10)
      if (n >= 1000000) {
        return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      }
      if (n >= 1000) {
        return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      }
      return n.toString()
    }

    cachedStats = {
      subscriberCount: formatNumber(channelStats.subscriberCount),
      videoCount: episodeCount,
      viewCount: formatNumber(channelStats.viewCount),
      latestVideo,
      timestamp: Date.now(),
    }

    return NextResponse.json(cachedStats)
  } catch (error) {
    console.error('YouTube API error:', error)

    // Return fallback data if API fails
    return NextResponse.json({
      subscriberCount: '10K+',
      videoCount: '50+',
      viewCount: '100K+',
      latestVideo: null,
      error: 'Failed to fetch live stats',
    })
  }
}
