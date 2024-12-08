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

export default function SavePaletteDialog({ onClose, colors }) {
  const [paletteName, setPaletteName] = useState("");
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!paletteName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("color_palettes").insert([
        {
          name: paletteName,
          colors: colors,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      // Show success notification
      setShowSuccess(true);

      // Hide notification and close dialog after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving palette:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Save Color Palette</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Palette Name
              </label>
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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

      {/* Success Notification */}
      <SuccessNotification
        isOpen={showSuccess}
        message={`Palette "${paletteName}" saved successfully!`}
      />
    </>
  );
}
