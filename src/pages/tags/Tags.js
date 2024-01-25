import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";

const Tags = () => {
  return (
    <>
      <Container className={appStyles.Content}>
        <div>filter by cuisine type</div>
        <br />
        <ul>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
            <li>Tag names here</li>
        </ul>
        
      </Container>

    </>
  );
};

export default Tags;
