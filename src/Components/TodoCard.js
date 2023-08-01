import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrashAlt,
  faTimes,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

const TodoCard = ({ todo, handleDelete, handelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [completed, setCompleted] = useState(false); // Initialize with false
  const [selectedEdit, setSelectedEdit] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setPriority(todo.priority);
    setCompleted(todo.completed);
  }, [todo]);

  const deleteButton = () => {
    handleDelete(todo._id);
  };

  const handleOnComplete = () => {
    setCompleted(!completed); // Toggle the completed state
  };

  const handleEditSubmit = () => {
    const data = {
      title,
      description,
      priority,
      completed, // Include the completed state in the data being submitted
    };
    handelEdit(todo._id, data);
    setSelectedEdit(false);
  };

  const handleCancelEdit = () => {
    setSelectedEdit(false);
  };

  return (
    <div style={{ border: "3px solid blue", width: "50%" }}>
      {selectedEdit ? (
        <>
          title:
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          description:
          <input
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
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
          <FontAwesomeIcon icon={faCheckSquare} onClick={handleEditSubmit} />
          <FontAwesomeIcon icon={faTimes} onClick={handleCancelEdit} />
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Priority: {priority}</p>
          <FontAwesomeIcon
            icon={faPenSquare}
            onClick={() => setSelectedEdit(true)}
          />
          <br />
          <FontAwesomeIcon
            icon={completed ? faCheckSquare : faTimes}
            onClick={handleOnComplete}
          />
          <br />
          <FontAwesomeIcon icon={faTrashAlt} onClick={deleteButton} />
        </>
      )}
    </div>
  );
};

export default TodoCard;
