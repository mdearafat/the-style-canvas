"use client";

import ColorSection from "./ColorSection";

export default function ColorPicker({
  primaryColor,
  primaryShades,
  onPrimaryChange,
  showSecondary,
  secondaryColor,
  secondaryShades,
  onSecondaryChange,
  onAddSecondary,
}) {
  return (
    <section>
      <div className="container max-w-screen-xl mx-auto py-8 px-4">
        <ColorSection
          selectedColor={primaryColor}
          colorShades={primaryShades}
          onColorChange={onPrimaryChange}
        />

        {!showSecondary && (
          <div className="mt-8 text-center">
            <button
              onClick={onAddSecondary}
              className="text-primary-600 hover:text-primary-700 cursor-pointer flex items-center gap-2 justify-center mx-auto"
            >
              + Add a secondary color
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
        )}

        {showSecondary && (
          <ColorSection
            selectedColor={secondaryColor}
            colorShades={secondaryShades}
            onColorChange={onSecondaryChange}
            isSecondary
          />
        )}
      </div>
    </section>
  );
}
