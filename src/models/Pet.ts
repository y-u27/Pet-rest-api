import mongoose, { Schema } from "mongoose";

const petSchema = new Schema(
  {
    name: String,
    photoUrls: String,
    status: String,
    categoriesId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    tagsId: { type: Schema.Types.ObjectId, default: null },
  },
  { collection: "pet" }
);

export const Pet = mongoose.model("Pet", petSchema);
