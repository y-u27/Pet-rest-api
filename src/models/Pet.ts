import mongoose, { Schema } from "mongoose";

const petSchema = new Schema({
  name: String,
  photoUrls: String,
  status: String,
  categoriesId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tagsId: { type: Schema.Types.ObjectId, required: true },
});

export const Pet = mongoose.model("Pet", petSchema);
