import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: ["Please check yout entry, no bookId specified"],
  },
  authorId: {
    type: String,
    required: ["Please check yout entry, no authorId specified"],
  },
  authorName: {
    type: String,
    required: ["Please check yout entry, no authorName specified"],
  },
  title: {
    type: String,
    required: ["Please check yout entry, no title specified"],
  },
  cover: {
    type: String,
    required: ["Please check yout entry, no cover specified"],
  },
});

export const Book = mongoose.model("Book", bookSchema);
