export type Author = {
  avatar: string;
  name: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "blockquote"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption: string };

export type Article = {
  author: Author;
  category: string;
  content: ContentBlock[];
  excerpt: string;
  featured: boolean;
  id: string;
  image: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
};

export type BreakingNews = {
  articleId: string;
  category: string;
  headline: string;
  id: string;
  publishedAt: string;
  summary: string;
  urgent: boolean;
};

export type Subscription = {
  createdAt: string;
  status: "active" | "inactive";
  subscribedAt: string;
  token: string;
  updatedAt: string;
};

export type Category = {
  articleCount: number;
  name: string;
  slug: string;
};

export type PaginationMeta = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type ArticleListResponse = {
  data: Article[];
  meta: PaginationMeta;
  success: true;
};

export type ArticleResponse = {
  data: Article;
  success: true;
};

export type CategoryListResponse = {
  data: Category[];
  success: true;
};

export type BreakingNewsResponse = {
  data: BreakingNews;
  success: true;
};

export type SubscriptionResponse = {
  data: Subscription;
  success: true;
};

export type PublicationConfigResponse = {
  data: {
    publicationName: string;
    language: string;
    features: {
      newsletter: boolean;
      bookmarks: boolean;
      comments: boolean;
      darkMode: boolean;
      searchSuggestions: boolean;
    };
    socialLinks: {
      twitter: string;
      github: string;
      discord: string;
    };
    seo: {
      defaultTitle: string;
      titleTemplate: string;
      defaultDescription: string;
    };
  };
  success: true;
};

export type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
  success: false;
};
