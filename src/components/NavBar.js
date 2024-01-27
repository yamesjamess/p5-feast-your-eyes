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
import { removeTokenTimestamp } from "../utils/utils";

// NavBar component for the application's navigation bar
const NavBar = () => {
  // Retrieve current user and set current user from context
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Use a custom hook to manage click outside toggle
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Function to handle user logout
  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp()
    } catch (err) {
      console.log(err);
    }
  };

  // Navigation link for adding a new post
  const addPostIcon = (
    <NavLink to="/posts/create" activeClassName={styles.Active}>
      <i className="fa-solid fa-plus"></i>add post
    </NavLink>
  );

  // Navigation icons for logged-in users
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

  // Navigation icons for logged-out users
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
