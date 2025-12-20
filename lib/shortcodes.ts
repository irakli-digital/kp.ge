// Shortcode definitions and processing utilities

export type ShortcodeType = 'newsletter' | 'youtube-channel';

export interface ContentPart {
  type: 'html' | 'shortcode';
  content: string;
  shortcodeType?: ShortcodeType;
}

// Patterns for shortcodes
const SHORTCODE_PATTERNS = {
  // Matches [გამოიწერეთ უფასოდ] or [გამოიწერეთ Newsletter]
  // Also captures optional surrounding <strong>, <em>, <b>, <i> tags
  newsletter: /(?:<(?:strong|em|b|i)>)?\s*\[გამოიწერეთ\s*(უფასოდ|Newsletter)?\]\s*(?:<\/(?:strong|em|b|i)>)?/gi,
  // Matches [YouTube არხი] - link to YouTube channel
  youtubeChannel: /(?:<(?:strong|em|b|i)>)?\s*\[YouTube\s*არხი\]\s*(?:<\/(?:strong|em|b|i)>)?/gi,
};

/**
 * Cleans up empty HTML elements that might be left behind after shortcode extraction
 */
function cleanEmptyElements(html: string): string {
  // Remove empty paragraphs, blockquotes, and other common wrappers
  return html
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<blockquote>\s*<\/blockquote>/gi, '')
    .replace(/<div>\s*<\/div>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
    .replace(/<strong>\s*<\/strong>/gi, '')
    .replace(/<em>\s*<\/em>/gi, '')
    // Also clean up paragraphs/blockquotes that only contain whitespace or line breaks
    .replace(/<p>(\s|<br\s*\/?>)*<\/p>/gi, '')
    .replace(/<blockquote>(\s|<br\s*\/?>)*<\/blockquote>/gi, '');
}

/**
 * Splits HTML content into parts, separating shortcodes from regular HTML
 */
export function parseContentWithShortcodes(html: string): ContentPart[] {
  const parts: ContentPart[] = [];
  let lastIndex = 0;

  // Combined pattern for all shortcodes - also capture surrounding paragraph/blockquote tags
  const combinedPattern = new RegExp(
    `(<p>\\s*)?(${SHORTCODE_PATTERNS.newsletter.source}|${SHORTCODE_PATTERNS.youtubeChannel.source})(\\s*<\\/p>)?`,
    'gi'
  );

  let match;
  while ((match = combinedPattern.exec(html)) !== null) {
    // Add HTML before this shortcode (cleaned of empty elements)
    if (match.index > lastIndex) {
      const htmlContent = cleanEmptyElements(html.slice(lastIndex, match.index));
      if (htmlContent.trim()) {
        parts.push({
          type: 'html',
          content: htmlContent,
        });
      }
    }

    // Determine shortcode type
    const matchedText = match[0];
    let shortcodeType: ShortcodeType = 'newsletter';

    // Reset regex lastIndex before testing
    SHORTCODE_PATTERNS.newsletter.lastIndex = 0;
    SHORTCODE_PATTERNS.youtubeChannel.lastIndex = 0;

    if (SHORTCODE_PATTERNS.youtubeChannel.test(matchedText)) {
      shortcodeType = 'youtube-channel';
    } else if (SHORTCODE_PATTERNS.newsletter.test(matchedText)) {
      shortcodeType = 'newsletter';
    }

    // Reset regex lastIndex since we used .test()
    SHORTCODE_PATTERNS.newsletter.lastIndex = 0;
    SHORTCODE_PATTERNS.youtubeChannel.lastIndex = 0;

    parts.push({
      type: 'shortcode',
      content: matchedText,
      shortcodeType,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining HTML after last shortcode (cleaned of empty elements)
  if (lastIndex < html.length) {
    const htmlContent = cleanEmptyElements(html.slice(lastIndex));
    if (htmlContent.trim()) {
      parts.push({
        type: 'html',
        content: htmlContent,
      });
    }
  }

  // If no shortcodes found, return the whole content as HTML
  if (parts.length === 0) {
    parts.push({
      type: 'html',
      content: html,
    });
  }

  return parts;
}

/**
 * Checks if content contains any shortcodes
 */
export function hasShortcodes(html: string): boolean {
  return SHORTCODE_PATTERNS.newsletter.test(html);
}
