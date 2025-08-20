import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Darrow's News Scanner API");
});

router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categoriesPath = path.join(__dirname, "../db/categories.json");
    const categoriesData = fs.readFileSync(categoriesPath, "utf8");
    const categories = JSON.parse(categoriesData);
    res.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/news", async (req: Request, res: Response) => {
  // TODO: Implement the news API
});

export default router;
