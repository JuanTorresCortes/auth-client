import React from "react";
import { Link } from "react-router-dom";

const TodoNav = () => {
  return (
    <div>
      <Link to={"/todos/add-todo"}>Add Todo</Link>
    </div>
  );
};

export default TodoNav;
