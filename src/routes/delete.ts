import { Router, Request, Response } from "express";
import { connectDB } from "../config/db";
import { ObjectId } from "mongodb";

const router = Router();

// ~/api/petのdeleteデータ作成
router.delete(
  "/pet/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const db = await connectDB();
      const petId = req.params.id;

      const objectId = new ObjectId(petId);

      const result = await db.collection("pet").deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        res
          .status(404)
          .json({ error: "指定されたIDのペットが見つかりませんでした" });
        return;
      }

      res.status(200).json({ message: "ペットデータ削除成功", data: result });
    } catch (error) {
      console.error("削除エラー", (error as Error).message);
      res.status(500).json({ error: "ペットデータ削除失敗" });
    }
  }
);

// ~/api/categoriesのdeleteデータ作成
// ~/api/tagsのdeleteデータ作成

export default router;
