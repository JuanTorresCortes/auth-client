import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

// This file contains API functions to interact with the backend server.
// It uses Axios library to perform HTTP requests to the server.

// Explanation:
// This file contains API functions that handle communication with the backend server.
// The baseUrl variable holds the base URL of the backend server, which is specified in the environment variables (REACT_APP_BASE_URL).
// The registerUser function is an asynchronous function that takes userData as a parameter. It sends a POST request to the server's /users/register endpoint to register a new user. Upon successful registration, it returns the data received from the server. If an error occurs during registration, it returns the error data received from the server.
// The loginUser function is similar to the registerUser function, but it sends a POST request to the server's /users/login endpoint to log in a user. Upon successful login, it returns the data received from the server. If an error occurs during login, it returns the error data received from the server.
// The validateUser function is an asynchronous function that takes the userToken as a parameter. It sends a GET request to the server's /users/validate endpoint to validate the user's token for authentication. It includes the user's token in the request headers with the Authorization field. Upon successful token validation, it returns the data received from the server. If an error occurs during token validation, it returns the error data received from the server.

// Function to register a new user by making a POST request to the server
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/register`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to log in a user by making a POST request to the server
const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to validate a user's token by making a GET request to the server
const validateUser = async (userToken) => {
  try {
    const response = await axios.get(`${baseUrl}/users/validate`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = response.data;
    return data;
    // return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const addTodo = async (token, todoData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/todos/create-todo`,
      todoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const getAllTodos = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/todos/all-todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteTodo = async (token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/todos/delete-todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const editTodo = async (token, id, editInfo) => {
  try {
    const response = await axios.put(
      `${baseUrl}/todos/edit-todo/${id}`,
      editInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  registerUser,
  loginUser,
  validateUser,
  addTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
};
