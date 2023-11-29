import { getTags, slicedArticlesByTag } from "@/utils/tags";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/ui/navigation";

export async function generateStaticParams() {
  const tags = Array.from(new Set(getTags().map((c) => c.tag)));

  const params: { tag: string; page: string }[] = [];
  tags.forEach((tag) =>
    slicedArticlesByTag(tag, 1).pages.forEach((page) =>
      params.push({
        tag,
        page: page.toString(),
      })
    )
  );
  return params;
}

export default async function TagsPagesList({
  params,
}: {
  params: { tag: string; page: string };
}) {
  const current_page = Number(params.page || "1");
  const { pages, articles } = slicedArticlesByTag(params.tag, current_page);

  return (
    <main className="container mt-10 pb-10 mx-auto px-4 max-w-4xl">
      <div className="mx-auto mb-10 max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          # {params.tag} 一覧
        </h1>
      </div>
      <ArticleList articles={articles} />
      <Pagination
        path={`tags/${params.tag}`}
        pages={pages}
        current_page={current_page}
      />
    </main>
  );
}
