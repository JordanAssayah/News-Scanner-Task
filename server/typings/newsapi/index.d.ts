declare module "newsapi" {
  type NewsApiStatus = "ok" | "error";

  export interface NewsSource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
  }

  export interface NewsArticle {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }

  export interface TopHeadlinesOptions {
    sources?: string;
    q?: string;
    category?: string;
    language?:
      | "ar"
      | "de"
      | "en"
      | "es"
      | "fr"
      | "he"
      | "it"
      | "nl"
      | "no"
      | "pt"
      | "ru"
      | "se"
      | "ud"
      | "zh";
    country?: string;
    pageSize?: number;
    page?: number;
  }

  export interface EverythingOptions {
    q?: string;
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?:
      | "ar"
      | "de"
      | "en"
      | "es"
      | "fr"
      | "he"
      | "it"
      | "nl"
      | "no"
      | "pt"
      | "ru"
      | "se"
      | "ud"
      | "zh";
    sortBy?: "relevancy" | "popularity" | "publishedAt";
    pageSize?: number;
    page?: number;
  }

  export interface SourcesOptions {
    category?: string;
    language?: string;
    country?: string;
  }

  export interface ArticlesResponse {
    status: NewsApiStatus;
    totalResults: number;
    articles: NewsArticle[];
    code?: string;
    message?: string;
  }

  export interface SourcesResponse {
    status: NewsApiStatus;
    sources: NewsSource[];
    code?: string;
    message?: string;
  }

  export interface NewsAPIv2 {
    topHeadlines(options: TopHeadlinesOptions): Promise<ArticlesResponse>;
    everything(options: EverythingOptions): Promise<ArticlesResponse>;
    sources(options?: SourcesOptions): Promise<SourcesResponse>;
  }

  class NewsAPI {
    constructor(apiKey: string);
    v2: NewsAPIv2;
  }

  export default NewsAPI;
}
