import { Router, Request, Response } from "express";
import { getNews } from "../services/newsapi.service";
import categories from "../db/categories.json";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Darrow's News Scanner API");
});

router.get("/categories", async (req: Request, res: Response) => {
  try {
    res.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/news", async (req: Request, res: Response) => {
  try {
    const { query, category } = req.query;

    // Validate required parameters
    if (!query || !category) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Both 'query' and 'category' parameters are required",
      });
    }

    const results = await getNews(query as string, category as string);

    res.json(results);
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({
      error: "Failed to search news",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
