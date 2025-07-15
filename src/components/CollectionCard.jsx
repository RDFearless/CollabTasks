import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentCollection } from "../store/collectionSlice";

function CollectionCard({ collection }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Readable date format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = () => {
    // Navigate to todos page with collection ID as parameter
    navigate(`/todos/${collection._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="rounded-lg shadow-md overflow-hidden h-44 flex flex-col relative"
        style={{
          backgroundColor: collection.color,
          borderLeft: `5px solid ${collection.color}`,
          opacity: 0.9,
          boxShadow: `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)`,
        }}
      >
        <div
          className="p-4 flex-1 flex flex-col relative z-10"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3
              className="font-semibold text-lg truncate"
              style={{
                color: ["white", "yellow", "lime", "pink", "orange"].includes(
                  collection.color
                )
                  ? "#333333"
                  : "white",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {collection.name}
            </h3>
            {collection.isPrivate && (
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                Private
              </span>
            )}
          </div>

          <p
            className="text-sm line-clamp-2 flex-grow"
            style={{
              color: ["white", "yellow", "lime", "pink", "orange"].includes(
                collection.color
              )
                ? "#333333"
                : "white",
              fontWeight: "medium",
              opacity: 0.9,
            }}
          >
            {collection.description || "No description"}
          </p>

          <div
            className="mt-auto pt-2 flex justify-between items-center text-xs border-t"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: ["white", "yellow", "lime", "pink", "orange"].includes(
                collection.color
              )
                ? "#333333"
                : "white",
              opacity: 0.8,
            }}
          >
            <span>Created: {formatDate(collection.createdAt)}</span>
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Open
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
