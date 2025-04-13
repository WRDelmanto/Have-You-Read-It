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
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
         <Container>
            <Row className="align-items-center justify-content-center">
              <Col lg={6} className="mb-5 text-center text-lg-start">
                <h1 className="display-4 fw-bold text-black d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                  <img src="/icon.png" alt="App Icon" width="100" height="100" />
                  HaveYouReadIt
                </h1>
                <p className="fs-4 text-secondary">
                  Join HaveYouReadIt to discover, share, and enjoy books with other passionate readers.
                </p>
              </Col>
              <Col lg={5}>
                <Card className="shadow-sm p-4">
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
                    <Button type="submit" variant="primary" className="w-100 mb-3">
  Sign Up
</Button>
<Button
  variant="outline-secondary"
  className="w-100"
  onClick={() => (window.location.href = "/signin")}
>
  Already have an account? Sign In
</Button>

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

export default SignUp;
