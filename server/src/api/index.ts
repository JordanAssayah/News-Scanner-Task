import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Darrow's News Scanner API");
});

router.get("/categories", async (req: Request, res: Response) => {
  // TODO: Implement the categories API
});

router.get("/news", async (req: Request, res: Response) => {
  // TODO: Implement the news API
});

export default router;
