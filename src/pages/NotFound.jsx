import { Link } from "react-router-dom";
import { FaBook, FaHome } from "react-icons/fa";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div>
      <FaBook className="text-primary mb-4" size={60} />
      <h1 className="display-4">404</h1>
      <br />
      <h2>Page Not Found</h2>
      <p className="lead">
        Oops! The page you're looking for seems to have been misplaced on our
        bookshelf.
      </p>
      <br />
      <div className="d-flex justify-content-center gap-3">
        <Button as={Link} to="/" className="d-flex align-items-center">
          <FaHome className="me-2" /> Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
