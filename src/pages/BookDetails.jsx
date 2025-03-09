import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchMockBooks, fetchMockPosts } from "../services/MockAPI.js";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { FaHeart, FaBookmark, FaBook } from "react-icons/fa";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch books and find the first book
    fetchMockBooks().then((books) => {
      const bookFound = books[0]; // Get the first book from the list
      setBook(bookFound || null);
    });
  }, []);

  useEffect(() => {
    // Fetch posts for the first book (assuming posts are related to book ID)
    fetchMockPosts().then((allPosts) => {
      const postsFound = allPosts.filter((post) => post.bookID === "1"); // Adjust as needed
      setPosts(postsFound);
    });
  }, []);

  if (!book) {
    return <p className="text-center mt-4">Loading book...</p>;
  }

  return (
    <Container >
      <NavBar />

      <Card className="shadow-sm p-4 bg-white">
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <Card.Img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              className="img-fluid rounded"
              style={{ maxWidth: "190px", height: "300px" }}
            />
          </Col>

          <Col md={9} className="text-begin">
          <div className="text-end mb-3">
            <FaHeart className="text-danger fs-4 mx-2" />
            <FaBookmark className="text-primary fs-4 mx-2" />
            <FaBook className="text-success fs-4 mx-2" />
          </div >
          <div className="text-start mb-2">
            <h2 className="fw-bold">{book.title}</h2>
            <p className="text-muted">by <span className="fw-semibold text-primary">{book.author.name}</span></p>
            <p className="text-muted"><b>Genre:</b> <span className="fw-semibold text-primary">{book.genres.join(', ')}</span></p>
            </div>
            <div className="text-start" style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}>
              <h5 className="fw-bold">Description</h5>
              <p>{book.description || "No description available for this book."}</p>
            </div>
          </Col>
          {/* <Col md={2} className="text-end top-0">
            <FaHeart className="text-danger fs-4 mx-2" />
            <FaBookmark className="text-primary fs-4 mx-2" />
            <FaBook className="text-success fs-4 mx-2" />
          </Col> */}
          
          {/* <div className="text-begin">
          <h5 className="fw-bold">Description</h5>
          <p>{book.description || "No description available for this book."}</p>
          </div> */}

          
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
  );
};

export default BookDetails;
