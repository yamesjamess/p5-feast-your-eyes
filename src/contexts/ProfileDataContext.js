import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

// Create a context to store the profile data
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks to access the profile data and set profile data from context
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Provider component to manage the profile data state
export const ProfileDataProvider = ({ children }) => {
  // State to hold the profile data
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  // Access the current user from the CurrentUserContext
  const currentUser = useCurrentUser();

  // Function to handle follow action
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      // Update the profile data state after a successful follow
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle unfollow action
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      // Update the profile data state after a successful unfollow
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Use useEffect to fetch popular profiles data on component mount or when currentUser changes
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        // Update the profile data state with popular profiles data
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};