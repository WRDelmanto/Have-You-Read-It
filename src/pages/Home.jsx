import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";

const Home = () => {
  const [accountReader, setReader] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const ACCOUNT_READER_ID = "754368128"; // For testing purposes

  useEffect(() => {
    const getReader = async () => {
      const accountReader = await fetchReaderById(ACCOUNT_READER_ID);
      setReader(accountReader);
    };

    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(ACCOUNT_READER_ID);
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    };

    getReader().then(getPosts);
  }, []);

  const handleFavorite = (bookID, bookTitle) => {
    const readerId = accountReader._Id;
    const favoriteBooksByReader =
      JSON.parse(localStorage.getItem("favoriteBooksByReader")) || {};

    if (accountReader.favoriteBooks.includes(bookID)) {
      const index = accountReader.favoriteBooks.indexOf(bookID);
      accountReader.favoriteBooks.splice(index, 1);

      // Remove the book title from localStorage
      const updatedFavoriteBooksTitles = favoriteBooksByReader[readerId].filter(
        (title) => title !== bookTitle
      );
      favoriteBooksByReader[readerId] = updatedFavoriteBooksTitles;
    } else {
      accountReader.favoriteBooks.push(bookID);
      // Add the book title to localStorage
      if (!favoriteBooksByReader[readerId]) {
        favoriteBooksByReader[readerId] = [];
      }
      favoriteBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "favoriteBooksByReader",
      JSON.stringify(favoriteBooksByReader)
    );
    setReader({ ...accountReader });
    console.log("Updated bookId: " + bookID + " to favorite: " + bookTitle);
  };

  const handleBookmark = (bookID, bookTitle) => {
    const readerId = accountReader._Id;
    const bookmarkedBooksByReader =
      JSON.parse(localStorage.getItem("bookmarkedBooksByReader")) || {};

    if (accountReader.bookmarkedBooks.includes(bookID)) {
      const index = accountReader.bookmarkedBooks.indexOf(bookID);
      accountReader.bookmarkedBooks.splice(index, 1);

      // Remove the book title from localStorage
      const updatedBookmarkedTitles =
        bookmarkedBooksByReader[readerId]?.filter(
          (title) => title !== bookTitle
        ) || [];
      bookmarkedBooksByReader[readerId] = updatedBookmarkedTitles;
    } else {
      accountReader.bookmarkedBooks.push(bookID);

      // Add the book title to localStorage
      if (!bookmarkedBooksByReader[readerId]) {
        bookmarkedBooksByReader[readerId] = [];
      }
      bookmarkedBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "bookmarkedBooksByReader",
      JSON.stringify(bookmarkedBooksByReader)
    );
    setReader({ ...accountReader });
    console.log("Updated bookId: " + bookID + " to bookmarked: " + bookTitle);
  };

  const handleCompleted = (bookID, bookTitle) => {
    const readerId = accountReader._Id;
    const completedBooksByReader =
      JSON.parse(localStorage.getItem("completedBooksByReader")) || {};

    if (accountReader.completedBooks.includes(bookID)) {
      const index = accountReader.completedBooks.indexOf(bookID);
      accountReader.completedBooks.splice(index, 1);

      // Remove the book title from localStorage
      const updatedCompletedTitles =
        completedBooksByReader[readerId]?.filter(
          (title) => title !== bookTitle
        ) || [];
      completedBooksByReader[readerId] = updatedCompletedTitles;
    } else {
      accountReader.completedBooks.push(bookID);

      // Add the book title to localStorage
      if (!completedBooksByReader[readerId]) {
        completedBooksByReader[readerId] = [];
      }
      completedBooksByReader[readerId].push(bookTitle);
    }

    localStorage.setItem(
      "completedBooksByReader",
      JSON.stringify(completedBooksByReader)
    );
    setReader({ ...accountReader });
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
              isFavorite={accountReader.favoriteBooks.includes(
                post.book.bookId
              )}
              isBookmarked={accountReader.bookmarkedBooks.includes(
                post.book.bookId
              )}
              isCompleted={accountReader.completedBooks.includes(
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
