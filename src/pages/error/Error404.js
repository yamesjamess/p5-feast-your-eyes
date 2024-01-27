import React from "react";
import image404 from "../../assets/error404.png";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Error.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Error404 component to display custom 404 page
const Error404 = () => {
  return (
    <Container className={styles.Contents}>
      <Image
        src={image404}
        alt="error 404 - page not found"
        className="img-fluid"
      />
      <p className={styles.Message}>
        the page you're looking for might have been moved, removed, renamed, or
        might never existed.
      </p>
      <Link to="/">
        <Button className={`${btnStyles.BigButton} ${btnStyles.Dark}`}>
          back to Feast Your Eyes
        </Button>
      </Link>
    </Container>
  );
};

export default Error404;
