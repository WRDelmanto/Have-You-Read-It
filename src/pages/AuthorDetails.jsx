import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import { FaHeart, FaBookmark, FaBook } from "react-icons/fa";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getAuthor = async () => {
      const author = await OpenLibraryAPI.getAuthorById(authorId);
      setAuthor(author);

      console.log("Author:", author);
    };

    getAuthor();
  }, [authorId]);

  useEffect(() => {
    if (!author?.authorName) return;

    const getBooks = async () => {
      const booksData = await OpenLibraryAPI.getBooksByAuthorName(
        author.authorName
      );
      setBooks(booksData);

      console.log("Books:", booksData); // This is the list of books by the author
    };

    getBooks();
  }, [author?.authorName]);

  const navigate = useNavigate();
  // const goToAuthorSettings = () => {
  //   navigate(`/settings/${author.authorId}`);
  // };

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  // Calculating the total of each type icons
  // const {
  //   favoriteBooks: authorFavoriteBooks = [],
  //   bookmarkedBooks = [],
  //   completedBooks = [],
  // } = author || {};
  // const totalFavorites = authorFavoriteBooks.length;
  // const totalBookmarked = bookmarkedBooks.length;
  // const totalCompleted = completedBooks.length;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {author && (
        <Container
          className="d-flex flex-column min-vh-100"
          style={{ marginTop: "64px", maxWidth: "100%" }}
        >
          <Card className="shadow-sm p-4 bg-white shadow-lg">
            <Row className="align-items-center mb-2">
              {/* Author imagem */}
              <Col md={3} className="text-center">
                <Card.Img
                  src={author.authorImage}
                  alt={author.authorName}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              {/* Author name */}
              <Col md={6} className="text-start">
                <h2 className="fw-bold">{author.authorName}</h2>
              </Col>

              {/* Button follow */}
              <Col md={3} className="text-center">
                <Button variant="primary" onClick={handleFollowButton}>
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Col>
            </Row>

            {/* <div
                  className="mt-4"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">About the author</h5>
                  <p>
                    Mel Robbins is the creator and host of the award-winning{" "}
                    <strong>The Mel Robbins Podcast</strong>, one of the most
                    successful podcasts in the world, and a{" "}
                    <strong>#1 New York Times</strong> bestselling author. She
                    has amassed 22 million followers online and is considered
                    the most sought-after expert in life improvement, mindset,
                    and behavior change. The Wall Street Journal calls her a
                    “billion-view podcaster” and TIME Magazine says she gives
                    millions of listeners around the globe “a reason to believe
                    in themselves.”
                  </p>
                  <p>
                    Her books have been translated into 50 languages and include
                    the{" "}
                    <strong>#1 New York Times, #1 Amazon, #1 Audible,</strong>{" "}
                    and <strong>#1 Sunday Times</strong> bestselling{" "}
                    <em>The Let Them Theory</em>, which is the most successful
                    non-fiction book launch in history, with over 1.2 million
                    copies sold within a month of its release date. She is also
                    the author of the multimillion-copy-selling{" "}
                    <em>The 5 Second Rule</em>, <em>The High 5 Habit</em>, and
                    seven #1 audiobook releases on Audible.
                  </p>
                </div> */}
            {/* Author Books */}
            <Row>
              <Col>
                <div
                  className="mt-4"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">All Books</h5>

                  <p>"show list of bookswritten by this author "</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default AuthorDetails;
