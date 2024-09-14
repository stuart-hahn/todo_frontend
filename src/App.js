// src/App.js

import React from "react";
import "./styles/todo.css"; // Import the stylesheet
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="app-container">
      <h1>Todos</h1>
      <TaskList />
    </div>
  );
}

export default App;
