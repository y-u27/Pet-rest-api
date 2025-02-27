
//モジュールのインポート
const express = require("express");
//expressオブジェクトの生成
const app = express();
//3000番ポート
const port = 3000;

//JSOMデータを扱うためのミドルウェア
app.use(express.json());

//getでリクエスト時に処理するコールバック関数指定
app.get("/", function (req, res) {
  res.json({ msg: "Hello World" });
});

//サーバの設定
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
