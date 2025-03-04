import express from "express";
import { connectDB } from "./config/db";
import getRoutes from "./routes/pet/get";
import postRoutes from "./routes/pet/post";
import deleteRoutes from "./routes/pet/delete";
// import putRoutes from "./routes/put";

const app = express();
const port = 3000;

app.use(express.json());

connectDB()
  .then(() => {
    console.log("データベース接続完了");

    //ルート設定
    app.use("/api", getRoutes);
    app.use("/api", postRoutes);
    app.use("/api", deleteRoutes);
    // app.use("/api", putRoutes);

    //サーバ起動
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api`);
    });
  })
  .catch((error) => {
    console.error("サーバー起動時のエラー:", error);
  });
