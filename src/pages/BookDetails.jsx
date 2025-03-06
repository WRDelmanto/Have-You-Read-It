import { Container, Row, Col, Card } from "react-bootstrap";
import {fetchMockBooks} from '../services/MockAPI.js';
import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const {id} = useParams();

  const [book, setBook] = useState({});
  // useEffect(() =>{
  //   const books = mockBooks.find((book) => book.bookID === "b1");
  //   setBook(books);
  //   console.log(books)
  // }, []);
  useEffect(() => {
   
    fetchMockBooks().then((books) => {
      
      const bookFound = books.find((book) => book.bookID === "b2");
      setBook(bookFound || {}); 
    });
  }, []);

  return ( 

    <Container>
      <h1> Book Details</h1>
      <Row className="my-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Ttile: {book.title}</Card.Title>
                <Card.Text>Author: {book.author}</Card.Text>      
                <Card.Text>Genre: {book.genre}</Card.Text>      
                
              </Card.Body>

            </Card>
          </Col>
        </Row>
    </Container>
   );
}
export default BookDetails;
