import { Router, Request, Response } from "express";
import { Pet } from "../../models/Pet";
import { ObjectId } from "mongodb";
import { Categories } from "../../models/Categories";
import { Tags } from "../../models/Tags";
import mongoose from "mongoose";

const router = Router();

// GET pet
router.get("/pet", async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// GET categories
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// GET tags
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags = await Tags.find();
    res.json(tags);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// POST pet
router.post("/pet", async (req: Request, res: Response) => {
  try {
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

// POST categories
router.post("/categories", async (req: Request, res: Response) => {
  try {
    const newCategories = new Categories(req.body);
    const result = await newCategories.save();

    console.log("保存結果", result);

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

// POST tags
router.post("/tags", async (req: Request, res: Response) => {
  try {
    const newTags = new Tags(req.body);
    const result = await newTags.save();

    console.log("保存結果", result);

    res
      .status(201)
      .json({ message: "新しいペットが追加されました", data: result });
  } catch (error) {
    console.error("追加エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ追加失敗" });
  }
});

// PUT
router.put("/pet/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const petId = req.params.id;

    if (!ObjectId.isValid(petId)) {
      res.status(400).json({ error: "無効なID形式です" });
      return;
    }

    // ObjectIdに変換
    const objectId = new ObjectId(petId);

    // データを更新（`new: true` で更新後のデータを取得）
    const updatePet = await Pet.findByIdAndUpdate(objectId, req.body, {
      new: true,
    });

    if (!updatePet) {
      res
        .status(404)
        .json({ error: "指定されたIDのペットが見つかりませんでした" });
      return;
    }

    res.status(200).json({
      message: "登録したペットの情報を更新しました",
      data: updatePet,
    });
  } catch (error) {
    console.error("更新エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ更新失敗" });
  }
});

// findByStatus
router.get("/pet/findByStatus", async (req: Request, res: Response) => {
  try {
    if (!req.query.status) {
      res.status(400).json({ error: "ステータスが指定されていません" });
      return;
    }

    const status = (req.query.status as string).trim().toLowerCase();
    const petStatus = await Pet.find({
      status: new RegExp("^" + status + "$", "i"),
    });

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

// findByTags
router.get("/pet/findByTags", async (req: Request, res: Response) => {
  try {
    if (!req.query.tagsId) {
      res.status(400).json({ error: "タグIDが指定されていません" });
      return;
    }
    
    const tagsId = req.query.tagsId as string;

    if (!mongoose.Types.ObjectId.isValid(tagsId)) {
      res.status(400).json({error:"無効なID形式です"});
      return;
    }

    const objectId = new mongoose.Types.ObjectId(tagsId);

    const pets = await Pet.find({ tagsId: objectId });

    if (pets.length === 0) {
      res.status(404).json({ error: "指定されたタグのペットが見つかりません" });
      return;
    }

    res
      .status(200)
      .json({ message: "指定したタグのペット情報の取得に成功", data: pets });
  } catch (error) {
    console.error("取得エラー", (error as Error).message);
    res.status(500).json({ error: "タグデータ取得に失敗" });
  }
});

// GET pet/{petid}
router.get("/pet/:id", async (req: Request, res: Response) => {
  try {
    const petsId = req.params.id;

    if (!ObjectId.isValid(petsId)) {
      res.status(400).json({ error: "無効なID形式です" });
      return;
    }

    const objectId = new ObjectId(petsId);

    const pet = await Pet.findById(objectId);

    if (!pet) {
      res.status(404).json({ error: "指定されたIDのペットが見つかりません" });
      return;
    }

    res.status(200).json(pet);
  } catch (error) {
    console.error("取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// DELETE pet/{petid}
router.delete(
  "/pet/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const petId = req.params.id;

      const objectId = new ObjectId(petId);

      const result = await Pet.deleteOne({ _id: objectId });

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

export default router;
