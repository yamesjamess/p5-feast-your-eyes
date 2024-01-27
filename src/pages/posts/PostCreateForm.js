import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

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

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPostData({
      ...postData,
      [name]: name === 'tag' ? value.toLowerCase() : value,
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
      </Row>
    </Form>
  );
}

export default PostCreateForm;
