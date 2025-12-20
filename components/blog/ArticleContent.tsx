"use client"

import { parseContentWithShortcodes, ContentPart } from "@/lib/shortcodes"
import NewsletterCTA from "./NewsletterCTA"

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
            default:
              return null;
          }
        }

        return null;
      })}
    </div>
  );
}
