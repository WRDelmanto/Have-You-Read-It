import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const reader = localStorage.getItem("reader");

    if (!reader) {
      navigate("/signin");
    }

    const fetchData = async () => {
      const author = await OpenLibraryAPI.getAuthorById(authorId);
      setAuthor(author);

      const booksData = await OpenLibraryAPI.getBooksByAuthorName(author.authorName);
      setBooks(booksData);
    };

    fetchData();
  }, [navigate]);

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  const visibleBooks = books.slice(0, visibleCount);

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

            <div
              className="mt-4 p-4"
              style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
            >
              <h5 className="fw-bold">Author's Books {`(${books.length})`}</h5>
              <Card className="shadow-sm p-3">
                <Row className="mt-3">
                  {visibleBooks.map((book) => (
                    <Col key={book.bookId} md={3} className="mb-3 d-flex">
                      <Card className="shadow-sm w-100 border-0">
                        <Card.Img
                          variant="top"
                          src={book.cover || "https://via.placeholder.com/150"}
                          alt={book.title}
                          style={{
                            height: "250px",
                            width: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/book/${book.bookId}`)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                        <Card.Body className="text-center">
                          <Card.Title
                            className="small"
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",

                              maxHeight: "3em",
                            }}
                            onClick={() => navigate(`/book/${book.bookId}`)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            {book.title}
                          </Card.Title>
                          <Card.Text className="text-muted small">
                            {/* {author?.authorName || "Unknown"} */}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/* Read More Button */}
                {visibleCount < books.length && (
                  <div className="text-center mt-3">
                    <Button
                      variant="info"
                      onClick={() => setVisibleCount(visibleCount + 4)}
                    >
                      Read More
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </Card>
        </Container>
      )}
    </>
  );
};

export default AuthorDetails;
