import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";

import { fetchReaderById } from "../services/MockAPI.js";
import { Button } from "react-bootstrap";
import { FaHeart, FaBookmark, FaBook } from "react-icons/fa";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [reader, setReader] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const favoriteBooksByReader =
      JSON.parse(localStorage.getItem("favoriteBooksByReader")) || {};
    const favoriteBooksTitles = favoriteBooksByReader[readerId] || [];
    setFavoriteBooks(favoriteBooksTitles);
  }, [readerId]);

  useEffect(() => {
    const getReader = async () => {
      const readerData = await fetchReaderById(readerId);
      setReader(readerData);
    };

    getReader();
  }, [readerId]);

  const navegate = useNavigate();
  const goToReaderSettings = () => {
    navegate(`/settings/${reader._Id}`);
  };

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };
  // Calculating the total of each type icons

  const {
    favoriteBooks: readerFavoriteBooks = [],
    bookmarkedBooks = [],
    completedBooks = [],
  } = reader || {};
  const totalFavorites = readerFavoriteBooks.length;
  const totalBookmarked = bookmarkedBooks.length;
  const totalCompleted = completedBooks.length;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {reader && (
        <Container>
          <Card className="shadow-sm p-4 bg-white">
            <Row>
              <Col md={3} className="text-center">
                <Card.Img
                  src={reader.picture}
                  alt={reader.name}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              <Col md={9} className="text-start">
                {/* <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold">{reader.name}</h2>
                    <p className="text-muted">ID: {reader._Id}</p>
                  </div>
                   {/* icons with totals */}
                {/* <div className="mt-4 d-flex justify-content-start gap-3"> */}
                {/* <div className="d-flex gap-3">
                   <div>
                    <FaHeart style={{ color: "red", fontSize: "1.5rem" }} />
                    <span className="ms-2">{totalFavorites}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaBookmark style={{ color: "blue", fontSize: "1.5rem" }} />
                    <span className="ms-2">{totalBookmarked}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaBook style={{ color: "green", fontSize: "1.5rem" }} />
                    <span className="ms-2">{totalCompleted}</span>
                  </div>
                </div> */}
                {/* Follow Button */}
                {/* </div> */}
                {/* <div>
                  <Button variant="primary" onClick={goToReaderSettings}>Follow</Button>
                  </div>
                </div> */}
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold">{reader.name}</h2>
                    {/* <p className="text-muted">ID: {reader._Id}</p> */}
                  </div>

                  {/* Icons with totals and Follow Button */}
                  <div className="d-flex flex-column align-items-end gap-3">
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center">
                        <FaHeart style={{ color: "red", fontSize: "1.5rem" }} />
                        <span className="ms-2">{totalFavorites}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaBookmark
                          style={{ color: "blue", fontSize: "1.5rem" }}
                        />
                        <span className="ms-2">{totalBookmarked}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaBook
                          style={{ color: "green", fontSize: "1.5rem" }}
                        />
                        <span className="ms-2">{totalCompleted}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button variant="primary" onClick={handleFollowButton}>
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Favorite Books */}
                <div
                  className="mt-4"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                 <h5 className="fw-bold">Favorite Books</h5>
                    {favoriteBooks.length > 0 ? (
                      favoriteBooks.map((title, index) => (
                        <p key={index}>{title}</p>
                      ))
                    ) : (
                      <p>No favorite books listed.</p>
                    )}
                </div>

                {/* Bookmarked Books */}
                <div className="mt-4">
                  <h5 className="fw-bold">Bookmarked Books</h5>
                  <p>
                    {reader.bookmarkedBooks?.join(", ") ||
                      "No bookmarked books listed."}
                  </p>
                </div>

                {/* Completed Books */}
                <div className="mt-4">
                  <h5 className="fw-bold">Completed Books</h5>
                  <p>
                    {reader.completedBooks?.join(", ") ||
                      "No completed books listed."}
                  </p>
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
