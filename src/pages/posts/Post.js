import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    recommends_count,
    recommend_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRecommend = async () => {
    try {
      const { data } = await axiosRes.post("/recommends/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, recommends_count: post.recommends_count + 1, recommend_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnrecommend = async () => {
    try {
      await axiosRes.delete(`/recommends/${recommend_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, recommends_count: post.recommends_count - 1, recommend_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body className={styles.PostHeader}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={45} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>you can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>log in to like this post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>you can't recommend your own post!</Tooltip>}
            >
              <i className="fa-regular fa-star" />
            </OverlayTrigger>
          ) : recommend_id ? (
            <span onClick={handleUnrecommend}>
              <i className={`fa-solid fa-star ${styles.Star}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleRecommend}>
              <i className={`fa-regular fa-star ${styles.StarOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>log in to recommend this post!</Tooltip>}
            >
              <i className="fa-regular fa-star" />
            </OverlayTrigger>
          )}
          {recommends_count}

          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
