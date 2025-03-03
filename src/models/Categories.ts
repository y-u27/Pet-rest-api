import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema({
  name: String,
});

export const Categories = mongoose.model("Categories", categoriesSchema);
