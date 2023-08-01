import React, { useState } from "react";
import { loginUser } from "../Api/api";
import { setUserToken } from "../auth/authLocalStorage";
import { useNavigate, useOutletContext } from "react-router-dom";

// The Login component is a form where users can log in by providing their email and password. It uses React hooks (useState) to manage state for the email, password, and any login error messages that may occur during the login process.
// The handleOnSubmit function is called when the user clicks the submit button. It gathers the email and password input values and sends them to the loginUser API function to log in the user. If the login is successful, the user token is stored in local storage, and the email and password states are reset. The user is then navigated to the home page. If there are any errors during login, the error state is updated to display the appropriate error messages.
// The form includes input fields for email and password, along with a submit button. The onChange event handlers update the email and password states as the user types. If there are any errors in the error state, the corresponding error messages are displayed below the form.

const Login = () => {
  // Explanation:
  // This component represents the login form where users can sign in to their accounts.
  // It uses React hooks (useState) to manage state for email, password, and error messages.

  const [email, setEmail] = useState(""); // State variable to store the email input value
  const [password, setPassword] = useState(""); // State variable to store the password input value
  const [error, setError] = useState(""); // State variable to store any login error messages

  const navigate = useNavigate(); // The navigate function is used to programmatically navigate to different routes.
  const { setShouldRefresh } = useOutletContext(); // The setShouldRefresh function is used to refresh the outlet context.

  // Function to handle form submission when the user clicks the submit button
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShouldRefresh(true); // Set the shouldRefresh state to true to refresh the outlet context

    // Create a data object with the email and password to be sent to the server
    const data = {
      email,
      password,
    };

    // Call the API function to login the user with the provided data
    const loginResult = await loginUser(data);

    if (loginResult.success) {
      // If the login is successful, set the user token in local storage, reset the email and password states, and navigate to the home page
      setUserToken(loginResult.token);
      setEmail("");
      setPassword("");
      setError({});
      navigate("/todos");
    } else {
      // If there are errors in the login response, set the error state to display the error messages
      setError(loginResult.error);
    }

    setShouldRefresh(false); // Set the shouldRefresh state to false to stop the outlet context refresh
  };

  return (
    <div>
      <h1>Login</h1>
      {/* Login form */}
      <form onSubmit={handleOnSubmit}>
        <label>Email:</label>
        {/* Input field for email */}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label>Password:</label>
        {/* Input field for password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        {/* Submit button */}
        <button style={{ backgroundColor: "green" }}>Submit</button>
      </form>

      {/* Display error messages if any */}
      {error.email && <p>{error.email}</p>}
      {error.password && <p>{error.password}</p>}
    </div>
  );
};

export default Login;
