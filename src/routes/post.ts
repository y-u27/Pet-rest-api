import { Router, Request, Response } from "express";
import { connectDB } from "../config/db";

const router = Router();

// ~/api/petのpostデータ作成
router.post("/pet", async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const newPet = req.body;
    const result = await db.collection("pet").insertOne(newPet);

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

export default router;
