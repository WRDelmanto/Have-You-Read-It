import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import PostCard from "../components/PostCard.jsx";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [accountReader, setAccountReader] = useState(null);
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const reader = localStorage.getItem("reader");

    if (!reader) {
      navigate("/");
      return;
    }

    const accountReader = JSON.parse(reader);
    setAccountReader(accountReader);

    const fetchData = async () => {
      const author = await OpenLibraryAPI.getAuthorById(authorId);
      setAuthor(author);

      const booksData = await OpenLibraryAPI.getBooksByAuthorName(author.authorName);
      setBooks(booksData);

      const postsData = await fetch(`/api/postsByAuthorId/${authorId}`);
      const postsJson = await postsData.json();

      const posts = postsJson.posts || [];

      // console.log("Posts: ", posts);

      setPosts(posts);
    };

    fetchData();
  }, [navigate]);

  const handleFollowButton = async () => {
    if (accountReader.following.authors.includes(authorId)) {
      const index = accountReader.following.authors.indexOf(authorId);
      accountReader.following.authors.splice(index, 1);
    } else {
      accountReader.following.authors.push(authorId);
    }

    setAccountReader({ ...accountReader });

    localStorage.setItem("reader", JSON.stringify(accountReader));

    const {
      _id,
      name,
      email,
      password,
      picture,
      bookmarkedBooks,
      favoriteBooks,
      completedBooks,
      following
    } = accountReader;

    const updateResponse = await fetch(`/api/updateReader/${accountReader._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        picture,
        bookmarkedBooks,
        favoriteBooks,
        completedBooks,
        following
      }),
    });

    // console.log("Updated bookId: " + bookID + " to favorite: " + accountReader.favoriteBooks.includes(bookID));
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
                  {accountReader.following.authors.includes(authorId) ? "Following" : "Follow"}
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
                      onClick={() => setVisibleCount(visibleCount + 4)}>
                      Read More
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default AuthorDetails;
