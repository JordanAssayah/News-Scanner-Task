import NewsAPI from "newsapi";
import { INewsResponse, ISourcesResponse } from "../interfaces/newsapiClient";

// NewsAPI Service Class
export class NewsAPIService {
  private newsapi: any;

  constructor() {
    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) {
      throw new Error("NEWSAPI_KEY environment variable is required");
    }
    this.newsapi = new NewsAPI(apiKey);
  }

  /**
   * Search everything
   * @param options - Options for the everything request
   */
  async searchEverything(options: {
    q?: string;
    sources?: string;
    domains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: "relevancy" | "popularity" | "publishedAt";
    pageSize?: number;
    page?: number;
  }): Promise<INewsResponse> {
    try {
      const response = await this.newsapi.v2.everything({
        q: options.q,
        sources: options.sources,
        domains: options.domains,
        from: options.from,
        to: options.to,
        language: options.language || "en",
        sortBy: options.sortBy || "publishedAt",
        pageSize: options.pageSize || 5,
        page: options.page || 1,
      });
      return response;
    } catch (error) {
      console.error("Error searching everything:", error);
      throw new Error("Failed to search news");
    }
  }

  async getSources(options: {
    category?: string;
    language?: string;
    country?: string;
  }): Promise<ISourcesResponse> {
    const response = await this.newsapi.v2.sources({
      category: options.category,
      language: options.language,
      country: options.country,
    });
    return response;
  }
}

let newsAPIServiceInstance: NewsAPIService | null = null;

export function getNewsAPIService(): NewsAPIService {
  if (!newsAPIServiceInstance) {
    newsAPIServiceInstance = new NewsAPIService();
  }
  return newsAPIServiceInstance;
}

export async function getNews(
  query: string,
  category: string
): Promise<INewsResponse> {
  // Validate required parameters
  if (!query || !category) {
    throw new Error("Both 'query' and 'category' parameters are required");
  }

  const newsService = getNewsAPIService();

  const categoryToUse = category.toLocaleLowerCase();

  // Get sources filtered by category, language (English), and country (US)
  const sourcesResponse = await newsService.getSources({
    category: categoryToUse,
    language: process.env.NEWSAPI_LANGUAGE_SEARCH || "en",
    country: process.env.NEWSAPI_COUNTRY_SEARCH || "us",
  });

  // Filter to use only the first 5 sources and extract their IDs
  const sourceIds = sourcesResponse.sources
    .slice(0, 5)
    .map((source) => source.id)
    .join(",");

  // Fetch news from these 5 sources using their IDs
  return await newsService.searchEverything({
    q: query,
    pageSize: parseInt(process.env.ARTICLE_PER_PAGE || "6"), // 6 articles per page
    sources: sourceIds,
    sortBy: "publishedAt",
    language: process.env.NEWSAPI_LANGUAGE_SEARCH || "en",
  });
}
