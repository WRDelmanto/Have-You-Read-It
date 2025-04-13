import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Image, Modal } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavBarSimplified from "../components/NavBarSimplified.jsx";

class ReaderSettings extends Component {
  state = {
    name: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
    changePassword: false,
    passwordStrength: "",
    showModal: false,
    lastUpdated: null,
  };

  componentDidMount() {
    const reader = JSON.parse(localStorage.getItem("reader"));
    if (!reader) {
      window.location.href = "/";
      return;
    }

    this.setState({
      name: reader.name || "",
      displayName: reader.displayName || reader.name || "",
      email: reader.email || "",
      profilePhoto: reader.picture || "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png",
      lastUpdated: reader.updatedAt || null,
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

  evaluatePasswordStrength = (password) => {
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Moderate";
    return "Weak";
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({
      [name]: val,
      ...(name === "password" ? { passwordStrength: this.evaluatePasswordStrength(value) } : {}),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  confirmSave = async () => {
    const reader = JSON.parse(localStorage.getItem("reader"));
    const { name, displayName, email, password, confirmPassword, profilePhoto, changePassword } = this.state;

    if (changePassword && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const updatePayload = {
      name,
      displayName,
      email,
      picture: profilePhoto,
    };

    if (changePassword && password) {
      updatePayload.password = password;
    }

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
      this.setState({ showModal: false });
    } catch (error) {
      console.error("Error updating reader:", error);
      alert("Something went wrong.");
    }
  };

  render() {
    const { name, displayName, email, password, confirmPassword, profilePhoto, changePassword, passwordStrength, showModal, lastUpdated } = this.state;

    return (
      <>
        <NavBarSimplified />
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <Card className="shadow-sm p-4">
                  <h2 className="text-center mb-4">Settings</h2>
                  {lastUpdated && (
                    <p className="text-muted text-center mb-3" style={{ fontSize: "0.85rem" }}>
                      Last updated on {new Date(lastUpdated).toLocaleString()}
                    </p>
                  )}
                  <div className="text-center mb-4">
                    <Image src={profilePhoto} roundedCircle width={120} height={120} className="mb-2" />
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
                      <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={name} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDisplayName">
                      <Form.Label><FaUser className="me-2" />Nickname (Display Name)</Form.Label>
                        <Form.Control
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="e.g., BookLover99"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label><FaEnvelope className="me-2" />Email address</Form.Label>
                      <p className="form-control-plaintext text-muted">{email}</p>
                      <Button variant="link" size="sm" className="ps-0" disabled>Request Change (coming soon)</Button>
                    </Form.Group>
                    <Form.Group className="mb-3 text-center">
                      <Button variant="outline-primary" size="sm" onClick={() => this.setState({ changePassword: !changePassword })}>
                        {changePassword ? "Cancel Password Change" : "Change Password"}
                      </Button>
                    </Form.Group>
                    {changePassword && (
                      <>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label><FaLock className="me-2" />New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter a new password"
                            onChange={this.handleChange}
                          />
                          {password && (
                            <small className="text-muted">Strength: {passwordStrength}</small>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formConfirmPassword">
                          <Form.Label><FaLock className="me-2" />Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Re-enter new password"
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </>
                    )}
                    <Button variant="primary" type="submit" className="w-100">
                      Save Changes
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Confirmation Modal */}
          <Modal show={showModal} onHide={() => this.setState({ showModal: false })} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Changes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to apply these settings changes?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.confirmSave}>
                Confirm Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default ReaderSettings;
