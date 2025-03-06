import { Router, Request, Response } from "express";
import { Pet } from "../../models/Pet";

const router = Router();

// GET
router.get("/pets", async (req: Request, res: Response) => {
  try {
    if (!req.query.status) {
      res.status(400).json({ error: "タグが指定されていません" });
      return;
    }

    const tags = (req.query.status as string).trim();
    const petTags = await Pet.find({ tags });

    if (petTags.length === 0) {
      res
        .status(404)
        .json({ error: "指定されたタグのペットが見つかりませんでした" });
      return;
    }

    res.status(200).json({
      message: "指定したタグのペット情報の取得に成功",
      data: petTags,
    });
  } catch (error) {
    console.error("タグ取得エラー", (error as Error).message);
    res.status(500).json({ error: "タグデータ取得失敗" });
  }
});

export default router;
