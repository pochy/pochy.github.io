import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "_posts");

export const PAGE_SIZE = 2;
export const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export function getPosts() {
  return fs.readdirSync(postsDirectory);
}

export function getPostById(id: string) {
  const realId = id.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, realId, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const article: Article = {
    id: Number(id),
    content,
    ...(data as Post),
  };
  return article;
}

export function getAllPosts() {
  const fileNames = getPosts();
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName, "index.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const article: Article = {
      id: Number(id),
      content,
      ...(data as Post),
    };
    return article;
  });
  return allPostsData;
}

export function slicedAllPosts(current_page = 1) {
  const posts = getAllPosts();
  posts.sort((a: any, b: any) => {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });
  return slicedPosts(posts, current_page);
}

export function slicedPosts(posts: Article[], current_page: number) {
  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  const articles = posts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return {
    pages,
    articles,
  };
}
