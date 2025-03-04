import { Router, Request, Response } from "express";
import { Pet } from "../../models/Pet";
import { Categories } from "../../models/Categories";
import { Tags } from "../../models/Tags";

const router = Router();

// ~/api/petのpostデータ作成
router.post("/pet", async (req: Request, res: Response) => {
  try {
    // const db = await connectDB();
    const newPet = new Pet(req.body);
    const result = await newPet.save();

    console.log("保存結果", result);

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

// ~/api/categoriesのpostデータ作成
router.post("/categories", async (req: Request, res: Response) => {
  try {
    const newCategories = new Categories(req.body);
    const result = await newCategories.save();

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

// ~/api/tagsのpostデータ作成
router.post("/tags", async (req: Request, res: Response) => {
  try {
    const newTags = new Tags(req.body);
    const result = await newTags.save();

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

export default router;
