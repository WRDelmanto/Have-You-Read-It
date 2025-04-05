import { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavBarSimplified from "../components/NavBarSimplified.jsx";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed.");
        return;
      }

      localStorage.setItem("reader", JSON.stringify(data.accountReader));

      window.location.href = "/home";
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;

    return (
      <>
        <NavBarSimplified />

        <Container
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{ marginTop: "64px" }}
        >
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={5}>
              <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Create Account</h2>

                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>
                      <FaUser className="me-2" />
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your full name"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>
                      <FaEnvelope className="me-2" />
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

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete=""
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Sign Up
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

export default SignUp;
