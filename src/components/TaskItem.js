// src/components/TaskItem.js

import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission for updating the task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(task.id, editedTask);
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task completion toggle
  const handleCompletionToggle = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await updateTask(task.id, updatedTask);
      onTaskUpdated(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id);
        onTaskDeleted(task.id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedTask({ ...task }); // Reset editedTask when toggling
  };

  return (
    <>
      {isEditing ? (
        // Edit Mode
        <form className="task-edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
            className="task-input"
          />
          <div className="task-form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={toggleEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // Display Mode
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCompletionToggle}
          />
          <label onClick={toggleEdit}>{task.title}</label>
          <button onClick={handleDelete} aria-label="Delete Task">
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default TaskItem;
