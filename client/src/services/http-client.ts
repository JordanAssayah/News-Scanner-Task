import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

export const ENDPOINTS = {
  CATEGORIES: "/categories",
  NEWS: "/news",
  AI_SUMMARY: "/ai-summary",
};

export default instance;
