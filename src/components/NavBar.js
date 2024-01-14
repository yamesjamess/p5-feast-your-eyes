import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink exact to="/" activeClassName={styles.Active}>
              <i className="fa-solid fa-house"></i>home
            </NavLink>
            <NavLink to="/signin" activeClassName={styles.Active}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>sign in
            </NavLink>
            <NavLink to="/register" activeClassName={styles.Active}>
              <i className="fa-solid fa-user-plus"></i>register
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
