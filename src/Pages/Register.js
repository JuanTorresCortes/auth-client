import React, { useState } from "react";
import { registerUser } from "../Api/api";
import { useNavigate } from "react-router-dom";

// The Register component is a form where users can register by providing their email and password. It uses React hooks (useState) to manage state for the email, password, and any error messages that may occur during the registration process.
// The handleOnSubmit function is called when the user clicks the submit button. It gathers the email and password input values and sends them to the registerUser API function to register the user. If the registration is successful, the error state is reset, and the user is navigated to the login page. If there are any errors during registration, the error state is updated to display the appropriate error messages.
// The form includes input fields for email and password, along with a submit button. The onChange event handlers update the email and password states as the user types. If there are any errors in the error state, the corresponding error messages are displayed below the form.

const Register = () => {
  // Explanation:
  // This component represents the registration form where users can sign up for an account.
  // It uses React hooks (useState) to manage state for email, password, and error messages.

  const [email, setEmail] = useState(""); // State variable to store the email input value
  const [password, setPassword] = useState(""); // State variable to store the password input value
  const [error, setError] = useState({}); // State variable to store any validation errors

  const navigate = useNavigate(); // The navigate function is used to programmatically navigate to different routes.

  // Function to handle form submission when the user clicks the submit button
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a data object with the email and password to be sent to the server
    const data = {
      email,
      password,
    };

    // Call the API function to register the user with the provided data
    const registerResult = await registerUser(data);
    console.log(registerResult);

    if (registerResult.success) {
      // If the registration is successful, reset the error state, email, and password, and navigate to the login page
      setError({});
      setEmail("");
      setPassword("");
      navigate("/login");
    } else {
      // If there are errors in the registration response, set the error state to display the error messages
      setError(registerResult.error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {/* Registration form */}
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email"> Email: </label>
        {/* Input field for email */}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password"> Password: </label>
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

export default Register;
