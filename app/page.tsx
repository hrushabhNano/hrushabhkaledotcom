import type { Metadata } from "next";
import Container from "@/components/container";
import { Header } from "@/components/header";
import { Work } from "@/components/work";
import Divider from "@/components/divider";
import { Companies } from "@/components/companies";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { BlogList } from "@/components/blog/blog-list";
import { Certifications } from "@/components/certifications";

type HomeBlogPost = {
  slug: string;
  publishedAt: string;
  title: string;
};

export const metadata: Metadata = {
  title: "Hrushabh Kale",
  description:
    "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. Building AI-first systems for enterprise. Writing about full-stack development and technical leadership in India.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const posts = ((await getAllFilesFrontMatter("blog")) as HomeBlogPost[]).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <Container>
      <div className="pt-4">
        <Header />
      </div>
      <Divider />
      <Work />
      <Divider />
      <Companies />
      <Divider />
      <Certifications />
      <Divider />
      <BlogList posts={posts.slice(0, 3)} />
      <Divider />
    </Container>
  );
}
