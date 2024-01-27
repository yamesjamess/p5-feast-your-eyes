import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostsListPage from "./pages/posts/PostsListPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameChangeForm from "./pages/profiles/UsernameChangeForm";
import UserChangePasswordForm from "./pages/profiles/UserChangePasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import TagPostList from "./pages/tags/TagPostList";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostsListPage message="sorry! no results found!" />}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsListPage
                message="no results found. change your query or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsListPage
                message="no results found. change your query or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/recommended"
            render={() => (
              <PostsListPage
                message="no results found. change your query or recommend a post."
                filter={`recommends__owner__profile=${profile_id}&ordering=-recommends__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostDetailPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameChangeForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserChangePasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route exact path="/posts/tag/:tag" render={() => <TagPostList message="sorry! no results found!"/>} />
          <Route render={() => <h1>error 404 - page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
