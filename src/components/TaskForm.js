// src/components/TaskForm.js

import React, { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTask = { title };
    try {
      const response = await createTask(newTask);
      onTaskAdded(response.data);
      setTitle(""); // Reset the input field
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="task-input"
      />
    </form>
  );
};

export default TaskForm;
