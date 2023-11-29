import { slicedAllPosts } from "@/utils/posts";
import React from "react";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/ui/navigation";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { pages } = slicedAllPosts(1);
  const slugs = pages.map((page) => ({
    page: page.toString(),
  }));
  return slugs;
}

export default function Articles({ params }: { params: { page: string } }) {
  const current_page = Number(params.page || "1");

  const { pages, articles } = slicedAllPosts(current_page);
  if (!articles) {
    notFound();
  }
  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <ArticleList articles={articles} />
      <Pagination
        path="articles/page"
        pages={pages}
        current_page={current_page}
      />
    </main>
  );
}
