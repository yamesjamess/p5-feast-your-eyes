import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import modalStyles from "../../styles/Modal.module.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

// PostCreateForm component for user to create post
function PostCreateForm() {
  // Redirect to the login page if the user is not logged in
  useRedirect("loggedOut");

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // State to manage form data
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    restaurant: "",
    tag: "",
  });

  // Destructuring form data
  const { title, content, image, restaurant, tag } = postData;

  // Ref for the image input element
  const imageInput = useRef(null);

  // History hook to handle navigation
  const history = useHistory();

  // State for controlling the display of the rules modal
  const [show, setShow] = useState(false);

  // Function to close/open the rules modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPostData({
      ...postData,
      [name]: name === "tag" ? value.toLowerCase() : value,
    });
  };

  // Event handler for image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("restaurant", restaurant);
    formData.append("tag", tag);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // JSX structure for form fields and buttons
  const textFields = (
    <div className="text-center">
      <Form.Group controlId="restaurant">
        <Form.Label>restaurant</Form.Label>
        <Form.Control
          type="text"
          name="restaurant"
          value={restaurant}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.restaurant?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="title">
        <Form.Label>menu</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="content">
        <Form.Label>content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="tag">
        <Form.Label>
          tag
          <div className={styles.SmallLabel}>please only add one tag</div>
        </Form.Label>
        <Form.Control
          type="text"
          name="tag"
          value={tag}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.tag?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div className={modalStyles.RulesContainer}>
        posting&nbsp;
        <span onClick={handleShow} className={modalStyles.Rules}>
          guidlines
        </span>
      </div>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Dark}`}
        onClick={() => {
          history.goBack();
        }}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Light} `}
        type="submit"
      >
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Light} btn`}
                      htmlFor="image-upload"
                    >
                      change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="click here to upload your scrumptious image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
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
                    inappropriate comments related to content or other users
                    will not be tolerated.
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
                    Users are encouraged to contribute positively to the
                    community by providing helpful comments, tips, and feedback
                    on shared content.
                  </li>
                  <li>
                    Any form of spamming, solicitation, or activities that
                    disrupt the community's harmony are not allowed.
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
                    changes in the platform's policies. Users will be notified
                    of any significant changes.
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
    </Form>
  );
}

export default PostCreateForm;
