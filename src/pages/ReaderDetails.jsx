import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import { Button } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart } from "react-icons/fa";
import { fetchPostsByReaderId, fetchReaderById } from "../services/MockAPI.js";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import PostCard from "../components/PostCard";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [reader, setReader] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);

  useEffect(() => {
    const getReaderAndBooks = async () => {
      try {
        // Fetch reader data
        const readerData = await fetchReaderById(readerId);
        setReader(readerData);

        // Fetch favorite books details
        const favoriteBooksDetails = await Promise.all(
          readerData.favoriteBooks.map((bookId) =>
            OpenLibraryAPI.getBookById(bookId)
          )
        );
        setFavoriteBooks(favoriteBooksDetails);

        // Fetch bookmarked books details
        const bookmarkedBooksDetails = await Promise.all(
          readerData.bookmarkedBooks.map((bookId) =>
            OpenLibraryAPI.getBookById(bookId)
          )
        );
        setBookmarkedBooks(bookmarkedBooksDetails);

        // Fetch completed books details
        const completedBooksDetails = await Promise.all(
          readerData.completedBooks.map((bookId) =>
            OpenLibraryAPI.getBookById(bookId)
          )
        );
        setCompletedBooks(completedBooksDetails);
      } catch (error) {
        console.error("Error fetching reader or books:", error);
      }
    };

    const getPosts = async () => {
      try {
        const postsData = await fetchPostsByReaderId(readerId);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getReaderAndBooks();
    getPosts();
  }, [readerId]);

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  const totalFavorites = favoriteBooks.length || 0;
  const totalBookmarked = bookmarkedBooks.length || 0;
  const totalCompleted = completedBooks.length || 0;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      {reader && (
        <Container style={{ marginTop: "64px" }}>
          <Card className="shadow-sm p-4 bg-white shadow-lg align-items-center">
            <Row>
              <Col md={12} className="text-start">
                {/* Reader Info */}
                <div className="d-flex justify-content-between align-items-center mb-4 ml-4 mr-4">
                  <div>
                    <Card.Img
                      src={reader.picture}
                      alt={reader.name}
                      className="img-fluid rounded-circle align-items-center"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="fw-bold">{reader.name}</h2>
                  </div>

                  {/* Follow Button */}
                  <div className="d-flex flex-column align-items-end gap-3">
                    <Button variant="primary" onClick={handleFollowButton}>
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>

                {/* Favorite Books */}
                <div className="align-items-end gap-3">
                  <div
                    className="d-flex gap-3"
                    style={{
                      borderTop: "1px solid #dcdcdc",
                      paddingTop: "10px",
                    }}
                  >
                    <FaHeart style={{ color: "red", fontSize: "1.5rem" }} />
                    <h5 className="fw-bold">Favorite Books</h5>
                    <span className="ms-2">
                      (<b>{totalFavorites}</b>)
                    </span>
                  </div>
                </div>
                <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                  {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((book) => (
                      <p key={book.bookId}>{book.title}</p>
                    ))
                  ) : (
                    <p>No favorite books listed.</p>
                  )}
                </div>

                {/* Bookmarked Books */}
                <div className="align-items-end gap-3">
                  <div
                    className="d-flex gap-3"
                    style={{
                      borderTop: "1px solid #dcdcdc",
                      paddingTop: "10px",
                    }}
                  >
                    <FaBookmark style={{ color: "blue", fontSize: "1.5rem" }} />
                    <h5 className="fw-bold">Bookmarked Books</h5>
                    <span className="ms-2">
                      (<b>{totalBookmarked}</b>)
                    </span>
                  </div>
                  <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                    {bookmarkedBooks.length > 0 ? (
                      bookmarkedBooks.map((book) => (
                        <p key={book.bookId}>{book.title}</p>
                      ))
                    ) : (
                      <p>No bookmarked books listed.</p>
                    )}
                  </div>
                </div>

                {/* Completed Books */}
                <div className="align-items-end gap-3">
                  <div
                    className="d-flex gap-3"
                    style={{
                      borderTop: "1px solid #dcdcdc",
                      paddingTop: "10px",
                    }}
                  >
                    <FaBook style={{ color: "green", fontSize: "1.5rem" }} />
                    <h5 className="fw-bold">Completed Books</h5>
                    <span className="ms-2">
                      (<b>{totalCompleted}</b>)
                    </span>
                  </div>
                  <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                    {completedBooks.length > 0 ? (
                      completedBooks.map((book) => (
                        <p key={book.bookId}>{book.title}</p>
                      ))
                    ) : (
                      <p>No completed books listed.</p>
                    )}
                  </div>
                </div>

                {/* Reader Posts */}
                <div
                  className="d-flex flex-column mt-4 gap-3"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">Posts</h5>
                  {posts?.length > 0 &&
                    posts.map((post, index) => (
                      <PostCard key={index} post={post} />
                    ))}
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ReaderDetails;
