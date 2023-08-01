// Explanation:
// This file contains the main component of the frontend application, App, which acts as the container for other components and manages user authentication.
// The component uses React hooks (useState and useEffect) to manage state and side effects.
// The userToken, user, isVerified, and shouldRefresh state variables are used to keep track of the user's authentication status.
// In the useEffect, the component checks for the presence of the user token in local storage and sets it in state when the component mounts. This ensures that the user stays authenticated on page reloads or revisits.
// Another useEffect is used to verify the user's authenticity using the validateUser API call. If the token is invalid or expired, the user is logged out by removing the token from local storage.
// The NavBar component is rendered at the top, which shows different links based on the user's authentication status.
// The Outlet component from react-router-dom is used to render child components based on the current route.

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserToken, removeUserToken } from "./auth/authLocalStorage";
import { validateUser } from "./Api/api";
import "./App.css";
import NavBar from "./Components/NavBar";

// context > useContext
// redux

// This component serves as the main container for the entire application.
// It manages user authentication and renders the navigation bar and child components based on the current route.

function App() {
  // State variables to manage user authentication
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  // when user logs in token is placed in localStorage
  //we get the token, set in state
  // we make a api call to the backend with our token to see if
  // we are verified

  // When the component mounts, check for the user token in local storage and set it in state.
  // This ensures that the user stays authenticated on page reloads or revisits.
  useEffect(() => {
    const token = getUserToken();
    setUserToken(token);
  }, [shouldRefresh]);

  // When the user token changes, verify the user's authenticity using the validateUser API call.
  // If the token is invalid or expired, the user is logged out by removing the token from local storage.
  useEffect(() => {
    const verifyUser = async () => {
      if (userToken) {
        const verifyResult = await validateUser(userToken);
        if (verifyResult.success) {
          setUser(verifyResult.email);
          setIsVerified(true);
        } else {
          setShouldRefresh(false);
          const resultLogout = await removeUserToken();
          if (resultLogout) {
            setIsVerified(false);
            setUser(null);
            setShouldRefresh(false);
          }
        }
      }
    };
    verifyUser();
  }, [userToken]);

  return (
    <div className="App">
      {/* Render the navigation bar */}
      <NavBar
        isVerified={isVerified}
        setIsVerified={setIsVerified}
        user={user}
        setUser={setUser}
        setShouldRefresh={setShouldRefresh}
      />
      {/* Render the child components depending on the current route */}
      <Outlet context={{ setShouldRefresh, user, isVerified, userToken }} />
    </div>
  );
}

export default App;
