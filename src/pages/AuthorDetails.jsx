import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import OpenLibraryAPI from "../services/OpenLibraryAPI.js";
import { fetchPostsByBookId } from "../services/MockAPI.js";
import PostCard from "../components/PostCard.jsx";

const AuthorDetails = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const getAuthor = async () => {
      const author = await OpenLibraryAPI.getAuthorById(authorId);
      setAuthor(author);

      console.log("Author:", author);
    };

    getAuthor();
  }, [authorId]);

  useEffect(() => {
    if (!author?.authorName) return;

    const getBooks = async () => {
      const booksData = await OpenLibraryAPI.getBooksByAuthorName(
        author.authorName
      );
      setBooks(booksData);

      console.log("Books:", booksData); // This is the list of books by the author
    };

    getBooks();
  }, [author?.authorName]);

  // new   by Fabricio
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const allPosts = await fetchPostsByBookId(); // get all posts
  //     setPosts(allPosts);
  //     console.log("All posts:", allPosts);
  //   };

  //   getPosts();
  // }, []);

  // useEffect(() => {
  //   if (books.length === 0 || posts.length === 0) return;

  //   // filter posts by books written by the author
  //   const filteredPosts = posts.filter((post) => {
  //     return books.some((book) => book.title === post.book.title); // check if the book is written by the author
  //   });

  //   setFilteredPosts(filteredPosts); // set the filtered posts
  // }, [books, posts]);

  // end new by fabricio

  // const goToAuthorSettings = () => {
  //   navigate(`/settings/${author.authorId}`);
  // };

  const handleFollowButton = () => {
    setIsFollowing(!isFollowing);
  };

  const visibleBooks = books.slice(0, visibleCount);

  // Calculating the total of each type icons
  // const {
  //   favoriteBooks: authorFavoriteBooks = [],
  //   bookmarkedBooks = [],
  //   completedBooks = [],
  // } = author || {};
  // const totalFavorites = authorFavoriteBooks.length;
  // const totalBookmarked = bookmarkedBooks.length;
  // const totalCompleted = completedBooks.length;

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      {author && (
        <Container
          className="d-flex flex-column min-vh-100"
          style={{ marginTop: "64px", maxWidth: "100%" }}
        >
          <Card className="shadow-sm p-4 bg-white shadow-lg">
            <Row className="align-items-center mb-2">
              {/* Author imagem */}
              <Col md={3} className="text-center">
                <Card.Img
                  src={author.authorImage}
                  alt={author.authorName}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Col>

              {/* Author name */}
              <Col md={6} className="text-start">
                <h2 className="fw-bold">{author.authorName}</h2>
              </Col>

              {/* Button follow */}
              <Col md={3} className="text-center">
                <Button variant="primary" onClick={handleFollowButton}>
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Col>
            </Row>

            {/* <div
                  className="mt-4"
                  style={{ borderTop: "1px solid #dcdcdc", paddingTop: "10px" }}
                >
                  <h5 className="fw-bold">About the author</h5>
                  <p>
                    Mel Robbins is the creator and host of the award-winning{" "}
                    <strong>The Mel Robbins Podcast</strong>, one of the most
                    successful podcasts in the world, and a{" "}
                    <strong>#1 New York Times</strong> bestselling author. She
                    has amassed 22 million followers online and is considered
                    the most sought-after expert in life improvement, mindset,
                    and behavior change. The Wall Street Journal calls her a
                    “billion-view podcaster” and TIME Magazine says she gives
                    millions of listeners around the globe “a reason to believe
                    in themselves.”
                  </p>
                  <p>
                    Her books have been translated into 50 languages and include
                    the{" "}
                    <strong>#1 New York Times, #1 Amazon, #1 Audible,</strong>{" "}
                    and <strong>#1 Sunday Times</strong> bestselling{" "}
                    <em>The Let Them Theory</em>, which is the most successful
                    non-fiction book launch in history, with over 1.2 million
                    copies sold within a month of its release date. She is also
                    the author of the multimillion-copy-selling{" "}
                    <em>The 5 Second Rule</em>, <em>The High 5 Habit</em>, and
                    seven #1 audiobook releases on Audible.
                  </p>
                </div> */}
            {/* Author Books */}
            <Row>
              <Col className="text-start">
                <div
                  className="mt-4 p-4"
                  style={{
                    borderTop: "1px solid #dcdcdc",
                    paddingTop: "10px",
                    paddingLeft: "20px",
                  }}
                >
                  <h5 className="fw-bold">Author's Books</h5>
                  {visibleBooks.map((book) => (
                    <Card key={book.bookId} className="shadow-sm mb-3">
                      <Row className="g-0">
                        <Col md={4}>
                          <Card.Img
                            src={
                              book.cover || "https://via.placeholder.com/150"
                            }
                            alt={book.title}
                            className="img-fluid"
                            style={{
                              height: "250px",
                              objectFit: "contain",
                              width: "150px",
                              cursor: "pointer",
                            }}
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>
                              <strong>Autor:</strong>{" "}
                              {author?.authorName || "Desconhecido"}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}

                  {/* Button"Read More" */}
                  {visibleCount < books.length && (
                    <div className="text-center mt-3">
                      <Button
                        variant="info"
                        onClick={() => setVisibleCount(visibleCount + 6)}
                      >
                        Read More
                      </Button>
                    </div>
                  )}

                  {/* <h5 className="fw-bold">Posts about this author</h5>
                  {filteredPosts.length > 0 &&
                    filteredPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))} */}
                  {/* <p>"show list of bookswritten by this author "</p> */}
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default AuthorDetails;
