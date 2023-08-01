import React from "react";
import { useOutletContext } from "react-router-dom";
import TodoCard from "../Components/TodoCard";

const Todos = () => {
  const { todos, handleDelete, handelEdit } = useOutletContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Your To-dos</h1>
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          handleDelete={handleDelete}
          handelEdit={handelEdit}
        />
      ))}
    </div>
  );
};

export default Todos;
