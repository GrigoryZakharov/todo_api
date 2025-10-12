import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { fetchTasks, updateTask, deleteTask } from "./api/todoApi";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleComplete = async (task) => {
    const updated = await updateTask(task.id, { ...task, completed: !task.completed });
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6 text-black">My Todo App</h1>
      <TaskList
        tasks={tasks}
        loadTasks={loadTasks}   
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
