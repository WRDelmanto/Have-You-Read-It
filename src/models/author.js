import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: ["Please check yout entry, no authorId specified"],
  },
  authorName: {
    type: String,
    required: ["Please check yout entry, no authorName specified"],
  },
  authorImage: {
    type: String,
    required: ["Please check yout entry, no authorImage specified"],
  },
});

export const Author = mongoose.model("Author", authorSchema);
