// Shortcode definitions and processing utilities

export type ShortcodeType = 'newsletter' | 'youtube';

export interface ContentPart {
  type: 'html' | 'shortcode';
  content: string;
  shortcodeType?: ShortcodeType;
}

// Patterns for shortcodes
const SHORTCODE_PATTERNS = {
  // Matches [გამოიწერეთ უფასოდ] or [გამოიწერეთ Newsletter]
  newsletter: /\[გამოიწერეთ\s*(უფასოდ|Newsletter)?\]/gi,
};

/**
 * Splits HTML content into parts, separating shortcodes from regular HTML
 */
export function parseContentWithShortcodes(html: string): ContentPart[] {
  const parts: ContentPart[] = [];
  let lastIndex = 0;

  // Combined pattern for all shortcodes
  const combinedPattern = new RegExp(
    `(${SHORTCODE_PATTERNS.newsletter.source})`,
    'gi'
  );

  let match;
  while ((match = combinedPattern.exec(html)) !== null) {
    // Add HTML before this shortcode
    if (match.index > lastIndex) {
      parts.push({
        type: 'html',
        content: html.slice(lastIndex, match.index),
      });
    }

    // Determine shortcode type
    const matchedText = match[0];
    let shortcodeType: ShortcodeType = 'newsletter';

    if (SHORTCODE_PATTERNS.newsletter.test(matchedText)) {
      shortcodeType = 'newsletter';
    }

    // Reset regex lastIndex since we used .test()
    SHORTCODE_PATTERNS.newsletter.lastIndex = 0;

    parts.push({
      type: 'shortcode',
      content: matchedText,
      shortcodeType,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining HTML after last shortcode
  if (lastIndex < html.length) {
    parts.push({
      type: 'html',
      content: html.slice(lastIndex),
    });
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
