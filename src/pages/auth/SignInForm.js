import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import styles from "../../styles/RegisterSignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

// SignInForm component for user sign in
function SignInForm() {
  // Context hook to set the current user
  const setCurrentUser = useSetCurrentUser();

  // Redirect user based on authentication status
  useRedirect("loggedIn");

  // State to manage sign-in form data
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // Destructure sign-in form data
  const { username, password } = signInData;

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // History hook to handle navigation
  const history = useHistory();

  // Event handler for input changes in the form
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>
            sign in to <span className={styles.Dark}>feast your eyes</span>!
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
            >
              sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/register">
            don't have an account?{" "}
            <span className={styles.UnderlineBold}>register now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={"#"} />
      </Col>
    </Row>
  );
}

export default SignInForm;
