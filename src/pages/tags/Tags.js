import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/Tags.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Tags component to display list of tags
const Tags = () => {
  // State to manage tags data
  const [tags, setTags] = useState({ allTags: { results: [] } });
  const { allTags } = tags;

  // Fetch all posts to extract tags
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
        .map((post) => post.tag.trim().toLowerCase())
        .filter((tag) => tag !== "")
    )
  ).sort();

  return (
    <>
      <Container className={`${appStyles.Content} ${styles.TagContainer}`}>
        <p className={styles.Header}>filter by tags</p>
        <hr />
        {uniqueTags.length ? (
          <ul>
            {uniqueTags.map((tag, index) => (
              <li key={index}>
                <Link to={`/posts/tag/${tag}`} className={styles.Tags}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>no tags available</p>
        )}
      </Container>
    </>
  );
};

export default Tags;
