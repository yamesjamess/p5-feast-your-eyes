import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/RegisterSignInForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import modalStyles from "../../styles/Modal.module.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import RegisterHero from "../../assets/RegisterHero.jpg"

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

// RegisterForm component for user registration
const RegisterForm = () => {
  // Redirect user based on authentication status
  useRedirect("loggedIn");

  // State to manage registration form data
  const [registerData, setRegisterData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Destructure form data
  const { username, password1, password2 } = registerData;

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // History hook to handle navigation
  const history = useHistory();

  // State for controlling the display of the rules modal
  const [show, setShow] = useState(false);

  // Function to close/open the rules modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Event handler for input changes in the form
  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", registerData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.RegisterCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={RegisterHero} />
      </Col>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>
            ready to <span className={styles.Dark}>feast your eyes</span>?
          </h1>
          <h1 className={styles.Header}>create an account</h1>

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
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password1">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <div className={modalStyles.RulesContainer}>
              click to read the&nbsp;
              <span onClick={handleShow} className={modalStyles.Rules}>
                rules
              </span>
            </div>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
            >
              Register
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            already have an account?{" "}
            <span className={styles.UnderlineBold}>sign in</span>
          </Link>
        </Container>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={`${styles.Header} ${styles.Dark}`}>
            Feast Your Eyes Rules
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={appStyles.Content}>
          <ol className={modalStyles.OrderedList}>
            <li>
              Content Guidelines:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  Users are allowed to upload and share images of food-related
                  content only.
                </li>
                <li>
                  Content that is not related to food, such as non-food items,
                  promotional material, or unrelated images, is strictly
                  prohibited.
                </li>
              </ul>
            </li>
            <li>
              Respectful Conduct:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  Users are expected to engage in respectful and constructive
                  conversations. Any form of harassment, hate speech, or
                  inappropriate comments related to content or other users will
                  not be tolerated.
                </li>
              </ul>
            </li>
            <li>
              Ownership and Attribution:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  Users should only upload images that they own or have the
                  right to share. Proper attribution should be given if the
                  image belongs to someone else.
                </li>
              </ul>
            </li>
            <li>
              Community Standards:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  Users are encouraged to contribute positively to the community
                  by providing helpful comments, tips, and feedback on shared
                  content.
                </li>
                <li>
                  Any form of spamming, solicitation, or activities that disrupt
                  the community's harmony are not allowed.
                </li>
              </ul>
            </li>
            <li>
              Moderation and Reporting:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  The platform reserves the right to moderate content and may
                  remove any content that violates the terms of usage.
                </li>
              </ul>
            </li>
            <li>
              Account Responsibility:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  Users are responsible for maintaining the security of their
                  accounts. Sharing login credentials or engaging in any
                  activity that compromises the security of the platform is
                  strictly prohibited.
                </li>
              </ul>
            </li>
            <li>
              Updates and Changes:
              <ul className={modalStyles.UnorderedList}>
                <li>
                  The terms of usage may be updated or modified to reflect
                  changes in the platform's policies. Users will be notified of
                  any significant changes.
                </li>
              </ul>
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Dark}`}
            onClick={handleClose}
          >
            acknowledge
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default RegisterForm;
