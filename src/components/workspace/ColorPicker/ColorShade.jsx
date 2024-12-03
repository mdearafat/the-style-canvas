import Toast from "@/components/common/Toast";
import { useState } from "react";

export default function ColorShade({
  shade,
  hex,
  originalHex,
  isSelected,
  onClick,
  isEditMode,
  onColorChange,
}) {
  const [showToast, setShowToast] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClick = async () => {
    if (isSelected) {
      onClick();
      return;
    }

    if (!isEditMode) {
      try {
        await navigator.clipboard.writeText(hex);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (err) {
        console.error("Failed to copy color:", err);
      }
    }
  };

  const handleColorChange = (e) => {
    onColorChange(shade, e.target.value);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    onColorChange(shade, originalHex);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`flex flex-col items-center border p-4 rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:scale-105 relative ${
          isSelected
            ? "border-2 border-blue-500 shadow-lg"
            : "border border-gray-200"
        }`}
      >
        {isEditMode && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(true);
              }}
              className="w-6 h-6 bg-white rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            {hex !== originalHex && (
              <button
                onClick={handleReset}
                className="w-6 h-6 bg-white rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div
          className="w-16 h-16 rounded-full border border-gray-200"
          style={{ backgroundColor: hex }}
        />
        <p className="text-sm text-gray-800">{shade}</p>
        <p className="text-sm text-gray-600">{hex}</p>
      </div>

      {showColorPicker && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowColorPicker(false)}
                className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm"
              >
                Done
              </button>
            </div>
            <p className="text-center text-gray-600 mb-2">
              Click to choose color
            </p>
            <input
              type="color"
              value={hex}
              onChange={handleColorChange}
              className="w-48 h-48"
            />
          </div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 -z-10"
            onClick={() => setShowColorPicker(false)}
          ></div>
        </div>
      )}

      <Toast
        message={`Color ${hex} copied!`}
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
