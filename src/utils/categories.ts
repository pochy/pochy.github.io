import { getAllPosts, slicedPosts } from "./posts";

export function getCategories() {
  const posts = getAllPosts();
  const categories = posts
    .map((post) => post.categories)
    .flatMap((cate) => cate);
  const category = categories.map((category) => ({
    category: category,
  }));
  return Array.from(new Set(category));
}

export function getPostByCategories(category: string) {
  const posts = getAllPosts();
  posts.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  const categoryPosts = posts.filter((post) =>
    post.categories?.includes(category)
  );
  return categoryPosts;
}

export function slicedPostsByCategories(category: string, current_page = 1) {
  const posts = getPostByCategories(category);
  return slicedPosts(posts, current_page);
}
