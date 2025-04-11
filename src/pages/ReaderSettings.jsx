import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Image } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavBarSimplified from "../components/NavBarSimplified.jsx";

class ReaderSettings extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    profilePhoto: "",
  };

  componentDidMount() {
    const reader = JSON.parse(localStorage.getItem("reader"));
    const defaultPhoto = "/default-avatar.png";
    if (!reader) {
      window.location.href = "/";
      return;
    }

    this.setState({
      name: reader.name || "",
      email: reader.email || "",
      profilePhoto: reader.picture || defaultPhoto,
    });
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ profilePhoto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const reader = JSON.parse(localStorage.getItem("reader"));
    const updatePayload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      picture: this.state.profilePhoto,
    };

    try {
      const response = await fetch(`/api/updateReader/${reader._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error updating reader.");
        return;
      }

      localStorage.setItem("reader", JSON.stringify(data.reader));
      alert("Settings saved successfully.");
    } catch (error) {
      console.error("Error updating reader:", error);
      alert("Something went wrong.");
    }
  };

  render() {
    const { name, email, password, profilePhoto } = this.state;

    return (
      <>
        <NavBarSimplified />
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <Card className="shadow-sm p-4">
                  <h2 className="text-center mb-4">Settings</h2>
                  <div className="text-center mb-4">
                    <Image
                      src={profilePhoto}
                      roundedCircle
                      width={120}
                      height={120}
                      className="mb-2"
                    />
                    <div>
                      <Button variant="outline-secondary" size="sm" onClick={() => this.fileInput.click()}>
                        Change Photo
                      </Button>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={this.handleFileChange}
                        ref={(ref) => (this.fileInput = ref)}
                        className="d-none"
                      />
                    </div>
                  </div>
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
