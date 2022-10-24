import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth} from "../firebase";
import { useNavigate } from "react-router-dom";
import {  updatePassword } from "firebase/auth";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
const [success, setSuccess] = useState('')

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/content/profile");
  };

   function handleUpdate(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    // const promises = [];
    // if (emailRef.current.value !== currentUser?.email) {
    //   promises.push(updateEmail1(emailRef.current.value));
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(passwordRef.current.value));
    // }

    updatePassword(currentUser?.email,passwordRef.current.value).then(() => {
        setSuccess('Account created successfully!')

      }).catch((error) => {
        setError('Email already exists!')

      });
    // Promise.all(promises)
    //   .then(() => {
    //     navigate("");
    //   })
    //   .catch(() => {
    //     setError("Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdate}>
                <Form.Group id="email">
                  <Form.Label className="text-left">Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser?.email}
                  />
                </Form.Group>
                <Form.Group id="password" className="mt-3">
                  <Form.Label className="text-left">Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className="mt-3">
                  <Form.Label className="text-left">
                    Password Confirmation
                  </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button onClick={handleGoBack} disabled={loading} className="w-100 mt-3" type="submit">
                  {" "}
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <small className="text-right mt-2">
            <Button onClick={handleGoBack}>Cancel</Button>
          </small>
        </div>
      </Container>
    </>
  );
}

export default UpdateProfile;
