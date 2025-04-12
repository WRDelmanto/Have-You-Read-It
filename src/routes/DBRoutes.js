import express from "express";
import { Reader } from "../models/reader.js";
import { Post } from "../models/post.js";
import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
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

// Delete Post
router.delete("/api/deletePost/:postId", async (req, res) => {
  const { postId } = req.params;

  console.log("Received deletePost request for postId:", postId);

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Add Comment to Post
router.post("/api/addComment", async (req, res) => {
  const { postId, readerId, text } = req.body;

  console.log("Received addComment request:", req.body);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
      readerId: readerId,
      text: text,
    });
    await post.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Delete Comment
router.delete("/api/deleteComment", async (req, res) => {
  const { postId, commentId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
});

// Get Posts by Reader ID
router.get("/api/postsByReaderId/:accountReaderId", async (req, res) => {
  const { accountReaderId } = req.params;

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

        let book = await Book.findOne({ bookId: post.bookId }).lean();

        if (!book) {
          console.log(
            `bookId: ${post.bookId}  not found in DB, fetching from OpenLibraryAPI`
          );
          const fetchedBook = await OpenLibraryAPI.getBookById(post.bookId);

          const newBook = new Book(fetchedBook);
          const saved = await newBook.save();
          book = saved.toObject();
        }

        const postReader = await Reader.findById(post.readerId).lean();

        post.comments = await Promise.all(
          post.comments.map(async (comment) => {
            const commentReader = await Reader.findById(
              comment.readerId
            ).lean();
            return { ...comment, reader: commentReader };
          })
        );

        return { ...post, book, reader: postReader };
      })
    );

    res.status(200).json({ posts: enrichedPosts });
  } catch (error) {
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

        let book = await Book.findOne({ bookId: post.bookId }).lean();

        if (!book) {
          console.log(
            `bookId: ${post.bookId}  not found in DB, fetching from OpenLibraryAPI`
          );
          const fetchedBook = await OpenLibraryAPI.getBookById(post.bookId);

          const newBook = new Book(fetchedBook);
          const saved = await newBook.save();
          book = saved.toObject();
        }

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

        let book = await Book.findOne({ bookId: post.bookId }).lean();

        if (!book) {
          console.log(
            `bookId: ${post.bookId}  not found in DB, fetching from OpenLibraryAPI`
          );
          const fetchedBook = await OpenLibraryAPI.getBookById(post.bookId);

          const newBook = new Book(fetchedBook);
          const saved = await newBook.save();
          book = saved.toObject();
        }

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

        let book = await Book.findOne({ bookId: post.bookId }).lean();

        if (!book) {
          console.log(
            `bookId: ${post.bookId}  not found in DB, fetching from OpenLibraryAPI`
          );
          const fetchedBook = await OpenLibraryAPI.getBookById(post.bookId);

          const newBook = new Book(fetchedBook);
          const saved = await newBook.save();
          book = saved.toObject();
        }

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
    // check all using lower case and trim and if includes the name and not an exact match
    const regex = new RegExp(readerName, "i");
    const reader = await Reader.findOne({ name: regex }).lean();
    // const reader = await Reader.findOne({ name: readerName }).lean();
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

// Get Book by ID
router.get("/api/book/:bookId", async (req, res) => {
  const { bookId } = req.params;

  console.log("Received getBook request for bookId:", bookId);

  try {
    let book = await Book.findOne({ bookId }).lean();

    if (!book) {
      console.log(
        `bookId: ${bookId}  not found in DB, fetching from OpenLibraryAPI`
      );
      const fetchedBook = await OpenLibraryAPI.getBookById(bookId);

      const newBook = new Book(fetchedBook);
      const saved = await newBook.save();
      book = saved.toObject();
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error("Get book error:", error);
    res.status(500).json({ error: "Error fetching book" });
  }
});

// Get Author by ID
router.get("/api/author/:authorId", async (req, res) => {
  const { authorId } = req.params;

  console.log("Received getAuthor request for authorId:", authorId);

  try {
    let author = await Author.findOne({ authorId: authorId }).lean();

    if (!author) {
      console.log(
        `authorId: ${authorId}  not found in DB, fetching from OpenLibraryAPI`
      );
      const fetchedAuthor = await OpenLibraryAPI.getAuthorById(authorId);

      const newAuthor = new Author(fetchedAuthor);
      const saved = await newAuthor.save();
      author = saved.toObject();
    }

    res.status(200).json({ author });
  } catch (error) {
    console.error("Get author error:", error);
    res.status(500).json({ error: "Error fetching author" });
  }
});

// Get Books by Author Name
router.get("/api/booksByAuthorName/:authorName", async (req, res) => {
  const { authorName } = req.params;

  console.log("Received getBooks request for authorName:", authorName);

  try {
    let books = await Book.find({
      authorName: { $regex: new RegExp(`^${authorName}$`, "i") },
    }).lean();

    if (books.length === 0) {
      console.log(
        `authorName: ${authorName} not found in DB, fetching from OpenLibraryAPI`
      );
      const fetchedBooks = await OpenLibraryAPI.getBooksByAuthorName(
        authorName
      );

      if (fetchedBooks?.length) {
        const newBooks = await Book.insertMany(fetchedBooks);
        books = newBooks.map((book) => book.toObject());
      } else {
        books = [];
      }
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({ error: "Error fetching books" });
  }

  // For testing purposes only
  populateBooksByAuthorName(authorName);
});

// Populate Books by Author Name
async function populateBooksByAuthorName(authorName) {
  try {
    console.log("Populating books by author name:", authorName);

    const fetchedBooks = await OpenLibraryAPI.getBooksByAuthorName(authorName);

    if (fetchedBooks?.length) {
      for (const book of fetchedBooks) {
        const exists = await Book.exists({ bookId: book.bookId });
        if (!exists) {
          const newBook = new Book(book);
          await newBook.save();
        }
      }
    }
  } catch (error) {
    console.error("Error populating books:", error);
  }
}

export default router;
