import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const { createTodo } = useOutletContext();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // build a new
    const data = {
      title,
      description,
      priority,
    };
    const result = await createTodo(data);
    if (result) {
      // Reset the form after submission
      setTitle("");
      setDescription("");
      setPriority("medium");
      navigate("/todos");
    }
  };

  return (
    <form
      style={{ border: "3px solid blue", width: "30%" }}
      onSubmit={handleOnSubmit}
    >
      <div>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="priority">Priority:</label>
        <br />
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        style={{ backgroundColor: "green", borderRadius: "20px" }}
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
