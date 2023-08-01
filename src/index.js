import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import PrivateRoute from "./Layouts/PrivateRoute";
import Todos from "./Pages/Todos";
import TodoForm from "./Components/TodoForm";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Explanation:
// This is the main entry point of the React application where the routing and rendering configuration takes place.
// The createBrowserRouter function is used to define the routing configuration for the application. It defines the routes and their corresponding components to be rendered when the URL matches a particular path.
// The router variable holds the router configuration with the routes defined for the App component. The root route ("/") is associated with the App component, and it has child routes for different pages: "Home", "Register", and "Login".
// The RouterProvider component wraps the application and provides the router to the entire React component tree, allowing it to handle routing and rendering based on the current URL.
// The root element is obtained using ReactDOM.createRoot, and the entire application is rendered within it.
// The reportWebVitals function is used to measure and report the performance of the application to log results or send them to an analytics endpoint.

// Create the browser router with route configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Define child routes for the App component

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "todos",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Todos />,
          },
          {
            path: "add-todo",
            element: <TodoForm />,
          },
        ],
      },
    ],
  },
]);

// Get the root element to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provide the router to the application */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
