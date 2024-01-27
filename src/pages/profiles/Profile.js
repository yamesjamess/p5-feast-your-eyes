import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import Avatar from "../../components/Avatar";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

// Profile component to display a profile
const Profile = (props) => {
  // Destructure props to access profile data and optional parameters
  const { profile, mobile, imageSize = 45 } = props;
  const { id, following_id, image, owner } = profile;

  // Access current user data from the CurrentUserContext
  const currentUser = useCurrentUser();
  // Check if the current user is the owner of the profile
  const is_owner = currentUser?.username === owner;

  // Access follow and unfollow functions from the ProfileDataContext
  const {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <Link className="align-self-center" to={`/profiles/${id}`}>
      <div className={`mx-2 ${styles.WordBreak} ${styles.Dark}`}>
        <strong>{owner}</strong>
      </div>
      </Link>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Light}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Dark}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};


export default Profile;
