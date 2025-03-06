import { Router, Request, Response } from "express";
import { Pet } from "../../models/Pet";

const router = Router();

// GET
router.get("/pets", async (req: Request, res: Response) => {
  try {
    if(!req.query.status) {
      res.status(400).json({error:"ステータスが指定されていません"});
      return;
    }

    const status = (req.query.status as string).trim();
    const petStatus = await Pet.find({ status });

    if (petStatus.length === 0) {
      res
        .status(404)
        .json({ error: "指定されたステータスのペットが見つかりませんでした" });
      return;
    }

    res.status(200).json({
      message: "指定したステータスのペット情報の取得に成功",
      data: petStatus,
    });
  } catch (error) {
    console.error("ステータス取得エラー", (error as Error).message);
    res.status(500).json({ error: "ステータスデータ取得失敗" });
  }
});

export default router;
