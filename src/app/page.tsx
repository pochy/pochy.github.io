/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/ui/navigation";
import { slicedAllPosts } from "@/utils/posts";

export default function Home() {
  const current_page = 1;
  const { pages, articles } = slicedAllPosts(current_page);

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
