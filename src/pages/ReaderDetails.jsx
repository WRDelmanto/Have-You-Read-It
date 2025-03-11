import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { fetchReaderById } from "../services/MockAPI.js";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [reader, setReader] = useState(null);

  useEffect(() => {
    const getReader = async () => {
      const readerData = await fetchReaderById(readerId);
      setReader(readerData);
    };

    getReader();
  }, [readerId]);

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {reader && (
        <Container className="mt-5">
          <Card className="shadow-sm p-4 bg-white">
            <Row>
            
            {/* <Col md={3} className="text-center">
              <Card.Img
                src="https://via.placeholder.com/150" // Placeholder to image, if we will put
                alt={reader.name}
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </Col> */}

            <Col md={9} className="text-start">
              <h2 className="fw-bold">{reader.name}</h2>
              <p className="text-muted">ID: {reader._Id}</p>

              <div className="mt-4" style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}>
                <h5 className="fw-bold">Favorite Books</h5>
                <p>{reader.favoriteBooks?.join(", ") || "No favorite books listed."}</p>
              </div>

              <div className="mt-4">
                <h5 className="fw-bold">Bookmarked Books</h5>
                <p>{reader.bookmarkedBooks?.join(", ") || "No bookmarked books listed."}</p>
              </div>

              <div className="mt-4">
                <h5 className="fw-bold">Completed Books</h5>
                <p>{reader.completedBooks?.join(", ") || "No completed books listed."}</p>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
      )}
    </>
  );
};

export default ReaderDetails;
