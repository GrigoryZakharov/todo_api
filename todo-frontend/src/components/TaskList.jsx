import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../api/todoApi";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 7;
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/todos?skip=${(page - 1) * limit}&limit=${limit}`
      );
      const data = await response.json();
      setTasks(data.items);
      setTotal(data.total);
    };
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = async (task) => {
    const updated = await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Todo List
      </h2>

      <TaskForm reloadTasks={() => setPage(1)} />

      <div className="flex justify-center gap-3 my-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-4 py-2 rounded-lg transition ${
            filter === "incomplete" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Incompleted
        </button>
      </div>

      <ul className="mt-6 space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {task.title}
              </span>
              <span className="text-gray-500 text-sm">{task.description}</span>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center space-x-3 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default TaskList;
