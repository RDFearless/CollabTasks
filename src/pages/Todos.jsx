import { useState, useEffect } from "react";
import { Container, TodoCard, Button, TodoForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import todoService from "../api/todo";
import collectionService from "../api/collection";
import { colorOptions } from "../components/ColorDropdown";

function Todos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [change, onChange] = useState(false);

  const navigate = useNavigate();
  const { collectionId } = useParams();

  // Fetch collection by ID
  useEffect(() => {
    const fetchCollection = async () => {
      if (!collectionId) {
        navigate("/");
        return;
      }

      try {
        const response = await collectionService.getCollectionById(
          collectionId
        );
        setCurrentCollection(response.data);
      } catch (error) {
        setError("Failed to load collection. " + (error.message || ""));
        // If collection not found, redirect to home
        navigate("/");
      }
    };

    fetchCollection();
  }, [collectionId, navigate]);

  // Fetch todos for the current collection
  useEffect(() => {
    if (!currentCollection) return;

    const fetchTodos = async () => {
      setError("");
      try {
        const response = await todoService.getTodosByCollectionId(
          currentCollection._id
        );

        if (response.data?.count > 0) {
          setTodos(response.data.todos);
        } else {
          setTodos([]);
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [change, currentCollection]);

  const handleAddTodo = () => {
    setShowAddModal(true);
  };

  // Get the collection color for TodoCards
  const getCollectionColorHex = (colorName) => {
    const colorObj = colorOptions.find((c) => c.value === colorName);
    return colorObj ? colorObj.hex : colorName;
  };

  // Loading
  if (loading || !currentCollection) {
    return (
      <Container>
        <div className="h-104 flex items-center justify-center">
          <p className="text-2xl font-bold text-green-500">
            Loading Collection...
          </p>
        </div>
      </Container>
    );
  }

  // Error
  if (error) {
    return (
      <Container>
        <div className="h-104 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500 mb-4">Error</p>
            <p className="mb-4">{error}</p>
            <Button onClick={() => navigate("/")}>Go to Collections</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        {/* Header with collection name and add button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentCollection.name} Collection
            </h2>
            <p className="text-gray-600 text-sm">
              {currentCollection.description || "No description"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {todos.length} Total
            </span>
            <Button
              onClick={handleAddTodo}
              className="bg-green-600 hover:bg-green-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Todo
            </Button>
          </div>
        </div>

        {/* Empty state -> No todos */}
        {todos.length === 0 ? (
          <div
            hidden={showAddModal}
            className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No todos yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first todo in this collection.
            </p>
            <Button onClick={handleAddTodo}>Add Your First Todo</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Loop over todos and render a TodoCard for each */}
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                collectionColor={currentCollection.color}
                onChange={onChange}
                onEdit={(todo) => {
                  setSelectedTodo(todo);
                  setShowEditModal(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Todo Form */}
      {showAddModal && (
        <TodoForm
          headerText="Add New Todo"
          setShowModal={setShowAddModal}
          onChange={onChange}
        />
      )}

      {/* Edit Todo Form */}
      {showEditModal && selectedTodo && (
        <TodoForm
          todoId={selectedTodo._id}
          headerText="Edit Todo"
          setShowModal={setShowEditModal}
          defaultTitle={selectedTodo.title}
          defaultDescription={selectedTodo.content}
          onChange={onChange}
        />
      )}
    </Container>
  );
}

export default Todos;
