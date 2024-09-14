// src/components/TaskList.js

import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task to the state
  const handleTaskAdded = (task) => {
    setTasks([task, ...tasks]);
  };

  // Update a task in the state
  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Remove a task from the state
  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Group tasks by due date
  const groupedTasks = tasks.reduce((groups, task) => {
    const date = task.due_date || "No Due Date";
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="container">
      <TaskForm onTaskAdded={handleTaskAdded} />
      <div className="day-grid">
        {Object.keys(groupedTasks).map((date) => (
          <div key={date} className="day-column">
            <h3>{date}</h3>
            {groupedTasks[date].map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
