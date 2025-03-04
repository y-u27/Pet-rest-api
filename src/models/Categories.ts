import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: String,
  },
  { collection: "categories" }
);

export const Categories = mongoose.model("Categories", categoriesSchema);
