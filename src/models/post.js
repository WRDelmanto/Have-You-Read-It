import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: ["Please check yout entry, no bookId specified"],
  },
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader",
    required: ["Please check yout entry, no readerId specified"],
  },
  title: {
    type: String,
    required: ["Please check yout entry, no title specified"],
  },
  description: {
    type: String,
    required: ["Please check yout entry, no bookId specified"],
  },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [
    {
      readerId: { type: String },
      text: { type: String },
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);
