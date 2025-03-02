//モジュールのインポート
import express, { NextFunction, Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//expressオブジェクトの生成
const app = express();
//3000番ポート
const port = 3000;

//MongoDB接続情報
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URIの環境変数が設定されていません");
  process.exit(1);
}

const client = new MongoClient(uri);
let db: Db | null = null;

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
app.use(express.urlencoded({ extended: true }));

//ルートエンドポイント
app.post("/", (req: Request, res: Response) => {
  res.send("API is running! You can access pet data at /pet-database/pet");
});

//postデータ作成
// app.post("/pet-dabase",(req:Request,res:Response,next:NextFunction)) => {
//   petModel.create
// };

//サーバの設定
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/pet-database`);
});
