//モジュールのインポート
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//MongoDB接続情報（環境変数からURI取得）
const uri: string = process.env.MONGO_URI as string;
if (!uri) {
  console.error("MONGO_URIの環境変数が設定されていません");
  process.exit(1);
}

//MongoDB クライアント作成
const client = new MongoClient(uri);
let db: Db | null = null;

//DB接続情報（サーバー起動時に1回だけDB接続）
export async function connectDB(): Promise<Db> {
  if (!db) {
    try {
      await client.connect();
      db = client.db("pet-database");
      console.log("MongoDBに接続しました");
    } catch (error) {
      console.error("データベース接続エラー", error);
      process.exit(1);
    }
  }
  return db;
}

//DB インスタンスエクスポート
export { db, client };
