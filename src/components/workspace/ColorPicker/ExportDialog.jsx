import { useState } from "react";

export default function ExportDialog({ colors, onClose }) {
  const [colorName, setColorName] = useState("primary");
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const getTailwindConfig = () => {
    const indent = "  ";
    return `theme: {
  extend: {
    colors: {
      ${colorName}: {
${Object.entries(colors)
  .map(([shade, hex]) => `        ${shade}: '${hex}'`)
  .join(",\n")}
      }
    }
  }
}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTailwindConfig());
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Export Colors</h2>
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Name
          </label>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter color name (e.g., primary)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tailwind Config
          </label>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
            <code>{getTailwindConfig()}</code>
          </pre>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>

      {showCopiedToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          Copied to clipboard!
        </div>
      )}

      <div
        className="fixed inset-0 bg-black bg-opacity-50 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
