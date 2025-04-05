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

        <Container
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{ marginTop: "64px" }}
        >
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={4}>
              <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Forgot Password</h2>

                {submitted ? (
                  <Alert variant="success">
                    If this email is registered, a reset link has been sent.
                  </Alert>
                ) : (
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
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
      </>
    );
  }
}

export default ForgotPassword;
