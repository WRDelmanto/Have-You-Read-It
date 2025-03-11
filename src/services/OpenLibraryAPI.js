const BASE_URL = "https://openlibrary.org/search.json";

const OpenLibraryAPI = {
  async getBookById(id) {
    try {
      let dynamicUrl = `${BASE_URL}?q=${id}`;
      dynamicUrl += "&fields=key,author_key,author_name,title,cover_i";
      dynamicUrl += "&limit=1";

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
        bookId: book.key.replace("/works/", "") || '',
        authorId: book.author_key?.[0] || '',
        authorName: book.author_name?.[0] || '',
        title: book.title || '',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://i.imgur.com/J5LVHEL.jpeg"
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
      dynamicUrl += "&limit=3";

      const response = await fetch(dynamicUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      const book = data.docs[0];

      return {
        bookId: book.key.replace("/works/", "") || '',
        authorName: book.author_name?.[0] || '',
        title: book.title || '',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://i.imgur.com/J5LVHEL.jpeg"
      };
    } catch (error) {
      console.error("Error fetching books: ", error);
      return null;
    }
  }
};

export default OpenLibraryAPI;
