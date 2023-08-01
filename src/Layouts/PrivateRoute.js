import React, { useState, useEffect } from "react";
import TodoNav from "../Components/TodoNav";
import { Outlet, useOutletContext } from "react-router-dom";
import { addTodo, getAllTodos, deleteTodo, editTodo } from "../Api/api";

const PrivateRoute = () => {
  const [todos, setTodos] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { isVerified, userToken } = useOutletContext();

  useEffect(() => {
    const getTodos = async () => {
      const todosResponse = await getAllTodos(userToken);
      if (todosResponse.success) {
        setTodos(todosResponse.data);
      }
    };
    if (isVerified && userToken) getTodos();
  }, [isVerified, userToken, shouldRefresh]);

  //call to backend
  const createTodo = async (data) => {
    setShouldRefresh(true);
    const crateResults = await addTodo(userToken, data);
    setShouldRefresh(false);
    return crateResults.success;
  };

  const handleDelete = async (id) => {
    setShouldRefresh(true);
    const deleteResponse = await deleteTodo(userToken, id);
    if (deleteResponse.success) {
      setShouldRefresh(false);
      console.log(deleteResponse);
    }
  };

  const handelEdit = async (id, data) => {
    setShouldRefresh(true);
    const editResponse = await editTodo(userToken, id, data);
    if (editResponse.success) {
      setShouldRefresh(false);
    }
  };

  return (
    <div>
      PrivateRoute
      {isVerified && (
        <>
          <TodoNav />
          <Outlet
            context={{ createTodo, todos, setTodos, handleDelete, handelEdit }}
          />
        </>
      )}
    </div>
  );
};

export default PrivateRoute;
