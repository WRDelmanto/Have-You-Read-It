import express from "express";
import { Reader } from "../models/reader.js";
import { Post } from "../models/post.js";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
const router = express.Router();

// Sign up
router.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received signup request:", req.body);

  try {
    const existingUser = await Reader.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newReader = new Reader({ name, email, password });
    await newReader.save();
    res.status(201).json({ accountReader: newReader });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Sign in
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log("Received signin request:", req.body);

  try {
    const reader = await Reader.findOne({ email });
    if (!reader || reader.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ accountReader: reader });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Create Post
router.post("/api/createPost", async (req, res) => {
  const { readerId, authorId, bookId, title, description } = req.body;

  console.log("Received createPost request:", req.body);

  try {
    const newPost = new Post({
      readerId,
      authorId,
      bookId,
      title,
      description,
    });

    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

// Get Posts by Reader ID
router.get("/api/postsByReaderId/:accountReaderId", async (req, res) => {
  const { accountReaderId } = req.params;

  console.log("Received getPosts request for readerId:", accountReaderId);

  try {
    const reader = await Reader.findById(accountReaderId);
    if (!reader) {
      return res.status(404).json({ error: "Reader not found" });
    }

    const rawPosts = await Post.find({
      $or: [
        { bookId: { $in: reader.following.books } },
        { authorId: { $in: reader.following.authors } },
        { readerId: { $in: reader.following.readers } },
        { "comments.reader": accountReaderId },
        { "comments.reader": { $in: reader.following.readers } },
        { readerId: accountReaderId },
      ],
    }).sort({ timestamp: -1 });

    const enrichedPosts = await Promise.all(
      rawPosts.map(async (postDoc) => {
        const post = postDoc.toObject();
        const book = await OpenLibraryAPI.getBookById(post.bookId);
        const postReader = await Reader.findById(post.readerId).lean();
        return { ...post, book, reader: postReader };
      })
    );

    res.status(200).json({ posts: enrichedPosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get Posts by Book ID
router.get("/api/postsByBookId/:bookId", async (req, res) => {
  const { bookId } = req.params;

  console.log("Received getPosts request for bookId:", bookId);

  try {
    const posts = await Post.find({ bookId }).sort({ timestamp: -1 });

    const enrichedPosts = await Promise.all(
      posts.map(async (postDoc) => {
        const post = postDoc.toObject();
        const book = await OpenLibraryAPI.getBookById(post.bookId);
        const postReader = await Reader.findById(post.readerId).lean();
        return { ...post, book, reader: postReader };
      })
    );

    res.status(200).json({ posts: enrichedPosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get Posts from Reader ID
router.get("/api/postsFromReaderId/:accountReaderId", async (req, res) => {
  const { accountReaderId } = req.params;

  console.log("Received getPosts request for readerId:", accountReaderId);

  try {
    const posts = await Post.find({ readerId: accountReaderId }).sort({
      timestamp: -1,
    });

    const enrichedPosts = await Promise.all(
      posts.map(async (postDoc) => {
        const post = postDoc.toObject();
        const book = await OpenLibraryAPI.getBookById(post.bookId);
        const postReader = await Reader.findById(post.readerId).lean();
        return { ...post, book, reader: postReader };
      })
    );

    res.status(200).json({ posts: enrichedPosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get Posts from Author ID
router.get("/api/postsByAuthorId/:authorId", async (req, res) => {
  const { authorId } = req.params;

  console.log("Received getPosts request for authorId:", authorId);

  try {
    const posts = await Post.find({ authorId: authorId }).sort({
      timestamp: -1,
    });

    const enrichedPosts = await Promise.all(
      posts.map(async (postDoc) => {
        const post = postDoc.toObject();
        const book = await OpenLibraryAPI.getBookById(post.bookId);
        const postReader = await Reader.findById(post.readerId).lean();
        return { ...post, book, reader: postReader };
      })
    );

    res.status(200).json({ posts: enrichedPosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get Reader by ID
router.get("/api/reader/:readerId", async (req, res) => {
  const { readerId } = req.params;

  console.log("Received getReader request for readerId:", readerId);

  try {
    const reader = await Reader.findById(readerId).lean();
    if (!reader) {
      return res.status(404).json({ error: "Reader not found" });
    }

    res.status(200).json({ reader });
  } catch (error) {
    console.error("Get reader error:", error);
    res.status(500).json({ error: "Error fetching reader" });
  }
});

// Get Reader by Name
router.get("/api/readerName/:readerName", async (req, res) => {
  const { readerName } = req.params;

  console.log("Received getReader request for readerName:", readerName);

  try {
    const reader = await Reader.findOne({ name: readerName }).lean();
    if (!reader) {
      return res.status(404).json({ error: "Reader not found" });
    }

    res.status(200).json({ reader });
  } catch (error) {
    console.error("Get reader error:", error);
    res.status(500).json({ error: "Error fetching reader" });
  }
});

// Update Reader
router.put("/api/updateReader/:readerId", async (req, res) => {
  const { readerId } = req.params;
  const {
    name,
    email,
    password,
    picture,
    bookmarkedBooks,
    favoriteBooks,
    completedBooks,
    following,
  } = req.body;
  1;

  console.log("Received updateReader request:", req.body);

  try {
    const updateData = {
      name,
      email,
      password,
      picture,
      bookmarkedBooks,
      favoriteBooks,
      completedBooks,
      following,
    };

    const updatedReader = await Reader.findByIdAndUpdate(readerId, updateData, {
      new: true,
    });

    if (!updatedReader) {
      return res.status(404).json({ error: "Reader not found" });
    }

    res.status(200).json({ reader: updatedReader });
  } catch (error) {
    console.error("Update reader error:", error);
    res.status(500).json({ error: "Error updating reader" });
  }
});

export default router;
