import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import JsonLd from "@/components/JsonLd";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import ArticleContent from "@/components/blog/ArticleContent";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPostSlugs();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    // Return empty array if database query fails during build
    // Pages will be generated on-demand with dynamicParams = true
    return [];
  }
}

// Revalidate every 60 seconds - fresh content without full rebuild  
export const revalidate = 60;

// Generate static params at build time, but allow new ones at runtime
export const dynamicParams = true;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "პოსტი ვერ მოიძებნა | Mypen.ge",
    };
  }

  const description = post.excerpt_ka || post.content_ka.substring(0, 160).replace(/<[^>]*>/g, '');
  const canonicalUrl = `https://mypen.ge/blog/${post.slug}`;

  return {
    title: `${post.title_ka} | Mypen.ge`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title_ka,
      description,
      url: canonicalUrl,
      siteName: 'Mypen.ge',
      images: post.featured_image ? [{
        url: post.featured_image,
        width: 1200,
        height: 630,
        alt: post.title_ka,
      }] : undefined,
      publishedTime: new Date(post.published_at).toISOString(),
      modifiedTime: new Date(post.updated_at).toISOString(),
      authors: ['Mypen.ge'],
      locale: 'ka_GE',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title_ka,
      description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = Math.ceil(post.content_ka.split(' ').length / 200);

  // Breadcrumb schema data
  const breadcrumbs = [
    { name: 'მთავარი', url: 'https://mypen.ge' },
    { name: 'ბლოგი', url: 'https://mypen.ge/blog' },
    { name: post.title_ka, url: `https://mypen.ge/blog/${post.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={generateArticleSchema(post, post.schema_keywords)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="min-h-screen bg-background">
        <Header />
      <main className="container mx-auto px-4 py-16">
        {/* Optimal reading width: 680px (max-w-2xl) */}
        <article className="mx-auto max-w-2xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              ბლოგზე დაბრუნება
            </Button>
          </Link>

          <header className="mb-10">
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-primary leading-tight">
              {post.title_ka}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={new Date(post.published_at).toISOString()}>
                  {format(new Date(post.published_at), "d MMMM, yyyy", { locale: ka })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readingTime} წთ წასაკითხი</span>
              </div>
            </div>
          </header>

          <Separator className="mb-10 opacity-40" />

          {/* Article content with optimized dark mode typography */}
          <ArticleContent html={post.content_ka} />

          <Separator className="my-14 opacity-40" />

          <div className="flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ყველა პოსტი
              </Button>
            </Link>
          </div>
        </article>
        </main>
        <Footer />
      </div>
    </>
  );
}