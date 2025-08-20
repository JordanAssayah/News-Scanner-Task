import { useState, useEffect } from "react";
import "./App.css";

import httpClient, { ENDPOINTS } from "./services/http-client";

import { CategorySelect } from "./components/CategorySelect";
import { QueryInput } from "./components/QueryInput";
import { NewsDisplay } from "./components/NewsDisplay";
import { FetchNewsButton } from "./components/FetchNewsButton";
import { NewsArticle } from "./interfaces/news";

function App() {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await httpClient.get(ENDPOINTS.CATEGORIES);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get(ENDPOINTS.NEWS, {
        params: { query, category: selectedOption },
      });

      if (res.data && res.data.articles) {
        setNews(res.data.articles);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      alert("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAISummary = async (article: NewsArticle) => {
    // TODO: Implement AI summary functionality
    console.log("AI Summary requested for article:", article.title);
    alert(`AI Summary feature coming soon!\n\nArticle: ${article.title}`);
  };

  return (
    <div className="app">
      <header className="header">
        <img src="/logo.svg" alt="News Scanner Logo" className="logo" />
        <div className="header-title">News Scanner</div>
      </header>
      <div className="filters">
        <QueryInput value={query} onChange={setQuery} />

        <CategorySelect
          options={categories.map((category: string) => ({
            displayName: category,
            value: category,
          }))}
          selectedOption={selectedOption}
          onChange={setSelectedOption}
        />

        <FetchNewsButton onClick={fetchNews} />
      </div>
      <NewsDisplay
        news={news}
        loading={loading}
        onAISummary={handleAISummary}
      />
    </div>
  );
}

export default App;
