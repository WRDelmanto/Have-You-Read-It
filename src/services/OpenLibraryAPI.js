// https://openlibrary.org/dev/docs/api/search
const BASE_URL = "https://openlibrary.org/search.json";

const OpenLibraryAPI = {
  async getBookById(id) {
    try {
      let dynamicUrl = `${BASE_URL}?q=${id}`;
      dynamicUrl += "&fields=key,author_key,author_name,title,cover_i";
      dynamicUrl += "&limit=1";

      // console.log("Fetching book from Open Library API: ", dynamicUrl);

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch book");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      const book = data.docs[0];

      return {
        bookId: book.key.replace("/works/", "") || "",
        authorId: book.author_key?.[0] || "",
        authorName: book.author_name?.[0] || "",
        title: book.title || "",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://i.imgur.com/J5LVHEL.jpeg",
      };
    } catch (error) {
      console.error("Error fetching book: ", error);
      return null;
    }
  },

  async getBooksByTitle(title) {
    try {
      let dynamicUrl = `${BASE_URL}?title=${title}`;
      dynamicUrl += "&fields=key,author_name,title,cover_i";
      dynamicUrl += "&limit=5";

      // console.log("Fetching books by title: ", dynamicUrl);

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      return data.docs.map((book) => ({
        bookId: book.key.replace("/works/", "") || "",
        authorName: book.author_name?.[0] || "",
        title: book.title || "",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://i.imgur.com/J5LVHEL.jpeg",
      }));
    } catch (error) {
      console.error("Error fetching books: ", error);
      return null;
    }
  },

  async getAuthorById(authorId) {
    try {
      const dynamicUrl = `https://openlibrary.org/authors/${authorId}.json`;

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch author");
      }

      const author = await response.json();

      return {
        authorId: author.key.replace("/authors/", "") || "",
        authorName: author.name || "",
        authorImage: author.photos
          ? `https://covers.openlibrary.org/a/olid/${authorId}-M.jpg`
          : "https://m.media-amazon.com/images/I/11Bh3jv+xvL.jpg",
        favoriteBooks: author.works || [],
        bookmarkedBooks: [], // Assuming no data for bookmarkedBooks
        completedBooks: [], // Assuming no data for completedBooks
      };
    } catch (error) {
      console.error("Error fetching author: ", error);
      return null;
    }
  },
  async getBooksByAuthorName(authorName) {
    try {
      let dynamicUrl = `${BASE_URL}?author=${authorName.replace(" ", "+")}`;
      dynamicUrl += "&fields=key,author_name,title,cover_i";

      console.log("Fetching books by author: ", dynamicUrl);

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      return data.docs.map((book) => ({
        bookId: book.key.replace("/works/", "") || "",
        title: book.title || "",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://i.imgur.com/J5LVHEL.jpeg",
      }));
    } catch (error) {
      console.error("Error fetching books: ", error);
      return null;
    }
  },
};

export default OpenLibraryAPI;
