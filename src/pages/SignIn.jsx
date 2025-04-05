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
        {/* NavBarSimplified */}
        <NavbarSimplified />

        {/* Sign-In Form */}
        <Container
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{ marginTop: "64px" }}
        >
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={4}>
              <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Sign In</h2>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>
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
                    <Form.Label>
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete=""
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Forgot Password Link */}
                  <div className="text-end mb-3">
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>

                  <Button variant="primary" type="submit" className="w-100">
                    Sign In
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SignIn;
