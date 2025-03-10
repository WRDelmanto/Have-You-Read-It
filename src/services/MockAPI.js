import OpenLibraryAPI from './OpenLibraryAPI';

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
  favoriteBooks: ["OL39181496W"],
  bookmarkedBooks: ["OL42360848W"],
  completedBooks: ["OL24319394W"]
});

// Posts
const mockPosts = [];
mockPosts.push({
  _Id: "123497563",
  bookId: "OL39181496W",
  readerId: "754368126",
  title: "Amazing Read!",
  description: "I just finished it, and it was an emotional rollercoaster! Highly recommend it.",
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
  likes: 25,
  comments: [
    { _id: "754368127", text: "I agree! The writing style is fantastic." },
    { _id: "754368128", text: "Didn't like the ending, but overall a great book." }
  ]
});

export const fetchReaderById = (id) => {
  import OpenLibraryAPI from './OpenLibraryAPI';

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
    favoriteBooks: ["OL39181496W"],
    bookmarkedBooks: ["OL42360848W"],
    completedBooks: ["OL24319394W"]
  });

  // Posts
  const mockPosts = [];
  mockPosts.push({
    _Id: "123497563",
    bookId: "OL39181496W",
    readerId: "754368126",
    title: "Amazing Read!",
    description: "I just finished it, and it was an emotional rollercoaster! Highly recommend it.",
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
    likes: 25,
    comments: [
      { _id: "754368127", text: "I agree! The writing style is fantastic." },
      { _id: "754368128", text: "Didn't like the ending, but overall a great book." }
    ]
  });

  export const fetchReaderById = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = mockReaders.find((reader) => reader._Id === id);
        resolve(reader);
      }, 500);
      setTimeout(() => {
        const reader = mockReaders.find((reader) => reader._Id === id);
        resolve(reader);
      }, 500);
    });
  };

  export const fetchReadersByName = (name) => {
    export const fetchReadersByName = (name) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredReaders = mockReaders.filter((reader) =>
            reader.name.toLowerCase().includes(name.toLowerCase())
          );
          resolve(filteredReaders);
        }, 500);
        setTimeout(() => {
          const filteredReaders = mockReaders.filter((reader) =>
            reader.name.toLowerCase().includes(name.toLowerCase())
          );
          resolve(filteredReaders);
        }, 500);
      });
    };

    export const fetchPosts = async () => {
      return new Promise(async (resolve) => {
        setTimeout(async () => {
          const posts = await Promise.all(
            mockPosts.map(async (post) => {
              const reader = mockReaders.find((reader) => reader._id === post.readerId);
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
    export default {
      fetchPosts,
      fetchReaderById,
      fetchReadersByName,
    };
