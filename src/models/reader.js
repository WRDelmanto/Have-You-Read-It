import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["Please check your entry, no name specified"],
  },
  picture: { type: String },
  bookmarkedBooks: [{ type: String }],
  favoriteBooks: [{ type: String }],
  completedBooks: [{ type: String }],
  following: {
    books: [{ type: String }],
    authors: [{ type: String }],
    readers: [{ type: String }],
  },
});

export const Reader = mongoose.model("Reader", readerSchema);
