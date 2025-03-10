const BASE_URL = "https://openlibrary.org/search.json";

const OpenLibraryAPI = {
  async getBookById(id) {
    try {
      const response = await fetch(`${BASE_URL}?q=${id}`);

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
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://i.imgur.com/J5LVHEL.jpeg",
        title: book.title || ''
      };
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  },
};

export default OpenLibraryAPI;
