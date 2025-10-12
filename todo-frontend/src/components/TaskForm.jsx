import React, { useState } from "react";
import { createTask } from "../api/todoApi";

const TaskForm = ({ reloadTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
    reloadTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-green-600 hover:bg-green-800 rounded text-white" type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
