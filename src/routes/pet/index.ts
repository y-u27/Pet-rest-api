import { Router, Request, Response } from "express";
import { Pet } from "../../models/Pet";
import { ObjectId } from "mongodb";

const router = Router();

// GET
router.get("/pet", async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error("ペットデータ取得エラー", (error as Error).message);
    res.status(500).json({ error: "ペットデータ取得に失敗" });
  }
});

// POST
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

// POST pet/{petid}
// router.post("/pet/:id",async(req:Request,res:Response) => {

// })

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
