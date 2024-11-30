import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        navigate("/tasks");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  if (!task) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="w-96 mx-auto p-6 bg-white  rounded-md">
      <h2 className="text-2xl capitalize font-semibold text-gray-800 mb-4">
        {task.title}
      </h2>
      <p className="text-gray-700 mb-2 capitalize">
        <span className="font-medium ">Description:</span> {task.description}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Due Date:</span>{" "}
        {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700 capitalize mb-2">
        <span className="font-medium ">Status:</span> {task.status}
      </p>
      <p className="text-gray-700 capitalize mb-4">
        <span className="font-medium">Priority:</span>{" "}
        <span
          className={`px-2 py-[0.2rem] rounded-md  ${
            task.priority === "high"
              ? "text-red-500 bg-red-100"
              : task.priority === "medium"
              ? "text-yellow-500 bg-yellow-100"
              : "text-green-500 bg-green-100"
          }`}
        >
          {task.priority}
        </span>
      </p>
      <div className="flex space-x-4">
        <Link
          to={`/tasks/${id}/edit`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit Task
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
