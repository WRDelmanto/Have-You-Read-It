import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaBook, FaBookmark, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard";

const ReaderDetails = () => {
  const { readerId } = useParams();
  const [accountReader, setAccountReader] = useState(null);
  const [reader, setReader] = useState(null);
  const [posts, setPosts] = useState([]);
  const [favoritedBooks, setFavoritedBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const reader = localStorage.getItem("reader");

    if (!reader) {
      navigate("/");
      return;
    }

    const accountReader = JSON.parse(reader);
    setAccountReader(accountReader);

    const fetchData = async () => {
      try {
        const readerResponse = await fetch(`/api/reader/${readerId}`);
        const readerData = await readerResponse.json();

        if (!readerResponse.ok) {
          alert(readerData.error || "Failed to fetch reader data.");
          return;
        }

        setReader(readerData.reader);
        // console.log("Reader: ", readerData.reader);

        const response = await fetch(`/api/postsFromReaderId/${readerId}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Failed to fetch posts.");
          return;
        }

        const postsData = data.posts || [];

        // console.log("Posts: ", postsData);

        setPosts(postsData);

        const favoriteBooks = readerData.reader.favoriteBooks ?? [];
        const bookmarkedBooks = readerData.reader.bookmarkedBooks ?? [];
        const completedBooks = readerData.reader.completedBooks ?? [];

        const fetchBookById = async (bookId) => {
          const response = await fetch(`/api/book/${bookId}`);
          const data = await response.json();
          return data.book;
        };

        const [favoritedBooksList, bookmarkedBooksList, completedBooksList] =
          await Promise.all([
            Promise.all(favoriteBooks.map(fetchBookById)),
            Promise.all(bookmarkedBooks.map(fetchBookById)),
            Promise.all(completedBooks.map(fetchBookById)),
          ]);

        setFavoritedBooks(favoritedBooksList);
        setBookmarkedBooks(bookmarkedBooksList);
        setCompletedBooks(completedBooksList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleFollow = async () => {
    if (!accountReader.following.readers) return;

    if (accountReader.following.readers.includes(reader._id)) {
      const index = accountReader.following.readers.indexOf(reader._id);
      accountReader.following.readers.splice(index, 1);
    } else {
      accountReader.following.readers.push(reader._id);
    }

    setAccountReader({ ...accountReader });

    localStorage.setItem("reader", JSON.stringify(accountReader));

    const {
      _id,
      name,
      email,
      password,
      picture,
      bookmarkedBooks,
      favoriteBooks,
      completedBooks,
      following,
    } = accountReader;

    const updateResponse = await fetch(
      `/api/updateReader/${accountReader._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          picture,
          bookmarkedBooks,
          favoriteBooks,
          completedBooks,
          following,
        }),
      }
    );

    // console.log("Updated readerId: " + reader._id + " to favorite: " + accountReader.following.readers.includes(readerId));
  };

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      {reader && (
        <Container
          className="d-flex flex-column min-vh-100"
          style={{ marginTop: "64px", maxWidth: "100%" }}
        >
          <Card className="shadow-sm p-4 bg-white shadow-lg align-items-center" >
            <Row style={{ minWidth: "80%" }}>
              <Col md={12} className="text-start">
                {/* Reader Info */}
                <div className="d-flex align-items-center gap-4 mb-4">
                  <div>
                    <Card.Img
                      src={
                        reader.picture ||
                        "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png"
                      }
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
                  </div>
                  {accountReader._id !== reader._id && (
                    <div className="ms-auto">
                      <Button variant="primary" onClick={handleFollow}>
                        {accountReader.following.readers.includes(reader._id)
                          ? "Following"
                          : "Follow"}
                      </Button>
                    </div>
                  )}
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
                    <h5 className="fw-bold">
                      Favorite ( {(reader?.favoriteBooks ?? []).length} )
                    </h5>
                  </div>
                  {favoritedBooks.map((book) => (
                    <div
                      key={book.bookId}
                      onClick={() => navigate(`/book/${book.bookId}`)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.01)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      style={{
                        paddingTop: "6px",
                        paddingLeft: "40px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {book.title}
                    </div>
                  ))}
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
                    <h5 className="fw-bold">
                      Bookmarked ( {(reader?.bookmarkedBooks ?? []).length} )
                    </h5>
                  </div>
                  {bookmarkedBooks.map((book) => (
                    <div
                      key={book.bookId}
                      onClick={() => navigate(`/book/${book.bookId}`)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.01)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      style={{
                        paddingTop: "6px",
                        paddingLeft: "40px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {book.title}
                    </div>
                  ))}
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
                    <h5 className="fw-bold">
                      Completed ( {(reader?.completedBooks ?? []).length} )
                    </h5>
                  </div>
                  {completedBooks.map((book) => (
                    <div
                      key={book.bookId}
                      onClick={() => navigate(`/book/${book.bookId}`)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.01)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      style={{
                        paddingTop: "6px",
                        paddingLeft: "40px",
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {book.title}
                    </div>
                  ))}
                </div>

                {/* Reader Posts */}
                {posts.length > 0 && (
                  <div
                    className="d-flex flex-column mt-1 gap-3"
                    style={{
                      borderTop: "1px solid #dcdcdc",
                      paddingTop: "10px",
                    }}
                  >
                    <h5 className="fw-bold">Posts</h5>
                    {posts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default ReaderDetails;
