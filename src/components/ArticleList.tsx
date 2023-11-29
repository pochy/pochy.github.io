import { Article } from "@/types";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16">
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
