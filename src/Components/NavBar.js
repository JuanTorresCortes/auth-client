import React from "react";
import { Link } from "react-router-dom";
import { removeUserToken } from "../auth/authLocalStorage";

// The NavBar component renders different links based on the user's authentication status. If the user is not authenticated (isVerified is false), it shows login and register links. If the user is authenticated (isVerified is true), it shows a logout link and the user's email.
// The handleLogout function is responsible for logging out the user. It removes the user token from local storage, sets the isVerified state to false, resets the user details to null, and sets shouldRefresh to false. This ensures that the user is logged out and the authentication status is updated accordingly.The NavBar component renders different links based on the user's authentication status. If the user is not authenticated (isVerified is false), it shows login and register links. If the user is authenticated (isVerified is true), it shows a logout link and the user's email.
// The handleLogout function is responsible for logging out the user. It removes the user token from local storage, sets the isVerified state to false, resets the user details to null, and sets shouldRefresh to false. This ensures that the user is logged out and the authentication status is updated accordingly.

const NavBar = ({
  isVerified,
  user,
  setShouldRefresh,
  setUser,
  setIsVerified,
}) => {
  // Explanation:
  // This component represents the navigation bar at the top of the application.
  // The component takes props such as `isVerified`, `user`, `setShouldRefresh`, `setUser`, and `setIsVerified` to manage user authentication status.

  // Handle the user logout
  const handleLogout = async () => {
    setShouldRefresh(true);

    // Remove the user token from the local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      // Set the user authentication status to false and reset user details
      setShouldRefresh(false);
      setUser(null);
      setIsVerified(false);
      console.log("Logged out");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Show link to the Home page */}
      <Link to={"/todos"}>Home</Link>{" "}
      {!isVerified ? ( // using conditional rendering
        // Show login and register links if user is not authenticated
        <span>
          <Link to={"/login"}>login</Link>{" "}
          <Link to={"/register"}>register</Link>
        </span>
      ) : (
        // Show logout link and user email if user is authenticated
        <span>
          {user} <Link onClick={handleLogout}>logout</Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;
