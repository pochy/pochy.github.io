import fs from "fs";

import { Feed } from "feed";
import { slicedAllPosts } from "../src/utils/posts";

// variables
const HOST = "https://www.haxibami.net";

const SITEDATA = {
  blog: {
    title: "kinaco",
    description: "AAA",
  },
};

const feedGenerator = async () => {
  const author = {
    name: "haxibami",
    email: "contact@haxibami.net",
    link: HOST,
  };

  const date = new Date();
  const feed = new Feed({
    title: SITEDATA.blog.title,
    description: SITEDATA.blog.description,
    id: HOST,
    link: HOST,
    language: "ja",
    image: `${HOST}/kripcat.jpg`,
    favicon: `${HOST}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${HOST}/rss/feed.xml`,
      json: `${HOST}/rss/feed.json`,
      atom: `${HOST}/rss/atom.xml`,
    },
    author: author,
  });

  const blogs = await slicedAllPosts(1);

  blogs.articles.forEach((post) => {
    const url = `${HOST}/articles/${post.slug}`;
    feed.addItem({
      title: `${post.title}`,
      description: `${post.description}`,
      id: url,
      link: url,
      guid: url,
      date: new Date(post.createdAt),
      category: post.categories
        ? post.categories.map((category) => ({
            name: category,
          }))
        : [],
    });
  });

  fs.mkdirSync("public/rss", { recursive: true });
  await Promise.all([
    fs.promises.writeFile(
      "public/rss/feed.xml",
      feed.rss2().replace(/&/g, "&amp;")
    ),
    fs.promises.writeFile("public/rss/atom.xml", feed.atom1()),
    fs.promises.writeFile("public/rss/feed.json", feed.json1()),
  ]);
};

const GenFeed = () => {
  return new Promise<void>((resolve) => {
    feedGenerator();
    resolve();
  });
};

export default GenFeed;
