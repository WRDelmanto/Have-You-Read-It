import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import { FaHeart, FaBookmark, FaBook } from "react-icons/fa";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const favoriteBooksByAuthor =
      JSON.parse(localStorage.getItem("favoriteBooksByAuthor")) || {};
    const favoriteBooksTitles = favoriteBooksByAuthor[authorId] || [];
    setFavoriteBooks(favoriteBooksTitles);
  }, [authorId]);

  useEffect(() => {
    const getAuthor = async () => {
      const authorData = await OpenLibraryAPI.getAuthorById(authorId);
      setAuthor(authorData);
    };

    getAuthor();
  }, [authorId]);

  const navigate = useNavigate();
  const goToAuthorSettings = () => {
    navigate(`/settings/${author.authorId}`);
  };

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  // Calculating the total of each type icons
  const {
    favoriteBooks: authorFavoriteBooks = [],
    bookmarkedBooks = [],
    completedBooks = [],
  } = author || {};
  const totalFavorites = authorFavoriteBooks.length;
  const totalBookmarked = bookmarkedBooks.length;
  const totalCompleted = completedBooks.length;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {author && (
        <Container style={{ marginTop: "64px" }}>
          <Card className="shadow-sm p-4 bg-white shadow-lg">
            <Row>
              <Col md={3} className="text-center">
                <Card.Img
                  src={
                    "https://m.media-amazon.com/images/S/amzn-author-media-prod/j8f9hc58pp4lhvjctnb7luoicd._SY450_CR0%2C0%2C450%2C450_.jpg"
                  }
                  alt={author.authorName}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              <Col md={9} className="text-start">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold">{author.authorName}</h2>
                  </div>

                  {/* Icons with totals and Follow Button */}
                  <div className="d-flex flex-column align-items-end gap-3">
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center">
                        <FaHeart style={{ color: "red", fontSize: "1.5rem" }} />
                        <span className="ms-2">{totalFavorites}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaBookmark
                          style={{ color: "blue", fontSize: "1.5rem" }}
                        />
                        <span className="ms-2">{totalBookmarked}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaBook
                          style={{ color: "green", fontSize: "1.5rem" }}
                        />
                        <span className="ms-2">{totalCompleted}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button variant="primary" onClick={handleFollowButton}>
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Favorite Books */}
                <div
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
                </div>

                <div
                  className="mt-4"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">All Books</h5>
                  <p>No books listed.</p>
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
