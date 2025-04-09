import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ post, shouldHideBook }) => {
  const [accountReader, setAccountReader] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const reader = localStorage.getItem("reader");

    if (!reader) {
      navigate("/");
      return;
    }

    const accountReader = JSON.parse(reader);
    setAccountReader(accountReader);
  }, [navigate]);

  const handleFavorite = async (bookID) => {
    if (accountReader.favoriteBooks.includes(bookID)) {
      const index = accountReader.favoriteBooks.indexOf(bookID);
      accountReader.favoriteBooks.splice(index, 1);
    } else {
      accountReader.favoriteBooks.push(bookID);
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
      following
    } = accountReader;

    const updateResponse = await fetch(`/api/updateReader/${accountReader._id}`, {
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
        following
      }),
    });

    // console.log("Updated bookId: " + bookID + " to favorite: " + accountReader.favoriteBooks.includes(bookID));
  };

  const handleBookmark = async (bookID) => {
    if (accountReader.bookmarkedBooks.includes(bookID)) {
      const index = accountReader.bookmarkedBooks.indexOf(bookID);
      accountReader.bookmarkedBooks.splice(index, 1);
    } else {
      accountReader.bookmarkedBooks.push(bookID);
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
      following
    } = accountReader;

    const updateResponse = await fetch(`/api/updateReader/${accountReader._id}`, {
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
        following
      }),
    });

    // console.log("Updated bookId: " + bookID + " to bookmarked: " + accountReader.bookmarkedBooks.includes(bookID));
  };

  const handleCompleted = async (bookID) => {
    if (accountReader.completedBooks.includes(bookID)) {
      const index = accountReader.completedBooks.indexOf(bookID);
      accountReader.completedBooks.splice(index, 1);
    } else {
      accountReader.completedBooks.push(bookID);
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
      following
    } = accountReader;

    const updateResponse = await fetch(`/api/updateReader/${accountReader._id}`, {
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
        following
      }),
    });

    // console.log("Updated bookId: " + bookID + " to completed: " + accountReader.completedBooks.includes(bookID));
  };

  return (
    <Card className="h-100 book-card border-0 shadow-lg">
      <div className="d-flex">

        {/* Book cover with hover effect */}
        {!shouldHideBook && (
          <Card.Img
            src={post.book.cover}
            alt={post.book.title}
            style={{
              height: "250px",
              objectFit: "contain",
              width: "150px",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={() => navigate(`/book/${post.book.bookId}`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        )}

        {/* Body content */}
        <div className="d-flex flex-column ms-3 w-100">
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-start flex-column">
              {/* Title */}
              {!shouldHideBook && (
                <Link
                  to={`/book/${post.book.bookId}`}
                  className="text-decoration-none"
                >
                  <Card.Title
                    className="h5 text-dark mt-1 mb-2"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {post.book.title}
                  </Card.Title>
                </Link>
              )}

              {/* Author */}
              {!shouldHideBook && (
                <Link
                  to={`/author/${post.book.authorId}`}
                  className="text-decoration-none text-primary"
                >
                  <Card.Subtitle
                    className="mb-4"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {post.book.authorName}
                  </Card.Subtitle>
                </Link>
              )}

              {/* Reader */}
              <div
                className="d-flex flex-row mb-2"
                onClick={() => navigate(`/reader/${post.reader._id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <Card.Img
                  src={post.reader?.picture || "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png"}
                  alt={post.reader?.name}
                  style={{
                    height: "30px",
                    objectFit: "contain",
                    width: "30px",
                    borderRadius: "50%",
                  }}
                />
                <Card.Title className="h5 text-dark ms-2">
                  {post.reader?.name || "Anonymous"}
                </Card.Title>
              </div>

              <div className="d-flex flex-column align-items-start">
                {/* Title */}
                <div className="h6 text-dark mb-1" style={{ textAlign: "left" }}>{post.title}</div>
                {/* Description */}
                <div className="h6 text-muted mb-1" style={{ textAlign: "left" }}>{post.description}</div>
              </div>
            </div>

            {/* Favorite, bookmarked, and completed buttons */}
            <div className="d-flex flex-row">
              <button
                className="btn btn-link p-0 me-2"
                onClick={() => handleFavorite(post.book.bookId)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {accountReader?.favoriteBooks.includes(post.book.bookId) ? (
                  <FaHeart
                    size={22}
                    style={{
                      color: "red",
                      transition: "0.3s",
                    }}
                  />
                ) : (
                  <FaRegHeart
                    size={22}
                    style={{
                      color: "red",
                      transition: "0.3s",
                    }}
                  />
                )}
              </button>
              <button
                className="btn btn-link p-0 me-2"
                onClick={() => handleBookmark(post.book.bookId)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {accountReader?.bookmarkedBooks.includes(post.book.bookId) ? (
                  <FaBookmark
                    size={22}
                    style={{
                      transition: "0.3s",
                    }}
                  />
                ) : (
                  <FaRegBookmark
                    size={22}
                    style={{
                      transition: "0.3s",
                    }}
                  />
                )}
              </button>
              <button
                className="btn btn-link p-0"
                onClick={() => handleCompleted(post.book.bookId)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {accountReader?.completedBooks.includes(post.book.bookId) ? (
                  <FaBook
                    size={22}
                    style={{
                      transition: "0.3s",
                      color: "green",
                    }}
                  />
                ) : (
                  <FaBook
                    size={22}
                    style={{
                      transition: "0.3s",
                      color: "white",
                      stroke: "green",
                      strokeWidth: "20px",
                    }}
                  />
                )}
              </button>
            </div>
          </div>
          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="d-flex flex-column mt-4 align-items-start">
              <Card.Subtitle className="text-muted">Comments:</Card.Subtitle>
              {post.comments.map((comment) => (
                <div key={comment._Id} className="mt-2 text-muted">
                  <Card.Img
                    src={comment.reader?.picture || "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png"}
                    alt={comment.reader?.name}
                    onClick={() => navigate(`/reader/${comment.reader._Id}`)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    style={{
                      cursor: "pointer",
                      height: "30px",
                      objectFit: "contain",
                      width: "30px",
                      borderRadius: "50%",
                      transition: "0.3s ease-in-out",
                    }}
                  />
                  <span className="ms-2">{comment.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
