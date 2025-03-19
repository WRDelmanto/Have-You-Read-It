import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard";
import { fetchPostsByReaderId, fetchReaderById } from "../services/MockAPI.js";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import { Link, useNavigate } from "react-router-dom";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [accountReader, setAccountReader] = useState(null);
  const [reader, setReader] = useState(null);
  const [posts, setPosts] = useState([]);
  const [favoritedBooks, setFavoritedBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const ACCOUNT_READER_ID = "754368128"; // For testing purposes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [accountReader, reader, posts] = await Promise.all([
        fetchReaderById(ACCOUNT_READER_ID),
        fetchReaderById(readerId),
        fetchPostsByReaderId(readerId),
      ]);

      setAccountReader(accountReader);
      setReader(reader);
      setPosts(posts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!reader) return;

      // Avoid making unnecessary API calls
      const favoriteBooks = reader.favoriteBooks ?? [];
      const bookmarkedBooks = reader.bookmarkedBooks ?? [];
      const completedBooks = reader.completedBooks ?? [];

      const [favoritedBooksList, bookmarkedBooksList, completedBooksList] =
        await Promise.all([
          Promise.all(
            favoriteBooks.map((bookId) => OpenLibraryAPI.getBookById(bookId))
          ),
          Promise.all(
            bookmarkedBooks.map((bookId) => OpenLibraryAPI.getBookById(bookId))
          ),
          Promise.all(
            completedBooks.map((bookId) => OpenLibraryAPI.getBookById(bookId))
          ),
        ]);

      setFavoritedBooks(favoritedBooksList);
      setBookmarkedBooks(bookmarkedBooksList);
      setCompletedBooks(completedBooksList);
    };

    fetchBooks();
  }, [reader]);

  const handleFollow = () => {
    if (!accountReader.following.readers) return;

    if (accountReader.following.readers.includes(reader._Id)) {
      const index = accountReader.following.readers.indexOf(reader._Id);
      accountReader.following.readers.splice(index, 1);
    } else {
      accountReader.following.readers.push(reader._Id);
    }

    setAccountReader({ ...accountReader });
    // console.log("Updated readerId: " + reader._Id + " to favorite: " + accountReader.following.readers.includes(readerId));
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      {reader && (
        <Container
          className="d-flex flex-column min-vh-100"
          style={{ marginTop: "64px", maxWidth: "100%" }}
        >
          <Card className="shadow-sm p-4 bg-white shadow-lg align-items-center">
            <Row>
              <Col md={12} className="text-start">
                {/* Reader Info */}
                <div className="d-flex align-items-center gap-4 mb-4">
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
                  <div className="ms-auto">
                    <Button variant="primary" onClick={handleFollow}>
                      {accountReader.following.readers.includes(reader._Id)
                        ? "Following"
                        : "Follow"}
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
                    <h5 className="fw-bold">
                      Favorite ( {(reader?.favoriteBooks ?? []).length} )
                    </h5>
                  </div>
                  <div style={{ paddingBottom: "10px" }}>
                    {favoritedBooks.map((book) => (
                      <div
                        key={book.bookId}
                        style={{ paddingTop: "6px", paddingLeft: "40px" }}
                      >
                        <div
                          onClick={() => navigate(`/book/${book.bookId}`)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        >
                          {book.title}
                        </div>
                      </div>
                    ))}
                  </div>
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
                    <h5 className="fw-bold">
                      Bookmarked ( {(reader?.bookmarkedBooks ?? []).length} )
                    </h5>
                  </div>
                  <div style={{ paddingBottom: "10px" }}>
                    {bookmarkedBooks.map((book) => (
                      <div
                        key={book.bookId}
                        style={{ paddingTop: "6px", paddingLeft: "40px" }}
                      >
                        <div
                          onClick={() => navigate(`/book/${book.bookId}`)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        >
                          {book.title}
                        </div>
                      </div>
                    ))}
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
                    <h5 className="fw-bold">
                      Completed ( {(reader?.completedBooks ?? []).length} )
                    </h5>
                  </div>
                  <div style={{ paddingBottom: "10px" }}>
                    {completedBooks.map((book) => (
                      <div
                        key={book.bookId}
                        style={{ paddingTop: "6px", paddingLeft: "40px" }}
                      >
                        <div
                          onClick={() => navigate(`/book/${book.bookId}`)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.3s ease-in-out",
                          }}
                        >
                          {book.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reader Posts */}
                {posts.length > 0 && accountReader && (
                  <div
                    className="d-flex flex-column mt-1 gap-3"
                    style={{
                      borderTop: "1px solid #dcdcdc",
                      paddingTop: "10px",
                    }}
                  >
                    <h5 className="fw-bold">Posts</h5>
                    {posts.map((post) => (
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
                  </div>
                )}
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ReaderDetails;
