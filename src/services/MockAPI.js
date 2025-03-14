import OpenLibraryAPI from "./OpenLibraryAPI";

// Readers
const mockReaders = [];
mockReaders.push({
  _Id: "754368126",
  name: "Fabricio Gardin",
  picture: "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/23113/square_thumb%402x.jpg",
  bookmarkedBooks: ["OL42360848W", "OL35185354W", "OL24319394W"],
});

mockReaders.push({
  _Id: "754368127",
  name: "Victor Villas-Boas",
  picture: "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/16406/square_thumb%402x.jpg"
});

mockReaders.push({
  _Id: "754368128",
  name: "William Delmanto",
  picture: "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/26514/square_thumb%402x.jpg",
  favoriteBooks: ["OL39181496W", "OL35185354W"],
  bookmarkedBooks: ["OL42360848W", "OL35185354W"],
  completedBooks: ["OL24319394W", "OL35185354W"],
  following: {
    books: ["OL35185354W"],
    authors: [],
    readers: ["754368126", "754368127"]
  }
});

// Posts
const mockPosts = [];
mockPosts.push({
  _Id: "123497563",
  bookId: "OL39181496W",
  readerId: "754368126",
  title: "Amazing Read!",
  description: "I just finished it, and it was an emotional rollercoaster! Highly recommend it.",
  timestamp: new Date("2025-03-10T12:00:00Z"),
  likes: 25,
  comments: [
    { _Id: "754368127", readerId: "754368127", text: "I cried so much reading this that my Kindle now has water damage." },
    { _Id: "754364128", readerId: "754368128", text: "I threw the book across the room at the ending… then apologized and picked it up." }
  ]
});

mockPosts.push({
  _Id: "123497564",
  bookId: "OL42360848W",
  readerId: "754368127",
  title: "Great Book!",
  description: "I couldn't put it down! The characters are so well developed.",
  timestamp: new Date("2025-03-09T12:00:00Z"),
  likes: 15,
  comments: [
    { _Id: "754368126", readerId: "754368126", text: "I canceled plans just to read this… now I have no friends, but 5-star reviews!" }
  ]
});

mockPosts.push({
  _Id: "123497565",
  bookId: "OL24319394W",
  readerId: "754368128",
  title: "Loved it!",
  description: "I just finished it, and it was an emotional rollercoaster! Highly recommend it.",
  timestamp: new Date("2025-03-08T12:00:00Z"),
  likes: 25,
  comments: [
    { _Id: "755678127", readerId: "754368127", text: "I finished this book at 3 AM and now I have trust issues." },
    { _Id: "755673127", readerId: "754368128", text: "I gasped so loud at the plot twist, my cat filed a noise complaint." }
  ]
});

mockPosts.push({
  _Id: "123497566",
  bookId: "OL35185354W",
  readerId: "754368176",
  title: "Amazing Read!",
  description: "I just finished it, and it was an emotional rollercoaster! Highly recommend it.",
  timestamp: new Date("2025-03-07T12:00:00Z"),
  likes: 25,
  comments: [
    { _Id: "555678127", readerId: "754368127", text: "This book made me laugh, cry, and question my life choices—all in one sitting." },
    { _Id: "759678127", readerId: "754368128", text: "The ending hit me so hard, I need therapy… and a sequel." }
  ]
});

mockPosts.push({
  _Id: "123497567",
  bookId: "OL4897446W",
  readerId: "754368127",
  title: "Great Book!",
  description: "I couldn't put it down! The characters are so well developed.",
  timestamp: new Date("2025-03-06T12:00:00Z"),
  likes: 15,
  comments: [
    { _Id: "755778127", readerId: "754368126", text: "I was late to work because I needed to finish this chapter. Worth it." }
  ]
});

export const fetchReaderById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reader = mockReaders.find((reader) => reader._Id === id);
      resolve(reader);
    }, 500);
  });
};

export const fetchReadersByName = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredReaders = mockReaders.filter((reader) =>
        reader.name.toLowerCase().includes(name.toLowerCase())
      );
      resolve(filteredReaders);
    }, 500);
  });
};

export const fetchPosts = async (accountReaderId) => {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const reader = mockReaders.find((reader) => reader._Id === accountReaderId);

      if (!reader) {
        resolve([]);
        return;
      }

      const postsData = mockPosts.filter(
        (post) =>
          reader.following?.books.includes(post.bookId) ||
          reader.following?.readers.includes(post.readerId) ||
          post.readerId === accountReaderId
      );

      const posts = await Promise.all(
        postsData.map(async (post) => {
          const reader = mockReaders.find((reader) => reader._Id === post.readerId);
          const book = await OpenLibraryAPI.getBookById(post.bookId);
          const tempComments = await Promise.all(
            post.comments.map(async (comment) => {
              const reader = mockReaders.find((reader) => reader._Id === comment.readerId);
              const { readerId, ...newComment } = comment;
              return { ...newComment, reader };
            })
          );

          const { bookId, readerId, comments, ...newPost } = post;
          return { ...newPost, book, reader, comments: tempComments };
        })
      );

      posts.sort((currentPost, nextPost) => new Date(nextPost.timestamp) - new Date(currentPost.timestamp));

      resolve(posts);
    }, 500);
  });
};

export const fetchPostsById= async (id) => {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const reader = mockReaders.find((reader) => reader._Id === id);

      if (!reader) {
        resolve([]);
        return;
      }

      const postsData = mockPosts.filter((post) => post.readerId === id);

      const posts = await Promise.all(
        postsData.map(async (post) => {
          const reader = mockReaders.find((reader) => reader._Id === post.readerId);
          const book = await OpenLibraryAPI.getBookById(post.bookId);
          const tempComments = await Promise.all(
            post.comments.map(async (comment) => {
              const reader = mockReaders.find((reader) => reader._Id === comment.readerId);
              const { readerId, ...newComment } = comment;
              return { ...newComment, reader };
            })
          );

          const { bookId, readerId, comments, ...newPost } = post;
          return { ...newPost, book, reader, comments: tempComments };
        })
      );

      posts.sort((currentPost, nextPost) => new Date(nextPost.timestamp) - new Date(currentPost.timestamp));

      resolve(posts);
    }, 500);
  });
};

export default {
  fetchPosts,
  fetchPostsById,
  fetchReaderById,
  fetchReadersByName,
};
