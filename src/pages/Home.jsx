import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";

const Home = () => {
  const [accountReader, setAccountReader] = useState(null);
  const [posts, setPosts] = useState([]);

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
        const response = await fetch(`/api/postsByReaderId/${accountReader._id}`);
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

    fetchData();
  }, [navigate]);

  const handleFavorite = (bookID) => {
    if (accountReader.favoriteBooks.includes(bookID)) {
      const index = accountReader.favoriteBooks.indexOf(bookID);
      accountReader.favoriteBooks.splice(index, 1);
    } else {
      accountReader.favoriteBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    // console.log("Updated bookId: " + bookID + " to favorite: " + accountReader.favoriteBooks.includes(bookID));
  };

  const handleBookmark = (bookID) => {
    if (accountReader.bookmarkedBooks.includes(bookID)) {
      const index = accountReader.bookmarkedBooks.indexOf(bookID);
      accountReader.bookmarkedBooks.splice(index, 1);
    } else {
      accountReader.bookmarkedBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    // console.log("Updated bookId: " + bookID + " to bookmarked: " + accountReader.bookmarkedBooks.includes(bookID));
  };

  const handleCompleted = (bookID) => {
    if (accountReader.completedBooks.includes(bookID)) {
      const index = accountReader.completedBooks.indexOf(bookID);
      accountReader.completedBooks.splice(index, 1);
    } else {
      accountReader.completedBooks.push(bookID);
    }

    setAccountReader({ ...accountReader });
    // console.log("Updated bookId: " + bookID + " to completed: " + accountReader.completedBooks.includes(bookID));
  };

  const handlePostCreated = async (newPost) => {
    try {
      const { bookId, readerId, title, description } = newPost;

      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, readerId, title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Post creation failed.");
        return;
      }

      console.log("New post created: ", newPost);
    } catch (error) {
      console.error("Error during post creation:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Body */}
      <Container style={{ marginTop: "64px" }}>
        <Row className="g-4">
          {/* Create new post */}
          <CreatePost onPostCreated={handlePostCreated} />

          {/* Posts */}
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              isFavorite={accountReader.favoriteBooks.includes(post.book.bookId)}
              isBookmarked={accountReader.bookmarkedBooks.includes(post.book.bookId)}
              isCompleted={accountReader.completedBooks.includes(post.book.bookId)}
              handleFavorite={(bookID) => handleFavorite(bookID, post.book.title)}
              handleBookmark={(bookID) => handleBookmark(bookID, post.book.title)}
              handleCompleted={(bookID) => handleCompleted(bookID, post.book.title)}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
