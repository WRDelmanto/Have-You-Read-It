import { Container, Navbar } from "react-bootstrap";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBarSimplified = () => {
  return (
    <Navbar className="shadow-sm fixed-top" style={{ backgroundColor: "white" }}>
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBook className="text-primary me-2" size={24} />
          <span className="fw-bold">HaveYouReadIt</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarSimplified;
