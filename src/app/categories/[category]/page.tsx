import { getCategories, slicedPostsByCategories } from "@/utils/categories";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/ui/navigation";

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(getCategories().map((c) => c.category))
  );
  return categories.map((category) => ({
    category,
  }));
}

export default async function ArticleDetail({
  params,
}: {
  params: { category: string };
}) {
  const current_page = 1;
  const { pages, articles } = slicedPostsByCategories(
    params.category,
    current_page
  );

  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <div className="mx-auto mb-10 max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {params.category} 一覧
        </h1>
      </div>
      <ArticleList articles={articles} />
      <Pagination
        path={`categories/${params.category}`}
        pages={pages}
        current_page={current_page}
      />
    </main>
  );
}
