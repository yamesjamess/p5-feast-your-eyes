import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  const addPostIcon = (
    <NavLink to="/posts/create" activeClassName={styles.Active}>
      <i className="fa-solid fa-plus"></i>add post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink to="/feed" activeClassName={styles.Active}>
        <i className="fa-solid fa-pizza-slice"></i>feed
      </NavLink>
      <NavLink to="/liked" activeClassName={styles.Active}>
        <i className="fa-solid fa-face-grin-hearts"></i>liked
      </NavLink>
      <NavLink to="/recommended" activeClassName={styles.Active}>
        <i className="fa-solid fa-star"></i>recommended
      </NavLink>
      <NavLink to="/" onClick={handleLogOut}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>logout
      </NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={30}
        />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" activeClassName={styles.Active}>
        <i className="fa-solid fa-arrow-right-to-bracket"></i>sign in
      </NavLink>
      <NavLink to="/register" activeClassName={styles.Active}>
        <i className="fa-solid fa-user-plus"></i>register
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
            {!currentUser && <span className={styles.Brand}>Feast Your Eyes</span>}
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink exact to="/" activeClassName={styles.Active}>
              <i className="fa-solid fa-house"></i>home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
