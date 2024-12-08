"use client";

import ColorSection from "./ColorSection";
import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import ProFeatureModal from "@/src/components/common/ProFeatureModal";

export default function ColorPicker({
  primaryColor,
  primaryShades,
  onPrimaryChange,
  showSecondary,
  secondaryColor,
  secondaryShades,
  onSecondaryChange,
  onAddSecondary,
  onRemoveSecondary,
}) {
  const { isProUser } = useAuth();
  const [showProModal, setShowProModal] = useState(false);

  const handleAddSecondary = () => {
    if (!isProUser) {
      setShowProModal(true);
      return;
    }
    onAddSecondary(true);
  };

  const handleRemoveSecondary = () => {
    if (onRemoveSecondary) {
      onRemoveSecondary();
    }
    onSecondaryChange(null, []);
    onAddSecondary(false);
  };

  return (
    <section>
      <div className="container max-w-screen-xl mx-auto py-8 px-4">
        <ColorSection
          selectedColor={primaryColor}
          colorShades={primaryShades}
          onColorChange={onPrimaryChange}
        />

        {showSecondary ? (
          <>
            <div className="mt-8 mb-4 flex justify-center">
              <button
                onClick={handleRemoveSecondary}
                className="text-gray-600 hover:text-gray-700 cursor-pointer flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove secondary color
              </button>
            </div>
            <ColorSection
              selectedColor={secondaryColor}
              colorShades={secondaryShades}
              onColorChange={onSecondaryChange}
              isSecondary={true}
            />
          </>
        ) : (
          <div className="mt-8 text-center">
            <button
              onClick={handleAddSecondary}
              className="text-primary-600 hover:text-primary-700 cursor-pointer flex items-center gap-2 justify-center mx-auto"
              title={
                isProUser
                  ? "Add secondary color"
                  : "Pro feature: Add secondary color"
              }
            >
              + Add a secondary color
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
          </div>
        )}

        <ProFeatureModal
          isOpen={showProModal}
          onClose={() => setShowProModal(false)}
          featureName="Secondary Color"
        />
      </div>
    </section>
  );
}
