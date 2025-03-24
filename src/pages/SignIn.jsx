import { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import NavBar from "../components/Navbar.jsx"; // assuming same location as in ReaderDetails

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    // TODO: Add your sign-in logic here
    console.log("Sign-in submitted:", email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        {/* Navigation Bar */}
        <NavBar />

        {/* Sign-In Form */}
        <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: "64px" }}>
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={4}>
              <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Sign In</h2>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label><FaUser className="me-2" />Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label><FaLock className="me-2" />Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>

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
