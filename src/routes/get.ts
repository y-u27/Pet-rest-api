import { Router, Request, Response } from "express";
import { connectDB } from "../config/db";

const router = Router();

// ~/api/petのgetデータ取得
router.get("/pet", async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const pets = await db.collection("pet").find().toArray();
    res.json(pets);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// ~/api/petのcategoriesデータ取得
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const categories = await db.collection("categories").find().toArray();
    res.json(categories);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// ~/api/petのtagsデータ取得
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const tags = await db.collection("tags").find().toArray();
    res.json(tags);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

export default router;
