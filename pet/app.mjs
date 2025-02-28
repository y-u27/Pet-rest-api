//モジュールのインポート
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//expressオブジェクトの生成
const app = express();
//3000番ポート
const port = 3000;

//MongoDB接続情報
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URIgの環境変数が設定されていません");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

//サーバー起動時に1回だけDB接続
async function connectDB() {
  try {
    await client.connect();
    db = client.db("pet-database");
    console.log("MongoDBに接続しました");
  } catch (error) {
    console.error("データベース接続エラー", error);
    process.exit(1);
  }
}
connectDB();

//JSOMデータを扱うためのミドルウェア
app.use(express.json());

//ルートエンドポイント
app.get("/", (req, res) => {
  res.send("API is running! You can access pet data at /pet-database/pet");
});

//~/pet-database/petのデータ取得
app.get("/pet-database/pet", async function (req, res) {
  try {
    if (!db)
      return res.status(500).json({ error: "データベースに接続できません" });
    const pets = await db.collection("pet").find().toArray();
    res.json(pets);
  } catch (error) {
    console.error("ペットデータ取得エラー", error);
    res.status(500).json({ error: "ペットデータの取得に失敗" });
  }
});

//~/pet-database/categoriesのデータ取得
app.get("/pet-database/categories", async function (req, res) {
  try {
    if (!db)
      return res.status(500).json({ error: "データベースに接続できません" });
    const categories = await db.collection("categories").find().toArray();
    res.json(categories);
  } catch (error) {
    console.error("カテゴリデータ取得エラー", error);
    res.status(500).json({ error: "カテゴリデータの取得に失敗" });
  }
});

//~/pet-database/tagsのデータ取得
app.get("/pet-database/tags", async function (req, res) {
  try {
    if (!db)
      return res.status(500).json({ error: "データベースに接続できません" });
    const tags = await db.collection("tags").find().toArray();
    res.json(tags);
  } catch (error) {
    console.error("タグデータ取得エラー", error);
    res.status(500).json({ error: "タグデータの取得に失敗" });
  }
});

//全てのコレクションのデータを1つのエンドポイントで取得
app.get("/pet-database", async (req, res) => {
  try {
    if (!db)
      return res.status(500).json({ error: "データベースに接続できません" });

    const pets = await db.collection("pet").find().toArray();
    const categories = await db.collection("categories").find().toArray();
    const tags = await db.collection("tags").find().toArray();

    res.json({ pets, categories, tags });
  } catch (error) {
    console.error("データ取得エラー");
    res.status(500).json({ error: "データの取得に失敗" });
  }
});

//サーバの設定
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/pet-database`);
});
