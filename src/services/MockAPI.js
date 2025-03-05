const mockPosts = [
  {
    postID: "p1",
    bookID: "b1",
    readerID: "r1",
    title: "Amazing Read!",
    description:
      "I just finished 'The Great Gatsby', and it was an emotional rollercoaster! Highly recommend it.",
    comments: [
      {
        commentID: "c1",
        readerID: "r2",
        text: "I agree! The writing style is fantastic.",
      },
      {
        commentID: "c2",
        readerID: "r3",
        text: "Didn't like the ending, but overall a great book.",
      },
    ],
    likes: 25,
  },
  {
    postID: "p2",
    bookID: "b2",
    readerID: "r2",
    title: "Is '1984' still relevant?",
    description:
      "I started reading '1984' and it's scary how relevant it still feels today. What do you think?",
    comments: [
      {
        commentID: "c3",
        readerID: "r1",
        text: "Absolutely! Orwell was ahead of his time.",
      },
      { commentID: "c4", readerID: "r4", text: "A must-read for everyone." },
    ],
    likes: 40,
  },
];

const mockReaders = [
  {
    readerID: "r1",
    name: "Alice Johnson",
    favoriteGenres: ["Fiction", "Mystery"],
  },
  {
    readerID: "r2",
    name: "Bob Smith",
    favoriteGenres: ["Sci-Fi", "Dystopian"],
  },
  {
    readerID: "r3",
    name: "Charlie Davis",
    favoriteGenres: ["Fantasy", "Adventure"],
  },
];

const mockBooks = [
  {
    bookID: "b1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
  },
  { bookID: "b2", title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    bookID: "b3",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "Fantasy",
  },
];

/**
 * Simulates fetching posts from an API.
 * @returns {Promise<Array>}
 */
export const fetchMockPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 500);
  });
};

/**
 * Simulates fetching readers from an API.
 * @returns {Promise<Array>}
 */
export const fetchMockReaders = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReaders), 500);
  });
};

/**
 * Simulates fetching books from an API.
 * @returns {Promise<Array>}
 */
export const fetchMockBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 500);
  });
};

export default { fetchMockPosts, fetchMockReaders, fetchMockBooks };
