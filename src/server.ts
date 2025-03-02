import express from "express";
import { connectDB } from "./config/db";
// import cors from "cors";
import getRoutes from "./routes/get";
// import postRoutes from "./routes/post";

const app = express();
const port = 3000;

app.use(express.json());

connectDB()
  .then(() => {
    console.log("データベース接続完了");

    //ルート設定
    app.use("/api",getRoutes);
    // app.use("/api",postRoutes);

    //サーバ起動
    app.listen(port, () => {
      console.log(
        `Server is runnning on http://localhost:${port}/pet-database`
      );
    });
  })
  .catch((error) => {
    console.error("サーバー起動時のエラー:", error);
  });
