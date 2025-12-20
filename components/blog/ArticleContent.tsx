"use client"

import { parseContentWithShortcodes } from "@/lib/shortcodes"
import NewsletterCTA from "./NewsletterCTA"
import YouTubeChannelButton from "./YouTubeChannelButton"

interface ArticleContentProps {
  html: string;
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const parts = parseContentWithShortcodes(html);

  return (
    <div className="article-content">
      {parts.map((part, index) => {
        if (part.type === 'html') {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        }

        if (part.type === 'shortcode') {
          switch (part.shortcodeType) {
            case 'newsletter':
              return <NewsletterCTA key={index} />;
            case 'youtube-channel':
              return <YouTubeChannelButton key={index} />;
            default:
              return null;
          }
        }

        return null;
      })}
    </div>
  );
}
