import { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavbarSimplified from "../components/NavBarSimplified.jsx";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    if (localStorage.getItem("reader")) {
      window.location.href = "/home";
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signin failed.");
        return;
      }

      localStorage.setItem("reader", JSON.stringify(data.accountReader));
      window.location.href = "/home";
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        <NavbarSimplified />
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
         <Container>
            <Row className="align-items-center justify-content-center">
              <Col lg={6} className="mb-5 text-center text-lg-start">
                <h1 className="display-4 fw-bold text-black d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                  <img src="/icon.png" alt="App Icon" width="100" height="100" />
                  HaveYouReadIt
                </h1>
                <p className="fs-4 text-secondary">
                  HaveYouReadIt helps you connect and share with people who love reading as much as you do.
                </p>
              </Col>
              <Col lg={5}>
                <Card className="shadow-sm p-4">
                  <h2 className="mb-4 text-center">Sign In</h2>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="fw-semibold">
                        <FaUser className="me-2" />
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className="fw-semibold">
                        <FaLock className="me-2" />
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <div className="text-end mb-3">
                      <Link to="/forgot-password" className="text-decoration-none">
                        Forgot password?
                      </Link>
                    </div>
                    <Button type="submit" className="w-100 btn btn-primary">
                      Sign In
                    </Button>
                    <hr />
                    <div className="d-grid mt-3">
                      <Link to="/signup">
                        <Button variant="success" className="w-100">
                          Create new account
                        </Button>
                      </Link>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default SignIn;
