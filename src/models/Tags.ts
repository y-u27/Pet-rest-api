import mongoose, { Schema } from "mongoose";

const tagsSchema = new Schema({
  name: String,
});

export const Tags = mongoose.model("Tags", tagsSchema);
