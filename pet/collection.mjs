import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URIの環境変数が設定されていません");
  process.exit(1);
}

const client = new MongoClient(uri);

async function getCollection(collectionName) {
  try {
    await client.connect();
    const db = client.db("pet-database");
    return db.collection(collectionName);
  } catch (error) {
    console.error("データベース接続エラー");
    await client.close();
  }
}

async function getAllPets() {
  return await getAllData("pet");
}

async function getAllCategories() {
  return await getAllData("categories");
}

async function getAllTags() {
  return await getAllData("tags");
}

async function getAllData(collectionName) {
  try {
    const col = await getCollection(collectionName);
    if (!col) {
      console.error(`${collectionName}コレクションを取得できませんでした`);
      return;
    }

    const result = await col.find().toArray();
    console.log(`==== ${collectionName} コレクションのデータ ====\n`, result);
    return result;
  } catch (error) {
    console.error(`${collectionName} データ取得エラー`, error);
  } finally {
    await client.close();
  }
}

async function fetchData() {
  await getAllPets();
  await getAllCategories();
  await getAllTags();
}

fetchData();
