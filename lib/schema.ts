import type { BlogPost, FAQ } from './types'

const BASE_URL = 'https://kp.ge'
const LOGO_URL = `${BASE_URL}/images/kpodcast-logo.webp`

// Organization Schema - Use on all pages
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ცოდნისმოყვარე პოდკასტი',
    url: BASE_URL,
    logo: LOGO_URL,
    description: 'პოდკასტი მენტალური ჯანმრთელობის, მეცნიერებისა და პიროვნული განვითარების შესახებ',
    sameAs: [
      'https://www.youtube.com/@KPODCAST_GE',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Georgian', 'English'],
    },
  }
}

// Article Schema - Use on blog posts (with Latin keyword injection)
export function generateArticleSchema(post: BlogPost, schemaKeywords?: string[] | null) {
  const defaultKeywords = [
    'podcast',
    'georgia',
    'mental health',
    'psychology',
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title_ka,
    description: post.excerpt_ka || post.content_ka.substring(0, 160),
    image: post.featured_image || `${BASE_URL}/og-cover.png`,
    datePublished: new Date(post.published_at).toISOString(),
    dateModified: new Date(post.updated_at).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'ცოდნისმოყვარე პოდკასტი',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ცოდნისმოყვარე პოდკასტი',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    // Latin keywords injection for "invisible" SEO
    keywords: schemaKeywords || defaultKeywords,
  }
}

// FAQPage Schema - Use on FAQ page
export function generateFAQPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question_ka,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer_ka,
      },
    })),
  }
}

// BreadcrumbList Schema - Use on blog list and posts
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// WebPage Schema - Use on static pages
export function generateWebPageSchema(options: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.title,
    description: options.description,
    url: options.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ცოდნისმოყვარე პოდკასტი',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ცოდნისმოყვარე პოდკასტი',
    },
  }
}
