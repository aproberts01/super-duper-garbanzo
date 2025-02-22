import React from "react";
import { Github, Linkedin, Envelope } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar: React.FC = () => {
  return (
    <>
      <Navbar expand="lg" fixed="top" bg="primary">
        <Container>
          <Navbar.Brand href="/">Ali's Fetch Adoption Search</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://github.com/aproberts01">
                <Github />
                <span className="mx-1 align-middle">Github</span>
              </Nav.Link>
              <Nav.Link href="https://linkedin.com/in/aroberts-dev">
                <Linkedin /><span className="mx-1 align-middle">LinkedIn</span>
              </Nav.Link>
              <Nav.Link href="mailto:aproberts01@gmail.com">
                <Envelope /><span className="mx-1 align-middle">Email</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
