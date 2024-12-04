import { useState } from "react";

export default function ColorActions({
  onRandomColor,
  onExport,
  onSave,
  isEditMode,
  onToggleEdit,
}) {
  // Temporarily disabled for development
  // const [showProModal, setShowProModal] = useState(false);
  const [editText, setEditText] = useState("Edit");

  const handleProFeatureClick = (e) => {
    e.preventDefault();
    // Temporarily call the actual functions instead of showing modal
    const buttonText = e.currentTarget.textContent.trim();
    if (buttonText === "Edit" || buttonText === "Done") {
      onToggleEdit();
      setEditText(buttonText === "Edit" ? "Done" : "Edit");
    } else if (buttonText === "Save") {
      onSave();
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-6 mb-8">
        <button
          onClick={onRandomColor}
          className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
          disabled={isEditMode}
        >
          Random
        </button>
        <button
          onClick={onExport}
          className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
          disabled={isEditMode}
        >
          Export
        </button>
        <button
          onClick={handleProFeatureClick}
          className="group relative bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300 flex items-center gap-2"
        >
          {editText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleProFeatureClick}
          className="group relative bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300 flex items-center gap-2"
        >
          Save
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Commented out Pro Modal for development
      {showProModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Pro Feature
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This feature is only available in the Pro version. Upgrade to
                access advanced color management tools.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add upgrade logic here
                    setShowProModal(false);
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 -z-10"
            onClick={() => setShowProModal(false)}
          />
        </div>
      )}
      */}
    </>
  );
}
