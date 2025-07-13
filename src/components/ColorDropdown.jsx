import { useState, useRef, useEffect } from "react";

export const colorOptions = [
  { name: "Red", value: "red", hex: "#ef4444" },
  { name: "Orange", value: "orange", hex: "#f97316" },
  { name: "Yellow", value: "yellow", hex: "#eab308" },
  { name: "Green", value: "green", hex: "#22c55e" },
  { name: "Blue", value: "blue", hex: "#3b82f6" },
  { name: "Black", value: "black", hex: "#171717" },
];

function ColorDropdown({ selectedColor, onColorSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const colors = colorOptions;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the selected color name to display
  const getSelectedColorName = () => {
    const color = colors.find((c) => c.value === selectedColor);
    return color ? color.name : "Select Color";
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Collection Color
      </label>
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <div
              className="w-5 h-5 rounded-full mr-3"
              style={{
                backgroundColor:
                  colors.find((c) => c.value === selectedColor)?.hex ||
                  selectedColor,
              }}
            />
            <span>{getSelectedColorName()}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            <div className="grid grid-cols-3 gap-2 p-3">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className={`flex flex-col items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                    selectedColor === color.value
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => {
                    onColorSelect(color.value);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full mb-1"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-gray-700">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorDropdown;
