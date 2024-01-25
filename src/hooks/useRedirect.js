import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const useRedirect = (userAuthStatus) => {
  const histroy = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          histroy.push("/");
        }
      } catch (error) {
        if (userAuthStatus === "loggedOut") {
          histroy.push("/");
        }
      }
    };

    handleMount();
  }, [histroy, userAuthStatus]);
};
