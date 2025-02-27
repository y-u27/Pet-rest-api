import { MongoClient } from "mongodb";
import env from "dotenv";
env.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function getCollection() {
  try {
    await client.connect();
    const db = client.db("pet-database");
    return db.collection("pet");
  } catch {
    await client.close();
  }
}
getAllPets();
async function getAllPets() {
  const col = await getCollection();
  const cursor = col.find();
  const result = await cursor.toArray();
  console.log(result);

  client.close();
}
