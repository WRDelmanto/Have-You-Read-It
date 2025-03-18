import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";

const Home = () => {
  const [account_reader, setReader] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const ACCOUNT_READER_ID = "754368128"; // For testing purposes

  useEffect(() => {
    const getReader = async () => {
      const account_reader = await fetchReaderById(ACCOUNT_READER_ID);
      setReader(account_reader);
    };

    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(ACCOUNT_READER_ID);
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    };

    getReader().then(getPosts);
  }, []);

  const handleFavorite = (bookID, bookTitle) => {
    const readerId = account_reader._Id;
    const favoriteBooksByReader =
      JSON.parse(localStorage.getItem("favoriteBooksByReader")) || {};

    if (account_reader.favoriteBooks.includes(bookID)) {
      const index = account_reader.favoriteBooks.indexOf(bookID);
      account_reader.favoriteBooks.splice(index, 1);

      // Remove the book title from the localStorage
      const updatedFavoriteBooksTitles = favoriteBooksByReader[readerId].filter(
        (title) => title !== bookTitle
      );
      favoriteBooksByReader[readerId] = updatedFavoriteBooksTitles;
    } else {
      account_reader.favoriteBooks.push(bookID);
      // Add the book title to the localStorage
      if (!favoriteBooksByReader[readerId]) {
        favoriteBooksByReader[readerId] = [];
      }
      favoriteBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "favoriteBooksByReader",
      JSON.stringify(favoriteBooksByReader)
    );
    setReader({ ...account_reader });
    console.log("Updated bookId: " + bookID + " to favorite: " + bookTitle);
  };

  const handleBookmark = (bookID, bookTitle) => {
    const readerId = account_reader._Id;
    const bookmarkedBooksByReader =
      JSON.parse(localStorage.getItem("bookmarkedBooksByReader")) || {};

    if (account_reader.bookmarkedBooks.includes(bookID)) {
      const index = account_reader.bookmarkedBooks.indexOf(bookID);
      account_reader.bookmarkedBooks.splice(index, 1);

      // Remove the book title from the localStorage
      const updatedBookmarkedTitles =
        bookmarkedBooksByReader[readerId]?.filter(
          (title) => title !== bookTitle
        ) || [];
      bookmarkedBooksByReader[readerId] = updatedBookmarkedTitles;
    } else {
      account_reader.bookmarkedBooks.push(bookID);

      // Add the book title to the localStorage
      if (!bookmarkedBooksByReader[readerId]) {
        bookmarkedBooksByReader[readerId] = [];
      }
      bookmarkedBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "bookmarkedBooksByReader",
      JSON.stringify(bookmarkedBooksByReader)
    );
    setReader({ ...account_reader });
    console.log("Updated bookId: " + bookID + " to bookmarked: " + bookTitle);
  };

  const handleCompleted = (bookID, bookTitle) => {
    const readerId = account_reader._Id;
    const completedBooksByReader =
      JSON.parse(localStorage.getItem("completedBooksByReader")) || {};

    if (account_reader.completedBooks.includes(bookID)) {
      const index = account_reader.completedBooks.indexOf(bookID);
      account_reader.completedBooks.splice(index, 1);

      // Remove the book title from the localStorage
      const updatedCompletedTitles =
        completedBooksByReader[readerId]?.filter(
          (title) => title !== bookTitle
        ) || [];
      completedBooksByReader[readerId] = updatedCompletedTitles;
    } else {
      account_reader.completedBooks.push(bookID);

      // Add the book title to the localStorage
      if (!completedBooksByReader[readerId]) {
        completedBooksByReader[readerId] = [];
      }
      completedBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "completedBooksByReader",
      JSON.stringify(completedBooksByReader)
    );
    setReader({ ...account_reader });
    console.log("Updated bookId: " + bookID + " to completed: " + bookTitle);
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      <Container style={{ marginTop: "64px" }}>
        <Row className="g-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post._Id}
              post={post}
              isFavorite={account_reader.favoriteBooks.includes(
                post.book.bookId
              )}
              isBookmarked={account_reader.bookmarkedBooks.includes(
                post.book.bookId
              )}
              isCompleted={account_reader.completedBooks.includes(
                post.book.bookId
              )}
              handleFavorite={(bookID) =>
                handleFavorite(bookID, post.book.title)
              }
              handleBookmark={(bookID) =>
                handleBookmark(bookID, post.book.title)
              }
              handleCompleted={(bookID) =>
                handleCompleted(bookID, post.book.title)
              }
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
