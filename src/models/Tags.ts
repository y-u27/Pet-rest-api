import mongoose, { Schema } from "mongoose";

const tagsSchema = new Schema(
  {
    name: String,
  },
  { collection: "tags" }
);

export const Tags = mongoose.model("Tags", tagsSchema);
