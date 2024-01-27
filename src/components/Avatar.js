import React from "react";
import styles from "../styles/Avatar.module.css";

// Avatar component that displays an image (avatar) and optional text
const Avatar = ({ src, height = 45, text }) => {
  // The component receives three props:
  // - src: a source URL for the avatar image
  // - height: the height of the avatar image (default value is 45)
  // - text: optional text to be displayed alongside the avatar
  
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
