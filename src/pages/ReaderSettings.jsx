import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavBarSimplified from "../components/NavBarSimplified.jsx";

class ReaderSettings extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  componentDidMount() {
    const reader = JSON.parse(localStorage.getItem("reader"));
    if (!reader) {
      window.location.href = "/";
      return;
    }

    this.setState({
      name: reader.name || "",
      email: reader.email || "",
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved.");
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <>
        <NavBarSimplified />
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <Card className="shadow-sm p-4">
                  <h2 className="text-center mb-4">Settings</h2>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label><FaUser className="me-2" />Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label><FaEnvelope className="me-2" />Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        disabled
                        className="text-muted"
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label><FaLock className="me-2" />New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter a new password"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Save Changes
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

export default ReaderSettings;
