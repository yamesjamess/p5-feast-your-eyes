import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/Tags.module.css";
import { axiosReq } from "../../api/axiosDefaults";

const Tags = () => {
  const [tags, setTags] = useState({ allTags: { results: [] } });
  const { allTags } = tags;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get("/posts");
        setTags((prevState) => ({
          ...prevState,
          allTags: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const uniqueTags = Array.from(
    new Set(
      allTags?.results
        .map((post) => post.tag.trim())
        .filter((tag) => tag !== "")
    )
  );

  return (
    <>
      <Container className={`${appStyles.Content} ${styles.TagContainer}`}>
        <div>filter by tags</div>
        <hr />
        <ul>
          {uniqueTags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Tags;
