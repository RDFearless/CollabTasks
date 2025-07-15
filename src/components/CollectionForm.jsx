import { useState } from "react";
import { Button, Input } from "./index.js";
import ColorDropdown from "./ColorDropdown";
function CollectionForm({ onSubmit, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("blue"); // Default blue color

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, color });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="text"
          id="name"
          label="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter collection name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
        />
      </div>

      <div>
        <label
          htmlFor="collectionDescription"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter collection description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-32 inset-shadow"
          style={{ boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)" }}
        />
      </div>

      <div className="md:hidden">
        <ColorDropdown selectedColor={color} onColorSelect={setColor} />
      </div>

      <Button
        type="submit"
        disabled={loading || !name.trim()}
        className="w-full"
      >
        {loading ? "Creating..." : "Create Collection"}
      </Button>
    </form>
  );
}

export default CollectionForm;
