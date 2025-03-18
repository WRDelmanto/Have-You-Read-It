import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchReaderById } from "../services/MockAPI";

const Home = () => {
  const [accountReader, setAccountReader] = useState(null);
  const [posts, setPosts] = useState([]);
  const ACCOUNT_READER_ID = "754368128"; // For testing purposes

  useEffect(() => {
    const fetchData = async () => {
      const [accountReader, posts] = await Promise.all([
        fetchReaderById(ACCOUNT_READER_ID),
        fetchPosts(ACCOUNT_READER_ID),
      ]);

      setAccountReader(accountReader);
      setPosts(posts);
    };

    fetchData();
  }, []);

  const handleFavorite = (bookID) => {
    if (accountReader.favoriteBooks.includes(bookID)) {
      const index = accountReader.favoriteBooks.indexOf(bookID);
      accountReader.favoriteBooks.splice(index, 1);
    } else {
      accountReader.favoriteBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    console.log("Updated bookId: " + bookID + " to favorite: " + accountReader.favoriteBooks.includes(bookID));
  };

  const handleBookmark = (bookID) => {
    if (accountReader.bookmarkedBooks.includes(bookID)) {
      const index = accountReader.bookmarkedBooks.indexOf(bookID);
      accountReader.bookmarkedBooks.splice(index, 1);
    } else {
      accountReader.bookmarkedBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    console.log("Updated bookId: " + bookID + " to bookmarked: " + accountReader.bookmarkedBooks.includes(bookID));
  };

  const handleCompleted = (bookID) => {
    if (accountReader.completedBooks.includes(bookID)) {
      const index = accountReader.completedBooks.indexOf(bookID);
      accountReader.completedBooks.splice(index, 1);
    } else {
      accountReader.completedBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    console.log("Updated bookId: " + bookID + " to completed: " + accountReader.completedBooks.includes(bookID));
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      <Container style={{ marginTop: "64px" }}>
        <Row className="g-4">
          {posts.map((post) => (
            <PostCard
              key={post._Id}
              post={post}
              isFavorite={accountReader.favoriteBooks.includes(post.book.bookId)}
              isBookmarked={accountReader.bookmarkedBooks.includes(post.book.bookId)}
              isCompleted={accountReader.completedBooks.includes(post.book.bookId)}
              handleFavorite={(bookID) => handleFavorite(bookID, post.book.title)}
              handleBookmark={(bookID) => handleBookmark(bookID, post.book.title)}
              handleCompleted={(bookID) => handleCompleted(bookID, post.book.title)}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
