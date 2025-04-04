import { Reader } from "../models/Reader.js";

const populateDB = async () => {
  const mockReaders = [];

  mockReaders.push(
    new Reader({
      name: "Fabricio Gardin",
      picture:
        "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/23113/square_thumb%402x.jpg",
      bookmarkedBooks: ["OL42360848W", "OL35185354W", "OL24319394W"],
    })
  );

  mockReaders.push(
    new Reader({
      name: "Victor Villas-Boas",
      picture:
        "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/16406/square_thumb%402x.jpg",
    })
  );

  mockReaders.push(
    new Reader({
      name: "William Delmanto",
      picture:
        "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/26514/square_thumb%402x.jpg",
      favoriteBooks: ["OL39181496W", "OL35185354W"],
      bookmarkedBooks: ["OL42360848W", "OL35185354W"],
      completedBooks: ["OL24319394W", "OL35185354W"],
      following: {
        books: ["OL35185354W"],
        authors: [],
        readers: ["754368126", "754368127"],
      },
    })
  );

  try {
    await Reader.deleteMany({});
    console.log("Readers collection cleared.");

    const savedReaders = await Reader.insertMany(mockReaders);
    console.log("Readers saved successfully:", savedReaders.length);
  } catch (error) {
    console.error("Error saving readers:", error);
  }
};

export default populateDB;
