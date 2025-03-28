import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import {
  FaBook,
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import { fetchPostsByBookId, fetchReaderById } from "../services/MockAPI.js";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import PostCard from "../components/PostCard";

const BookDetails = () => {
  const { bookId } = useParams();
  const [account_reader, setReader] = useState([]);
  const [book, setBook] = useState([]);
  const [posts, setPosts] = useState([]);
  const [iconHovered, setIconHovered] = useState({
    favorite: false,
    bookmarked: false,
    completed: false,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ACCOUNT_READER_ID = "754368128"; // For testing purposes

    const getReader = async () => {
      const account_reader = await fetchReaderById(ACCOUNT_READER_ID);
      setReader(account_reader);

      // console.log("Account reader:", account_reader);
    };

    const getBook = async () => {
      const book = await OpenLibraryAPI.getBookById(bookId);
      setBook(book);

      // console.log("Book:", book);
    };

    const getPosts = async () => {
      const posts = await fetchPostsByBookId(bookId);
      setPosts(posts);

      console.log("Posts:", posts); // This is the list of posts for the book
    };

    getReader().then(getBook).then(getPosts);
  }, []);

  const handleFavorite = (bookID) => {
    if (account_reader.favoriteBooks.includes(bookID)) {
      const index = account_reader.favoriteBooks.indexOf(bookID);
      account_reader.favoriteBooks.splice(index, 1);
    } else {
      account_reader.favoriteBooks.push(bookID);
    }

    setReader({ ...account_reader });
    console.log(
      "Updated bookId: " +
        bookID +
        " to favorite: " +
        account_reader.favoriteBooks.includes(bookID)
    );
  };

  const handleBookmark = (bookID) => {
    if (account_reader.bookmarkedBooks.includes(bookID)) {
      const index = account_reader.bookmarkedBooks.indexOf(bookID);
      account_reader.bookmarkedBooks.splice(index, 1);
    } else {
      account_reader.bookmarkedBooks.push(bookID);
    }

    setReader({ ...account_reader });
    console.log(
      "Updated bookId: " +
        bookID +
        " to bookmarked: " +
        account_reader.bookmarkedBooks.includes(bookID)
    );
  };

  const handleCompleted = (bookID) => {
    if (account_reader.completedBooks.includes(bookID)) {
      const index = account_reader.completedBooks.indexOf(bookID);
      account_reader.completedBooks.splice(index, 1);
    } else {
      account_reader.completedBooks.push(bookID);
    }

    setReader({ ...account_reader });
    console.log(
      "Updated bookId: " +
        bookID +
        " to completed: " +
        account_reader.completedBooks.includes(bookID)
    );
  };

  const handleIconHover = (icon) => {
    setIconHovered((prevState) => ({
      ...prevState,
      [icon]: !prevState[icon],
    }));
  };
  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {/* <Container className="mt-5">
        <Card className="shadow-sm p-4 bg-white shadow-lg ">
          <Row className="">
            <Col md={3} className="text-center">
              <Card.Img
                src={book.cover}
                alt={book.title}
                className="img-fluid rounded"
                style={{
                  width: "300px",
                  height: "500px",
                  objectFit: "contain",
                }}
              />
            </Col>

            <Col md={9} className="text-begin">
              <div className="text-end mb-3">
                <button
                  className="btn btn-link p-0 me-2"
                  onClick={() => handleFavorite(book.bookId)}
                  onMouseEnter={() => handleIconHover("favorite")}
                  onMouseLeave={() => handleIconHover("favorite")}
                >
                  {account_reader?.favoriteBooks?.includes(book.bookId) ? (
                    <FaHeart
                      size={22}
                      style={{
                        color: "red",
                        transition: "transform 0.3s",
                        transform: iconHovered.favorite
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      size={22}
                      style={{
                        color: "red",
                        transition: "transform 0.3s",
                        transform: iconHovered.favorite
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  )}
                </button>
                <button
                  className="btn btn-link p-0 me-2"
                  onClick={() => handleBookmark(book.bookId)}
                  onMouseEnter={() => handleIconHover("bookmarked")}
                  onMouseLeave={() => handleIconHover("bookmarked")}
                >
                  {account_reader?.bookmarkedBooks?.includes(book.bookId) ? (
                    <FaBookmark
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.bookmarked
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  ) : (
                    <FaRegBookmark
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.bookmarked
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  )}
                </button>
                <button
                  className="btn btn-link p-0"
                  onClick={() => handleCompleted(book.bookId)}
                  onMouseEnter={() => handleIconHover("completed")}
                  onMouseLeave={() => handleIconHover("completed")}
                >
                  {account_reader?.completedBooks?.includes(book.bookId) ? (
                    <FaBook
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.completed
                          ? "scale(1.2)"
                          : "scale(1)",
                        color: "green",
                      }}
                    />
                  ) : (
                    <FaBook
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.completed
                          ? "scale(1.2)"
                          : "scale(1)",
                        color: "white",
                        stroke: "green",
                        strokeWidth: "20px",
                      }}
                    />
                  )}
                </button>
              </div>
              <div className="text-start mt-4">
                <h2 className="fw-bold">{book.title}</h2>
                <p className="text-muted">
                  <span className="fw-semibold text-primary">
                    {book.authorName}
                  </span>
                </p>
              </div>
              <div
                className="text-start mt-5"
                style={{ borderTop: "1px solid #dcdcdc ", paddingTop: "10px" }}
              >
                <h5 className="fw-bold">Description</h5>
                <p>
                  {book.description ||
                    "No description available for this book."}
                </p>
              </div>
            </Col>
            </Row>
          </div>
        </Card> */}

      <Container
        className="d-flex flex-column min-vh-100"
        style={{ marginTop: "64px", maxWidth: "100%" }}
      >
        <Card className="shadow-sm p-4 bg-white shadow-lg">
          <Row className="align-items-center mb-2">
            {/* Book image */}
            <Col md={3} className="text-center">
              <Card.Img
                src={book.cover}
                alt={book.title}
                style={{
                  height: "250px",
                  objectFit: "contain",
                  width: "150px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                onClick={() => navigate(`/book/${book.bookId}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Col>

            {/* <Col md={9} className="text-begin">
              <div className="text-end mb-3">
                <button
                  className="btn btn-link p-0 me-2"
                  onClick={() => handleFavorite(book.bookId)}
                  onMouseEnter={() => handleIconHover("favorite")}
                  onMouseLeave={() => handleIconHover("favorite")}
                > */}
            {/* {account_reader?.favoriteBooks?.includes(book.bookId) ? (
                    <FaHeart
                      size={22}
                      style={{
                        color: "red",
                        transition: "transform 0.3s",
                        transform: iconHovered.favorite
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      size={22}
                      style={{
                        color: "red",
                        transition: "transform 0.3s",
                        transform: iconHovered.favorite
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  )}
                </button>
                <button
                  className="btn btn-link p-0 me-2"
                  onClick={() => handleBookmark(book.bookId)}
                  onMouseEnter={() => handleIconHover("bookmarked")}
                  onMouseLeave={() => handleIconHover("bookmarked")}
                >
                  {account_reader?.bookmarkedBooks?.includes(book.bookId) ? (
                    <FaBookmark
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.bookmarked
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  ) : (
                    <FaRegBookmark
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.bookmarked
                          ? "scale(1.2)"
                          : "scale(1)",
                      }}
                    />
                  )}
                </button>
                <button
                  className="btn btn-link p-0"
                  onClick={() => handleCompleted(book.bookId)}
                  onMouseEnter={() => handleIconHover("completed")}
                  onMouseLeave={() => handleIconHover("completed")}
                >
                  {account_reader?.completedBooks?.includes(book.bookId) ? (
                    <FaBook
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.completed
                          ? "scale(1.2)"
                          : "scale(1)",
                        color: "green",
                      }}
                    />
                  ) : (
                    <FaBook
                      size={22}
                      style={{
                        transition: "transform 0.3s",
                        transform: iconHovered.completed
                          ? "scale(1.2)"
                          : "scale(1)",
                        color: "white",
                        stroke: "green",
                        strokeWidth: "20px",
                      }}
                    />
                  )}
                </button> 
              </div>*/}
            {/* Author name */}
            <Col md={6} className="text-start">
              <h2 className="fw-bold">{book.title}</h2>
              <Link
                to={`/author/${book.authorId}`}
                className="text-decoration-none"
              >
                <span
                  className="fw-semibold text-primary"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    display: "inline-block",
                  }}
                >
                  {book.authorName}
                </span>
              </Link>
            </Col>
            {/* <div
                className="text-start mt-5"
                style={{ borderTop: "1px solid #dcdcdc ", paddingTop: "10px" }}
              >
                <h5 className="fw-bold">Description</h5>
                <p>
                  {book.description ||
                    "No description available for this book."}
                </p>
              </div>
            </Col> */}

            {/* Button follow */}
            <Col md={3} className="text-center">
              <Button variant="primary" onClick={handleFollowButton}>
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </Col>
          </Row>
          <div
            className="mt-1 p-0  ms-4 me-4"
            style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
          >
            <Row className="mt-3">
              <h5 className="fw-bold mb-3 ">
                Posts about this book {`(${posts.length})`}
              </h5>
              {posts.map((post) => (
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
                  hideBookImage={true} // to hide image
                />
              ))}
            </Row>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default BookDetails;
