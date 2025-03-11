import OpenLibraryAPI from "./OpenLibraryAPI";

// Readers
const mockReaders = [];
mockReaders.push({
  _Id: "754368126",
  name: "Fabricio Gardin"
});

mockReaders.push({
  _Id: "754368127",
  name: "Victor Villas-Boas"
});

mockReaders.push({
  _Id: "754368128",
  name: "William Delmanto",
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
    { _id: "754368127", text: "I agree! The writing style is fantastic." },
    { _id: "754368128", text: "Didn't like the ending, but overall a great book." }
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
    { _id: "754368126", text: "I loved it too! The plot twists were amazing." }
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
    { _id: "754368127", text: "I agree! The writing style is fantastic." },
    { _id: "754368128", text: "Didn't like the ending, but overall a great book." }
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
    { _id: "754368127", text: "I agree! The writing style is fantastic." },
    { _id: "754368128", text: "Didn't like the ending, but overall a great book." }
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
    { _id: "754368126", text: "I loved it too! The plot twists were amazing." }
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

export const fetchPosts = async (id) => {
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const reader = mockReaders.find((reader) => reader._Id === id);
      // console.log("reader", reader);

      if (!reader) {
        resolve([]);
        return;
      }

      const postsData = mockPosts.filter(
        (post) => reader.following?.books.includes(post.bookId) ||
          reader.following?.readers.includes(post.readerId) ||
          post.readerId === id
      );

      const posts = await Promise.all(
        postsData.map(async (post) => {
          const reader = mockReaders.find((reader) => reader._id === post.readerId) || { _id: post.readerId, name: "Unknown" };
          const book = await OpenLibraryAPI.getBookById(post.bookId);

          const { bookId, readerId, ...newPost } = post;
          return { ...newPost, book, reader };
        })
      );

      resolve(posts);
    }, 500);
  });
};

export default {
  fetchPosts,
  fetchReaderById,
  fetchReadersByName,
};
