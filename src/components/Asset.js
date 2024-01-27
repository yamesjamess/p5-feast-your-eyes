import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

// Asset component that displays content based on provided props
const Asset = ({ spinner, src, message }) => {
  // The component receives three props:
  // - spinner: a boolean indicating whether to display a loading spinner
  // - src: a source URL for an image to display
  // - message: a message to display below the image or spinner

  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
