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
      dynamicUrl += "&fields=key,author_key,author_name,title,cover_i";
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
        authorId: book.author_key?.[0] || "",
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

  async getAuthorByName(name) {
    try {
      let dynamicUrl = `${BASE_URL}?author=${name}`;
      dynamicUrl += "&fields=key,author_name,author_key";
      dynamicUrl += "&limit=1";

      // console.log("Fetching author by name: ", dynamicUrl);

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch author");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      const author = data.docs[0];

      return {
        authorId: author.key.replace("/works/", "") || "",
        authorName: author.author_name?.[0] || "",
        authorImage: author.author_key[0]
          ? `https://covers.openlibrary.org/a/olid/${author.author_key[0]}-M.jpg`
          : "https://m.media-amazon.com/images/I/11Bh3jv+xvL.jpg",
      };
    } catch (error) {
      console.error("Error fetching author: ", error);
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

      let author = await response.json();

      if (!author.name) {
        // Redirect by Open Library API
        const newAuthorId = author.authors[0].author.key
          .replace("/authors/", "")
          .trim();

        console.log("New Author ID: ", newAuthorId);

        const secondaryResponse = await fetch(
          `https://openlibrary.org/authors/${newAuthorId}.json`
        );

        if (!secondaryResponse.ok) {
          throw new Error("Failed to fetch author");
        }

        author = await secondaryResponse.json();
      }

      return {
        authorId: author.key.replace("/authors/", "") || "",
        authorName: author.name || author.authors[0].name || "",
        authorImage:
          (author.author_key?.[0] &&
            `https://covers.openlibrary.org/a/olid/${author.author_key[0]}-M.jpg`) ||
          (author.photos &&
            `https://covers.openlibrary.org/a/olid/${authorId}-M.jpg`) ||
          "https://m.media-amazon.com/images/I/11Bh3jv+xvL.jpg",
      };
    } catch (error) {
      console.error("Error fetching author: ", error);
      return null;
    }
  },
  async getBooksByAuthorName(authorName) {
    try {
      let dynamicUrl = `${BASE_URL}?author=${authorName.replace(" ", "+")}`;
      dynamicUrl += "&fields=key,author_key,author_name,title,cover_i";

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
        authorId: book.author_key?.[0] || "",
        authorName: book.author_name?.[0] || "",
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
