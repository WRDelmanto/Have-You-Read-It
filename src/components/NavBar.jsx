import { useRef, useState } from "react";
import { Container, Form, Image, InputGroup, ListGroup, Navbar, NavDropdown } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { FaBook, FaBookReader, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import OpenLibraryAPI from "../services/OpenLibraryAPI";

const NavBar = () => {
  const ACCOUNT_READER_ID = "754368128"; // For testing purposes
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBoxReference = useRef(null);

  // Handle input change
  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchQuery(searchInput);

    if (searchInput.length > 0) {
      const filtered = OpenLibraryAPI.getBooksByTitle(searchInput.replace(" ", "+"));

      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }

    console.log("Search query:", searchInput);
  };

  const handleClickOutsideSearchBox = (event) => {
    if (searchBoxReference.current && !searchBoxReference.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  const handleSignOut = () => {
    console.log("Signing out...");
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
            {showResults && results.length > 0 && (
              <ListGroup
                className="position-absolute w-100 bg-white shadow rounded mt-5"
                style={{ zIndex: 1000 }}
              >
                {results.map((book) => (
                  <ListGroup.Item
                    key={book.id}
                    as={Link}
                    to={`/book/${book.id}`}
                    className="d-flex align-items-center"
                    action
                  >
                    <Image src={book.image} rounded width={40} height={60} className="me-3" />
                    <div className="d-flex flex-column align-items-start">
                      <strong>{book.title}</strong>
                      <div className="text-muted" style={{ fontSize: "12px" }}>{book.author}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>

          {/* User Dropdown */}
          <NavDropdown title={<FaBookReader size={24} />}>
            <NavDropdown.Item as={Link} to={`/reader/${ACCOUNT_READER_ID}`}>
              <FaUser className="me-2" /> Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={`/settings/${ACCOUNT_READER_ID}`}>
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
