export type Post = {
  title: string;
  // content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  coverImage?: string;
  tags: string[];
  categories: string[];
  author: {
    name: string;
    picture: string;
  };
  ogImage: {
    url: string;
  };
};

export type Article = Post & {
  id: number;
  content: string;
};

export type Author = {
  name: string;
  avatarUrl: string;
};
