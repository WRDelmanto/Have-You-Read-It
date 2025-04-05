import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";

const BookDetails = () => {
  const { bookId } = useParams();
  const [account_reader, setAccountReader] = useState([]);
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
    const reader = localStorage.getItem("reader");

    if (!reader) {
      navigate("/");
      return;
    }

    const accountReader = JSON.parse(reader);
    setAccountReader(accountReader);

    const getBook = async () => {
      const book = await OpenLibraryAPI.getBookById(bookId);
      setBook(book);

      // console.log("Book:", book);
    };

    const getPosts = async () => {
      try {
        const response = await fetch(`/api/postsByBookId/${bookId}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Failed to fetch posts.");
          return;
        }

        const postsData = data.posts || [];

        // console.log("Posts: ", postsData);

        setPosts(postsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBook().then(() => { getPosts() });
  }, [navigate]);

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
                  key={post._id}
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
                  shouldHideBook={true}
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
