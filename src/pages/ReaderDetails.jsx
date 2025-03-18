import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";

import { Button } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart } from "react-icons/fa";
import { fetchPostsByReaderId, fetchReaderById } from "../services/MockAPI.js";
import PostCard from "../components/PostCard";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [reader, setReader] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);

  useEffect(() => {
    const favoriteBooksByReader =
      JSON.parse(localStorage.getItem("favoriteBooksByReader")) || {};
    const favoriteBooksTitles = favoriteBooksByReader[readerId] || [];
    setFavoriteBooks(favoriteBooksTitles);
  }, [readerId]);

  useEffect(() => {
    const bookmarkedBooksByReader =
      JSON.parse(localStorage.getItem("bookmarkedBooksByReader")) || {};
    const bookmarkedTitles = bookmarkedBooksByReader[readerId] || [];
    setBookmarkedBooks(bookmarkedTitles);
  }, [readerId]);

  useEffect(() => {
    const completedBooksByReader =
      JSON.parse(localStorage.getItem("completedBooksByReader")) || {};
    const completedTitles = completedBooksByReader[readerId] || [];
    setCompletedBooks(completedTitles);
  }, [readerId]);

  useEffect(() => {
    const getReader = async () => {
      const readerData = await fetchReaderById(readerId);
      setReader(readerData);
      // setBookmarkedBooks(readerData.bookmarkedBooks || []);
      // setCompletedBooks(readerData.completedBooks || []);
    };

    const getPosts = async () => {
      const postsData = await fetchPostsByReaderId(readerId);
      setPosts(postsData);

      console.log("Posts: ", postsData); // This is the list of posts made by the reader
    };

    getReader().then(getPosts());
  }, [readerId]);

  // const navegate = useNavigate();
  // const goToReaderSettings = () => {
  //   navegate(`/settings/${reader._Id}`);
  // };

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };
  // Calculating the total of each type icons

  const {
    favoriteBooks: readerFavoriteBooks = [],
    bookmarkedBooks: readerBookmarkedBooks = [],
    completedBooks: readerCompletedBooks = [],
  } = reader || {};
  const totalFavorites = readerFavoriteBooks.length || 0;
  const totalBookmarked = readerBookmarkedBooks.length || 0;
  const totalCompleted = readerCompletedBooks.length || 0;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {reader && (
        <Container style={{ marginTop: "64px" }}>
          <Card className="shadow-sm p-4 bg-white shadow-lg align-items-center">
            <Row>
              {/* <Col md={3} className="text-center">
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
              </Col> */}

              <Col md={12} className="text-start">
                {/* Reader info */}
                <div className="d-flex justify-content-between align-items-center mb-4 ml-4 mr-4">
                  {/* <div className="d-flex justify-content-center align-items-center mb-4 ml-4 mr-4" style={{ gap: "100px" }}> */}
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
                    {/* <p className="text-muted">ID: {reader._Id}</p> */}
                  </div>

                  {/* Icons with totals and Follow Button */}
                  <div className="d-flex flex-column align-items-end gap-3">
                    {/* <div className="d-flex gap-3">
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
                    </div> */}

                    <div className="d-flex justify-content-start mb-3">
                      <Button variant="primary" onClick={handleFollowButton}>
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
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

                    <h5 className="fw-bold">Favorite Books</h5>
                    <span className="ms-2">
                      (<b> {totalFavorites} </b> )
                    </span>
                  </div>
                </div>
                <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                  {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((title, index) => (
                      <p key={index}>{title}</p>
                    ))
                  ) : (
                    <p>No favorite books listed.</p>
                  )}
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

                    <h5 className="fw-bold">Bookmarked Books</h5>
                    <span className="ms-2">
                      (<b> {totalBookmarked} </b>)
                    </span>
                  </div>
                  <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                    {/* {reader.bookmarkedBooks?.join(", ") ||
                        "No bookmarked books listed."} */}
                    {bookmarkedBooks.length > 0 ? (
                      bookmarkedBooks.map((title, index) => (
                        <p key={index}>{title}</p>
                      ))
                    ) : (
                      <p>No bookmarked books listed.</p>
                    )}
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

                    <h5 className="fw-bold">Completed Books</h5>
                    <span className="ms-2">
                      (<b> {totalCompleted} </b>)
                    </span>
                  </div>
                  <div style={{ paddingTop: "10px", paddingLeft: "40px" }}>
                    {/* {reader.completedBooks?.join(", ") ||
                        "No completed books listed."} */}
                    {completedBooks.length > 0 ? (
                      completedBooks.map((title, index) => (
                        <p key={index}>{title}</p>
                      ))
                    ) : (
                      <p>No completed books listed.</p>
                    )}
                  </div>
                </div>
                {/* reader posts */}
                <div
                  className="d-flex flex-column mt-4 gap-3"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">Posts</h5>
                  {/* {posts?.length > 0 && (
                    posts.map((post, index) => (
                      <div key={index} 
                     >
                        <h6>{post.title}</h6>
                        <p>{post.description}</p>
                        <small>
                          {new Date(post.timestamp).toLocaleString()}
                        </small>
                        <p>👍 {post.likes}</p>
                      </div>
                    ))
                 
                  )} */}
                  {posts?.length > 0 &&
                    posts.map((post, index) => (
                      <PostCard key={index} post={post} />
                    ))}
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
