import type { BlogPost, FAQ } from './types'

const BASE_URL = 'https://mypen.ge'
const LOGO_URL = `${BASE_URL}/images/logo.png`

// Organization Schema - Use on all pages
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mypen.ge',
    url: BASE_URL,
    logo: LOGO_URL,
    description: 'AI Aggregator - ChatGPT, Claude, Gemini ერთ პლატფორმაზე ქართულად',
    sameAs: [
      'https://facebook.com/mypen.ge',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Georgian', 'English'],
    },
  }
}

// SoftwareApplication Schema - Use on home and product pages
export function generateSoftwareApplicationSchema(options?: {
  keywords?: string[]
}) {
  const defaultKeywords = [
    'chatgpt georgia',
    'claude ai kartulad',
    'ai chat saqartveloshi',
    'gemini georgia',
    'ai assistant georgian',
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mypen',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'AI Assistant',
    operatingSystem: 'Web',
    url: BASE_URL,
    description: 'ყველა AI მოდელი ერთ პლატფორმაზე - ChatGPT, Claude, Gemini ქართულად',
    offers: [
      {
        '@type': 'Offer',
        name: 'Mypen Light',
        price: '0',
        priceCurrency: 'GEL',
        description: 'უფასო წვდომა საბაზისო AI მოდელებზე',
      },
      {
        '@type': 'Offer',
        name: 'Mypen PRO',
        price: '29',
        priceCurrency: 'GEL',
        description: 'GPT-4o, Gemini 2.5 Flash და სხვა პრემიუმ მოდელები',
      },
      {
        '@type': 'Offer',
        name: 'Mypen ULTRA',
        price: '69',
        priceCurrency: 'GEL',
        description: 'GPT-5, Claude Opus, Gemini 3.0 Pro - ყველა მოდელზე სრული წვდომა',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
      bestRating: '5',
      worstRating: '1',
    },
    keywords: options?.keywords || defaultKeywords,
  }
}

// Article Schema - Use on blog posts (with Latin keyword injection)
export function generateArticleSchema(post: BlogPost, schemaKeywords?: string[] | null) {
  const defaultKeywords = [
    'ai',
    'artificial intelligence',
    'mypen',
    'georgia',
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title_ka,
    description: post.excerpt_ka || post.content_ka.substring(0, 160),
    image: post.featured_image || `${BASE_URL}/images/og-image.webp`,
    datePublished: new Date(post.published_at).toISOString(),
    dateModified: new Date(post.updated_at).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Mypen.ge',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mypen.ge',
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
      name: 'Mypen.ge',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mypen.ge',
    },
  }
}

// Product/Service Schema - Use on hub pages (models, tools, templates)
export function generateProductSchema(options: {
  name: string
  description: string
  url: string
  category: 'AI Model' | 'AI Tool' | 'Template'
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: options.category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GEL',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'Mypen.ge',
      url: BASE_URL,
    },
    // Latin keywords for invisible SEO layer
    keywords: options.keywords,
  }
}
