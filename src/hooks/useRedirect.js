import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Custom hook to redirect based on user authentication status
export const useRedirect = (userAuthStatus) => {
  // Access the browser's history object for navigation
  const histroy = useHistory();

  useEffect(() => {
    // Function to handle redirect on component mount
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
