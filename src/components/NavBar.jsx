import { useRef, useState, useEffect } from "react";
import { Container, Form, Image, InputGroup, ListGroup, Navbar, NavDropdown } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { FaBook, FaBookReader, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import OpenLibraryAPI from "../services/OpenLibraryAPI";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [accountReader, setAccountReader] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [booksResults, setBookResults] = useState([]);
  const [authorResult, setAuthorResults] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchBoxReference = useRef(null);
  const searchTimeout = useRef(null);

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

  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchQuery(searchInput);

    console.log("Search query:", searchInput);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      if (searchInput.length > 0) {
        const filteredAuthor = await OpenLibraryAPI.getAuthorByName(searchInput.replaceAll(" ", "+")) || "";
        setAuthorResults(filteredAuthor);

        const filteredBooks = await OpenLibraryAPI.getBooksByTitle(searchInput.replaceAll(" ", "+")) || [];

        setBookResults(filteredBooks);
        setShowResults(filteredAuthor.length > 0 || filteredBooks.length > 0);

        // console.log("Filtered author:", filteredAuthor);
        // console.log("Filtered books:", filteredBooks);
      } else {
        setBookResults([]);
        setShowResults(false);
      }
    }, 500);
  };

  const handleClickOutsideSearchBox = (event) => {
    if (searchBoxReference.current && !searchBoxReference.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  const handleSignOut = () => {
    console.log("Signing out...");

    localStorage.removeItem("reader");
    navigate("/");
  };

  document.addEventListener("mousedown", handleClickOutsideSearchBox);

  return (
    <Navbar className="shadow-sm fixed-top" style={{ backgroundColor: "white" }}>
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBook className="text-primary me-2" size={24} />
          <span className="fw-bold">HaveYouReadIt</span>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search Box */}
          <Form className="d-flex mx-auto position-relative" style={{ minWidth: "600px", maxWidth: "750px" }} ref={searchBoxReference}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search for books, authors, or readers..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setShowResults(true)}
              />
            </InputGroup>

            {/* Floating Search Results */}
            {showResults && (
              <ListGroup
                className="position-absolute w-100 bg-white shadow rounded mt-5"
                style={{ zIndex: 1000 }}
              >
                {
                  authorResult && (
                    <ListGroup.Item
                      key={authorResult.authorId}
                      as={Link}
                      to={`/author/${authorResult.authorId}`}
                      className="d-flex align-items-center"
                      action
                    >
                      <Image src={authorResult.authorImage} roundedCircle width={40} height={40} className="me-3" />
                      <div className="d-flex flex-column align-items-start">
                        <strong>{authorResult.authorName}</strong>
                      </div>
                    </ListGroup.Item>
                  )
                }
                {booksResults.map((book) => (
                  <ListGroup.Item
                    key={book.bookId}
                    as={Link}
                    to={`/book/${book.bookId}`}
                    className="d-flex align-items-center"
                    action
                  >
                    <Image src={book.cover} rounded width={40} height={60} className="me-3" />
                    <div className="d-flex flex-column align-items-start">
                      <strong>{book.title}</strong>
                      <div className="text-muted" style={{ fontSize: "12px" }}>{book.authorName}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>

          {/* User Dropdown */}
          <NavDropdown title={<FaBookReader size={24} />}>
            <NavDropdown.Item as={Link} to={`/reader/${accountReader?._id}`}>
              <FaUser className="me-2" /> Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={`/settings/${accountReader?._id}`}>
              <AiFillSetting className="me-2" /> Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleSignOut}>
              <FaSignOutAlt className="me-2" /> Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
