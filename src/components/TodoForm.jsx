import { Input, Button } from "./index.js";
import { useState } from "react";
import todoService from "../api/todo.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function TodoForm({
  todoId,
  headerText,
  setShowModal,
  defaultTitle = "",
  defaultDescription = "",
  onChange,
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const { collectionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (todoId) {
        await todoService.updateTodo({ title, content: description }, todoId);
        toast.success("Todo updated successfully!");
      } else {
        await todoService.createTodo(
          { title, content: description },
          collectionId
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowModal(false);
      onChange((prev) => !prev);
    }
  };
  return (
    <div className="fixed inset-0 rounded-lg bg-opacity-50 flex flex-col items-center justify-center p-4 z-50">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 w-md shadow-lg rounded-t-lg">
        <h1 className="font-bold">{headerText}</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md bg-opacity-100 rounded-b-lg p-6 w-full max-w-md"
      >
        {/* Todo Title */}
        <Input
          type="text"
          label="Title"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Todo Description */}
        <label
          htmlFor="todoDescription"
          className="block text-sm font-medium text-gray-700 mb-2 mt-2"
        >
          Content
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo content"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-32 inset-shadow"
          style={{ boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)" }}
        />

        <div className="mt-4 flex justify-evenly items-center">
          {/* Add or update button */}
          <Button
            type="submit"
            className="bg-green-600 font-semibold hover:bg-gray-400 mr-2"
          >
            {todoId ? "Update Todo" : "Add Todo"}
          </Button>

          {/* Close modal button */}
          <Button
            onClick={() => setShowModal(false)}
            className="font-semibold hover:bg-gray-400 mr-2"
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
