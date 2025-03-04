//モジュールのインポート
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//MongoDB接続情報（環境変数からURI取得）
const uri: string = process.env.MONGO_URI as string;
if (!uri) {
  console.error("MONGO_URIの環境変数が設定されていません");
  process.exit(1);
}

//DB接続情報（サーバー起動時に1回だけDB接続）
export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName: "pet-database",
    });
    console.log("MongoDBに接続しました");
  } catch (error) {
    console.error("データベース接続エラー", (error as Error).message);
    process.exit(1);
  }
}
