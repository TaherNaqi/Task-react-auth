import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import authStore from "../stores/authStore";
import { observer } from "mobx-react-lite";
function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    // to do : stop page from refreshing
    // call a function to sign up
    event.preventDefault();
    authStore.signIn(user);
    setIsOpen(false);
  };

  return (
    <>
      <Button className="delete" onClick={() => setIsOpen(true)}>
        Sign In
      </Button>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              placeholder="Username"
              name="username"
            />
            <p></p>
            <input
              onChange={handleChange}
              type={"password"}
              placeholder="Password"
              name="password"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Hello {authStore.user ? authStore.user.username : ""} */}
    </>
  );
}
export default observer(SignInModal);
