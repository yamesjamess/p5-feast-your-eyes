import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsListPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Post from "../posts/Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import TopRecommend from "../recommends/TopRecommend";
import Tags from "./Tags";

// TagPostList component to display posts based on tag selected
const TagPostList = ({message}) => {

  // State to manage posts and loading status
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState({ results: [] });

  // Access post tag from URL params
  const { tag } = useParams();

  // Extracting the current URL path
  const { pathname } = useLocation();

  // Fetch posts with the specified tag
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/tag/${tag}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [tag, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
        
        <TopRecommend message={message} />

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <Tags />
      </Col>
    </Row>
  );
};

export default TagPostList;
