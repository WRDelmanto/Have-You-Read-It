import { Container, Row, Col, Card, Navbar } from "react-bootstrap";
import {fetchMockBooks, fetchMockPosts} from '../services/MockAPI.js';
import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainNavbar from "../components/Navbar";

const BookDetails = () => {
  const {bookID} = useParams();

  const [book, setBook] = useState({});
  const [posts, setPosts] = useState([]);
  // useEffect(() =>{
  //   const books = mockBooks.find((book) => book.bookID === "b1");
  //   setBook(books);
  //   console.log(books)
  // }, []);

  {/* Get book information */}
  useEffect(() => {
   
    fetchMockBooks().then((books) => {
      
      const bookFound = books.find((book) => book.bookID === "b1");
      setBook(bookFound || {}); 
    });
  }, [bookID]);

  {/* Get Posts information */}
  useEffect(() => {
    fetchMockPosts().then((allPosts) => {
      const postsFound = allPosts.filter((post) => post.bookID === "b1");
      setPosts(postsFound);
    });
  }, [bookID]);


  return ( 

    
    <Container className="mt-4">
    <MainNavbar />
    
    {/* Card book information */}
    <div className="text-center mb-4" style={{ paddingTop: "40px" }}>
      <h2 className="display-4 fw-bold text-primary">Book Details</h2>
    </div>

    <Row className="justify-content-center">
      <Col md={6}> 
        <Card className="shadow-sm p-4 text-center bg-light" style={{ height: "100%", width:"100%" }}>
          <Card.Body>
            <Card.Title className="h4 text-dark fw-semibold">Title: {book.title}</Card.Title>
            <Card.Text className="h5 text-secondary">Author: {book.author}</Card.Text>      
            <Card.Text className="h5 text-info">Genre: {book.genre}</Card.Text>      
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* Card Posts information */}
    <div className="text-center mb-4"style={{ paddingTop: "40px" }}>
      <h2 className=" fw-bold text-primary">Reviews</h2>
    </div>

    <Row className="justify-content-center mt-3">
  {posts.length > 0 ? (
    posts.map((post) => (
      <Col md={6} key={post.postID} className="mb-4">
        <Card className="shadow-sm p-3 text-center" style={{ height: "auto" }}>
          <Card.Title className="h5 text-primary">{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
          {post.comments.length > 0 && (
            <>
              <hr />
              <h6 className="text-muted">Comments:</h6>
              {post.comments.map((comment) => (
                <Card.Text key={comment.commentID} className="small text-secondary">
                  - {comment.text}
                </Card.Text>
              ))}
            </>
          )}
         <p className="text-danger fw-bold">
          <i className="bi bi-heart-fill"></i> {post.likes} Likes
          </p>
        </Card>
      </Col>
    ))
  ) : (
    <p className="text-center mt-3 text-muted">No posts available for this book.</p>
  )}
</Row>
  </Container>
   );
}
export default BookDetails;
