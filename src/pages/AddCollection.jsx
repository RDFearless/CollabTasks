import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, CollectionForm, ColorDropdown } from "../components";
import { colorOptions } from "../components/ColorDropdown";
import collectionService from "../api/collection";
import { addCollection } from "../store/collectionSlice";
import { toast } from "react-toastify";

function AddCollection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("blue"); // Default blue color

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    // Merge form data with the selected color
    const collectionData = {
      ...formData,
      color: selectedColor, // Already lowercase from ColorDropdown component
    };

    setLoading(true);
    setError(null);

    try {
      const response = await collectionService.createCollection(collectionData);

      // Update Redux store
      dispatch(addCollection(response.data));

      // Show success message
      toast.success("Collection created successfully!");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to create collection");
      toast.error(error.message || "Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-800 text-white p-6">
              <h1 className="text-2xl font-bold">Create New Collection</h1>
              <p className="text-gray-300 mt-1">
                Create a new collection to organize your tasks
              </p>
            </div>

            {/* Form and Color Selection */}
            <div className="p-6">
              {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {/* Collection Form - Left */}
                <div className="w-full md:w-2/3">
                  <CollectionForm onSubmit={handleSubmit} loading={loading} />
                </div>

                {/* Color Dropdown - Right (hidden on mobile) */}
                <div className="w-full md:w-1/3 hidden md:block">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Choose Color
                    </h3>
                    <ColorDropdown
                      selectedColor={selectedColor}
                      onColorSelect={setSelectedColor}
                    />

                    {/* Preview */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </h4>
                      <div
                        className="rounded-lg h-32 w-full shadow-sm"
                        style={{
                          backgroundColor:
                            colorOptions.find((c) => c.value === selectedColor)
                              ?.hex || selectedColor,
                          opacity: 0.8,
                          borderLeft: `5px solid ${
                            colorOptions.find((c) => c.value === selectedColor)
                              ?.hex || selectedColor
                          }`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AddCollection;
