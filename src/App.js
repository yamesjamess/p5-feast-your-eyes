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
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostDetailPage />} />
          <Route render={() => <h1>Error 404 - Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
