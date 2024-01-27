import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/TopRecommend.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NoResults from "../../assets/no-results.png";

// TopRecommend component to display posts with the most recommendations
const TopRecommend = ({ message }) => {
  // State to manage recommended posts and loading status
  const [posts, setPosts] = useState({ recommendedPosts: { results: [] } });
  const { recommendedPosts } = posts;
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch recommended posts on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/posts/?ordering=-recommends_count"
        );
        setPosts((prevState) => ({
          ...prevState,
          recommendedPosts: data,
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
      <Card className={styles.TopRecommendPosts}>
        <Card.Body className={styles.Header}>top 5 recommended posts</Card.Body>

        {hasLoaded ? (
          <>
            {recommendedPosts.results.length ? (
              <div className={styles.HorizontalScrollContainer}>
                <Row className={styles.HorizontalScrollRow}>
                  {recommendedPosts.results.slice(0, 5).map((post) => (
                    <Col
                      key={post.id}
                      xs={6}
                      md={3}
                      className={styles.PostContainer}
                    >
                      <Link to={`/posts/${post.id}`}>
                        <Card.Img
                          src={post.image}
                          alt={post.title}
                          className={styles.PostImage}
                        />
                      </Link>
                      <div className={styles.PostDetails}>
                        <p>{post.title}</p>
                        <i className={`fa-solid fa-star ${styles.Star}`} />
                        <span className={styles.RecommendCount}>
                          {post.recommends_count}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
                <Asset src={NoResults} message={message}/>
            )}
          </>
        ) : (
          <Asset spinner />
        )}
      </Card>
  );
};

export default TopRecommend;
