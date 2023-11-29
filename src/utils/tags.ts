import { getAllPosts, slicedPosts } from "./posts";

export function getTags() {
  const posts = getAllPosts();
  const tags = posts.map((post) => post.tags).flatMap((cate) => cate);
  const tag = tags.map((tag) => ({
    tag: tag,
  }));
  return Array.from(new Set(tag));
}

export function slicedArticlesByTag(tag: string, current_page = 1) {
  const posts = getPostByTags(tag);
  return slicedPosts(posts, current_page);
}

export function getPostByTags(tag: string) {
  const articles = getAllPosts();
  articles.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  const tagArticles = articles.filter((article) => article.tags?.includes(tag));
  return tagArticles;
}
