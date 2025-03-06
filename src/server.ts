import express from "express";
import { connectDB } from "./config/db";
import apiRoutes from "./routes/pet/index";
import apiStatus from "./routes/pet/findByStatus";
// import apiTags from "./routes/pet/findByTags";

const app = express();
const port = 3000;

app.use(express.json());

connectDB()
  .then(() => {
    console.log("データベース接続完了");

    //ルート設定
    app.use("/api", apiRoutes);
    app.use("/api", apiStatus);
    // app.use("/api", apiTags);

    //サーバ起動
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api`);
    });
  })
  .catch((error) => {
    console.error("サーバー起動時のエラー:", error);
  });
