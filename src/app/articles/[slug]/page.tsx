import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent";
import { getAllPosts, getPostById } from "@/utils/posts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getPostById(
    typeof params.slug === "string" ? params.slug : ""
  );
  return {
    title: article?.title,
    description: article?.content,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const slugs = posts.map((post) => ({
    slug: post.slug,
  }));
  return slugs;
}

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  const article = getPostById(
    typeof params.slug === "string" ? params.slug : ""
  );
  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} slug={params.slug} />;
}
