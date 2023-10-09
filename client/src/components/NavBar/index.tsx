import React, { FC } from "react";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { RouteNames } from "router";
import "./styles.css";

const NavBar: FC = () => {
  const { user, isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href={RouteNames.BOARDS}>Django Boards</Navbar.Brand>
        <Navbar.Toggle aria-controls="mainMenu" />
        <Navbar.Collapse id="mainMenu">
          {isAuth ? (
            <Nav style={{ marginLeft: "auto" }}>
              <NavDropdown title={user.email}>
                <NavDropdown.Item href="#">My account</NavDropdown.Item>
                <NavDropdown.Item href="#">Change password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} href={RouteNames.LOGIN}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav style={{ marginLeft: "auto" }}>
              <Button
                id="navbar-login-button"
                variant="outline-secondary"
                href={RouteNames.LOGIN}>
                Log in
              </Button>
              <Button variant="primary" href={RouteNames.REGISTER}>
                Sign up
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
