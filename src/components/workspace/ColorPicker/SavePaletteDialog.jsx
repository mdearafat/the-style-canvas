import { useState } from "react";

export default function SavePaletteDialog({ onSave, onClose }) {
  const [paletteName, setPaletteName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(paletteName);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="relative bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Save Palette</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="paletteName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter palette name
            </label>
            <input
              type="text"
              id="paletteName"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="My awesome palette"
              required
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm -z-10 transition-opacity"
        onClick={onClose}
      />
    </div>
  );
}
