import todoService from "../api/todo";
import { toast } from "react-toastify";
import { TodoForm } from "./index";
import { useState } from "react";

function TodoCard({ todo, collectionColor, onChange, onEdit }) {
  const handleDelete = async () => {
    try {
      await todoService.deleteTodo(todo._id);
      onChange((prev) => !prev);
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete todo");
    }
  };

  const toggleActive = async () => {
    try {
      await todoService.toggleTodoCompletion(todo._id);
      onChange((prev) => !prev);
    } catch (error) {
      toast.error(error.message || "Failed to toggle todo status");
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine text color based on background color
  const isDarkColor = ["blue", "black", "green"].includes(collectionColor);
  const textColor = isDarkColor ? "white" : "#333333";

  // Status badge - completed or not
  const StatusBadge = () => (
    <div
      className={`text-xs font-medium px-2 py-1 rounded-full ${
        todo.completed
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {todo.completed ? "Completed" : "Active"}
    </div>
  );

  return (
    <div
      className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        backgroundColor: collectionColor,
        opacity: 0.9,
        borderLeft: `5px solid ${collectionColor}`,
      }}
    >
      <div className="p-4 flex flex-col h-40">
        {/* Title */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-semibold text-lg truncate"
            style={{ color: textColor }}
          >
            {todo.title}
          </h3>
          <StatusBadge />
        </div>

        {/* Content */}
        <p
          className="text-sm mb-3 line-clamp-3 flex-grow"
          style={{ color: textColor, opacity: 0.9 }}
        >
          {todo.content || "No description"}
        </p>

        {/* Footer */}
        <div
          className="mt-auto pt-2 flex justify-between items-center text-xs border-t"
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: textColor,
            opacity: 0.8,
          }}
        >
          <span>Created: {formatDate(todo.createdAt)}</span>

          {/* Action buttons */}
          <div className="flex space-x-2">
            {/* Edit button */}
            <button
              onClick={() => onEdit(todo)}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              title="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            {/* Toggle complete button */}
            <button
              onClick={toggleActive}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    todo.completed
                      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
