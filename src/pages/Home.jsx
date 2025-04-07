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

  const handlePostCreated = async (newPost) => {
    try {
      const { bookId, authorId, readerId, title, description } = newPost;

      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, authorId, readerId, title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Post creation failed.");
        return;
      }

      console.log("New post created: ", data.post);

      const postsResponse = await fetch(`/api/postsByReaderId/${accountReader._id}`);
      const postsData = await postsResponse.json();

      if (!postsResponse.ok) {
        alert(postsData.error || "Failed to fetch posts.");
        return;
      }

      setPosts(postsData.posts || []);
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
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
