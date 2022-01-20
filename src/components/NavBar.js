import React from "react";
import { Nav, Button } from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import authStore from "../stores/authStore";
import { observer } from "mobx-react-lite";
import { _allowStateChangesInsideComputed } from "mobx";
function Navbar() {
  return (
    <Nav className="justify-content-end" bg="light" expand="lg">
      {!authStore.user ? (
        <>
          <SignUpModal />
          <SignInModal />
        </>
      ) : (
        <>
          <h3>Welcome {authStore.user.username} &nbsp;</h3>
          <Button className="delete" onClick={authStore.signOut}>
            Log out
          </Button>
        </>
      )}
    </Nav>
  );
}

export default observer(Navbar);
