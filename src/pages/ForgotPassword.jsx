import { Component } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import NavBarSimplified from "../components/NavBarSimplified.jsx";

class ForgotPassword extends Component {
  state = {
    email: "",
    submitted: false,
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", this.state.email);
    this.setState({ submitted: true });

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  render() {
    const { email, submitted } = this.state;

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
                  Enter your email and we'll send you a link to reset your password and get back to your books.
                </p>
              </Col>
              <Col lg={5}>
                <Card className="shadow-sm p-4">
                  <h2 className="text-center mb-4">Forgot Password</h2>
                  {submitted ? (
                    <Alert variant="success">
                      If this email is registered, a reset link has been sent.
                    </Alert>
                  ) : (
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label>
                          <FaEnvelope className="me-2" />
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Send Reset Link
                      </Button>
                    </Form>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
