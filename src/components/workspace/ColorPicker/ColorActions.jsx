"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import ProFeatureModal from "@/src/components/common/ProFeatureModal";

export default function ColorActions({
  onRandomColor,
  onExport,
  onSave,
  isEditMode,
  onToggleEdit,
}) {
  const { user, isProUser } = useAuth();
  const [showProModal, setShowProModal] = useState(false);
  const [proFeature, setProFeature] = useState("");

  const handleProFeature = (feature, action) => {
    if (isProUser) {
      action();
    } else {
      setProFeature(feature);
      setShowProModal(true);
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={onRandomColor}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
        title="Generate random color"
      >
        Random
      </button>
      <button
        onClick={onExport}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
        title="Export colors"
      >
        Export
      </button>
      <button
        onClick={() => handleProFeature("Edit Colors", onToggleEdit)}
        className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
          isEditMode
            ? "bg-primary-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        title={
          isProUser
            ? isEditMode
              ? "Finish editing shades"
              : "Edit individual shades"
            : "Pro feature: Edit individual shades"
        }
      >
        {isEditMode ? "Done" : "Edit"}
        {!isProUser && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
      </button>
      <button
        onClick={() => handleProFeature("Save Palette", onSave)}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm flex items-center gap-2"
        title={
          isProUser ? "Save color palette" : "Pro feature: Save color palette"
        }
      >
        Save
        {!isProUser && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
      </button>

      <ProFeatureModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName={proFeature}
      />
    </div>
  );
}
