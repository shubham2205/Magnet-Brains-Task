import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?page=${currentPage}&limit=10`);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="w-[30rem] mx-auto p-6 bg-white rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h2>
      <Link
        to="/tasks/new"
        className="inline-block mb-4 px-4 py-2 bg-[#f84525] text-white rounded-md hover:bg-red-800 transition"
      >
        Create New Task
      </Link>
      <ul className="space-y-6">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`border rounded-md p-4 ${
              task.priority === "high"
                ? "border-red-500"
                : task.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <Link
              to={`/tasks/${task._id}`}
              className="text-lg capitalize font-bold  hover:text-green-700"
            >
              {task.title}
            </Link>
            <p className="text-sm my-2 text-gray-600">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-4 text-gray-600 capitalize">
              Status:
              <span
                className={`m-2 px-2 py-[0.2rem] rounded-md  ${
                  task.status === "pending"
                    ? "text-red-500 bg-red-100"
                    : task.status === "completed"
                    ? "text-green-700 bg-green-100"
                    : ""
                }`}
              >
                {task.status}
              </span>
            </p>
            <div className=" items-center mt-4 space-x-2 flex justify-between w-full">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="px-3 py-1  border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f84525]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-4 py-1 text-white bg-red-600 rounded-md hover:bg-red-800 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#f84525] text-white hover:bg-red-800"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#f84525] text-white hover:bg-red-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
