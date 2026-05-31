import type { Metadata } from "next";
import { getFiles, getFileBySlug } from "@/lib/mdx";
import BlogPostClient from "./BlogPostClient";

const siteUrl = "https://hrushabhkale.com";

type PostFrontMatter = {
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  readingTime?: { text: string };
};

export async function generateStaticParams() {
  const posts = await getFiles("blog");
  return posts.map((p) => ({
    slug: p.replace(/\.mdx/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFileBySlug("blog", slug);
  const { title, summary, image } =
    post.frontMatter as unknown as PostFrontMatter;

  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : undefined;

  return {
    title,
    description: summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description: summary,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: (post.frontMatter as unknown as PostFrontMatter)
        .publishedAt,
      authors: ["Hrushabh Kale"],
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getFileBySlug("blog", slug);
  const frontMatter = post.frontMatter as unknown as PostFrontMatter;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontMatter.title,
    description: frontMatter.summary,
    datePublished: frontMatter.publishedAt,
    dateModified: frontMatter.publishedAt,
    url: `${siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Hrushabh Kale",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Hrushabh Kale",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontMatter.title,
        item: `${siteUrl}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient
        mdxSource={post.mdxSource}
        frontMatter={frontMatter}
      />
    </>
  );
}
