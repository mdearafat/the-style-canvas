"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const SuccessNotification = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md animate-slide-in">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default function SaveTypographyDialog({ onClose, settings }) {
  const [styleName, setStyleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/workspace");
    }
  }, [user, loading, router]);

  const processTextStyles = (textStyles) => {
    const scaleRatio = parseFloat(settings.scale);
    const baseSize = parseFloat(settings.baseSize);
    const processedStyles = {};

    // Calculate font sizes using the exact formula
    const fontSizes = {
      h1: (baseSize * Math.pow(scaleRatio, 6)).toFixed(2),
      h2: (baseSize * Math.pow(scaleRatio, 5)).toFixed(2),
      h3: (baseSize * Math.pow(scaleRatio, 4)).toFixed(2),
      h4: (baseSize * Math.pow(scaleRatio, 3)).toFixed(2),
      h5: (baseSize * Math.pow(scaleRatio, 2)).toFixed(2),
      h6: (baseSize * scaleRatio).toFixed(2),
      p: baseSize.toFixed(2),
      small: (baseSize / scaleRatio).toFixed(2),
    };

    Object.entries(fontSizes).forEach(([tag, fontSize]) => {
      const parsedFontSize = parseFloat(fontSize);
      const existingStyle = textStyles?.[tag] || {};
      const lineHeight = existingStyle.lineHeight || {
        value: 1.2 * parsedFontSize,
        unit: "px",
      };
      const letterSpacing = existingStyle.letterSpacing || {
        value: 0,
        unit: "px",
      };

      // Convert any non-px values to px
      const lineHeightPx =
        lineHeight.unit === "px"
          ? lineHeight.value
          : lineHeight.unit === "em"
          ? lineHeight.value * parsedFontSize
          : lineHeight.value * 16;

      const letterSpacingPx =
        letterSpacing.unit === "px"
          ? letterSpacing.value
          : letterSpacing.unit === "em"
          ? letterSpacing.value * parsedFontSize
          : letterSpacing.value * 16;

      processedStyles[tag] = {
        fontSize: parsedFontSize,
        lineHeight: Math.round(lineHeightPx * 100) / 100,
        letterSpacing: Math.round(letterSpacingPx * 100) / 100,
      };
    });

    return processedStyles;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!styleName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const processedTextStyles = processTextStyles(settings.textStyles);

      const { error } = await supabase.from("typography_settings").insert([
        {
          name: styleName,
          settings: {
            fontFamily: settings.fontFamily,
            baseSize: settings.baseSize,
            scale: settings.scale,
            textStyles: processedTextStyles,
          },
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving typography:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Save Typography Style</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Style Name
              </label>
              <input
                type="text"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2.5"
                placeholder="e.g., Modern Clean, Classic Serif"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessNotification
        isOpen={showSuccess}
        message={`Typography style "${styleName}" saved successfully!`}
      />
    </>
  );
}
