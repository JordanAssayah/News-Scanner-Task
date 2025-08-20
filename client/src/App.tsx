import { useState, useEffect } from "react";
import "./App.css";

import httpClient, { ENDPOINTS } from "./services/http-client";

import { CategorySelect } from "./components/CategorySelect";
import { QueryInput } from "./components/QueryInput";
import { NewsDisplay } from "./components/NewsDisplay";
import { FetchNewsButton } from "./components/FetchNewsButton";

function App() {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

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

        <FetchNewsButton
        // onClick={}
        />
      </div>
      <NewsDisplay />
    </div>
  );
}

export default App;
