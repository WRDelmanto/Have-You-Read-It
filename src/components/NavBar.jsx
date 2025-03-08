import { useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import {
  FaBook,
  FaBookReader,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = ({ handleSearch, handleSignOut }) => {
  return (
    <Navbar className="shadow-sm fixed-top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBook className="text-primary me-2" size={24} />
          <span className="fw-bold">HaveYouReadIt</span>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Search */}
          <Form className="d-flex mx-auto" style={{ width: "500px" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search for books, authors, or readers..."
                onChange={(event) => handleSearch(event)}
              />
              <Button variant="outline-primary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>

          {/* Dropdown Menu */}
          <NavDropdown title={<FaBookReader size={24} />}>
            <NavDropdown.Item as={Link} to="/profileSettings">
              <FaUser className="me-2" /> Profile
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
