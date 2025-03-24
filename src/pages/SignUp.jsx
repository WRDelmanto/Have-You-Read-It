import { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import NavBar from "../components/Navbar.jsx";

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    // Example validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // TODO: Replace this with actual sign-up logic
    console.log("Sign up submitted:", { name, email, password });
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;

    return (
      <>
        <NavBar />

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
