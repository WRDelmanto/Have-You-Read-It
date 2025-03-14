import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  FaBook,
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import { fetchPostsByBookId, fetchReaderById } from "../services/MockAPI.js";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";

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

      console.log("Posts:", posts); // // This is the list of posts for the book
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

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      <Container className="mt-5">
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
        </Card>

        <Card className="shadow-sm p-4 mt-3">
          <h5 className="fw-bold text-primary">Reader Posts</h5>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card className="p-3 mt-3" key={post.postID}>
                <h6 className="fw-bold">{post.title}</h6>
                <p>{post.description}</p>
                <p className="text-danger fw-bold">
                  <FaHeart /> {post.likes} Likes
                </p>
              </Card>
            ))
          ) : (
            <p className="text-muted">No posts available for this book.</p>
          )}
        </Card>
      </Container>
    </>
  );
};

export default BookDetails;
