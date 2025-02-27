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

//JSOMデータを扱うためのミドルウェア
app.use(express.json());

//getでリクエスト時に処理するコールバック関数指定
app.get("/pet-database/pet", async function (req, res) {
  try {
    await client.connect();
    const db = client.db("pet-database");
    const collection = db.collection("pet");

    const pets = await collection.find().toArray();
    res.json(pets);
  } catch (error) {
    console.error("データ取得エラー", error);
    res.status(500).json({ error: "データの取得に失敗" });
  } finally {
    await client.close();
  }
});

//サーバの設定
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
