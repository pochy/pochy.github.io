/* eslint-disable @next/next/no-img-element */
import Markdown from "@/components/Markdown";
import { Article } from "@/types";
import { Folder } from "lucide-react";
import NextLink from "next/link";
// import Image from "next/image";
import { basePath } from "../../../../next.config";
const BASE_PATH = basePath ? basePath : "";

export default function ArticleContent({
  article,
  slug,
}: {
  article: Article;
  slug: string;
}) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const tags = article.tags || [];
  const categories = article.categories || [];
  return (
    <div className="container mt-10 pb-10 mx-auto px-0 sm:px-4 max-w-4xl">
      <article className="mx-auto p-4 bg-white rounded-lg">
        {/* <div>
        <h1>{article.title}</h1>
      </div> */}
        <div className="flex items-center gap-x-4 mb-2">
          <time dateTime={formattedDate} className="text-gray-500">
            {formattedDate}
          </time>
          <div>
            {categories.map((category) => (
              <NextLink key={category} href={`/categories/${category}`}>
                <span
                  key={category}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  <Folder className="inline h-4 w-4" /> {category}
                </span>
              </NextLink>
            ))}
          </div>
        </div>
        <div className="mb-4">
          {tags.map((tag) => (
            <NextLink key={tag} href={`/tags/${tag}`}>
              <span
                key={tag}
                className="relative z-10 text-xs rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                # {tag}
              </span>
            </NextLink>
          ))}
        </div>
        <div className="my-10">
          <img
            className="rounded-lg"
            src={`${BASE_PATH}${article.coverImage}`}
            alt={article.title}
            style={{ width: "fit-content" }}
          />
        </div>
        <Markdown slug={slug}>{article.content}</Markdown>
      </article>
    </div>
  );
}
