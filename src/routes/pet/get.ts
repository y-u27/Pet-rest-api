import { Router, Request, Response } from "express";
import { connectDB } from "../../config/db";
import { Pet } from "../../models/Pet";
import { Categories } from "../../models/Categories";
import { Tags } from "../../models/Tags";

const router = Router();

// ~/api/petのgetデータ取得
router.get("/pet", async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// ~/api/petのcategoriesデータ取得
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// ~/api/petのtagsデータ取得
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags = await Tags.find();
    res.json(tags);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

export default router;
