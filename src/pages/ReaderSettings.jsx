import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Image, Modal } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavBar from "../components/NavBar.jsx";

const ReaderSettings = () => {
  const [accountReader, setAccountReader] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const reader = JSON.parse(localStorage.getItem("reader"));

    if (!reader) {
      window.location.href = "/";
      return;
    }

    setAccountReader(reader);
    setName(reader.name);
    setProfilePhoto(reader.picture || "");
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedReader = { ...accountReader, picture: reader.result };
      setProfilePhoto(reader.result);
      accountReader.picture = reader.result;
      setAccountReader(updatedReader);
      // localStorage.setItem("reader", JSON.stringify(updatedReader));
      confirmSave();
    };

    reader.readAsDataURL(file);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Moderate";
    return "Weak";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
      setPasswordStrength(evaluatePasswordStrength(value));
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSave = async () => {
    if (changePassword && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    } else if (changePassword) {
      accountReader.password = password;
    }

    accountReader.name = name;

    try {
      const response = await fetch(`/api/updateReader/${accountReader._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountReader),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error updating reader.");
        return;
      }

      localStorage.setItem("reader", JSON.stringify(data.reader));
      alert("Settings saved successfully.");
      setShowModal(false);
      setChangePassword(false);
    } catch (error) {
      console.error("Error updating reader:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="shadow-sm p-4">
                <h2 className="text-center mb-4">Settings</h2>
                <div className="text-center mb-4">
                  <Image
                    src={accountReader?.picture || "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png"}
                    roundedCircle
                    width={120}
                    height={120}
                    className="mb-2" />
                  <div>
                    <Button variant="outline-secondary" size="sm" onClick={() => document.getElementById("fileInput").click()}>
                      Change Photo
                    </Button>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePictureChange}
                      id="fileInput"
                      className="d-none"
                    />
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label><FaUser className="me-2" />Name</Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label><FaEnvelope className="me-2" />Email address</Form.Label>
                    <p className="form-control-plaintext text-muted">{accountReader?.email}</p>
                    <Button variant="link" size="sm" className="ps-0" disabled>Request Change (coming soon)</Button>
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                    <Button variant="outline-primary" size="sm" onClick={() => setChangePassword(!changePassword)}>
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to apply these settings changes?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmSave}>
              Confirm Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ReaderSettings;
