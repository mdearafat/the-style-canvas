"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import ColorPicker from "@/src/components/workspace/ColorPicker";
import LiveExamples from "@/src/components/workspace/LiveExamples";
import TabSection from "@/src/components/workspace/TabSection";
import Typography from "@/src/components/workspace/Typography";
import { generateColorShades, getRandomColor } from "@/src/utils/colorUtils";

export default function WorkspacePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("colors");

  // Primary color state
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [primaryShades, setPrimaryShades] = useState(() =>
    generateColorShades("#000000")
  );

  // Secondary color state
  const [showSecondary, setShowSecondary] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState(null);
  const [secondaryShades, setSecondaryShades] = useState([]);

  // Typography state (keeping for future implementation)
  const [typographySettings, setTypographySettings] = useState({
    baseSize: 16,
    scale: "1.200",
    fontFamily: "Inter",
    textStyles: {},
  });

  // Generate initial random color and load saved preferences
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        setIsLoading(true);
        const initialColor = getRandomColor();
        setPrimaryColor(initialColor);
        setPrimaryShades(generateColorShades(initialColor));

        // Load user preferences if logged in (can be implemented later)
        if (user) {
          // Load saved preferences from Supabase
        }
      } catch (err) {
        setError("Failed to initialize workspace");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialState();
  }, [user]);

  const handlePrimaryChange = useCallback((color, shades) => {
    try {
      setPrimaryColor(color);
      if (shades) {
        setPrimaryShades(shades);
      } else {
        setPrimaryShades(generateColorShades(color));
      }
    } catch (err) {
      console.error("Error updating primary color:", err);
      setError("Failed to update primary color");
    }
  }, []);

  const handleSecondaryChange = useCallback((color, shades) => {
    try {
      setSecondaryColor(color);
      if (shades) {
        setSecondaryShades(shades);
      } else if (color) {
        setSecondaryShades(generateColorShades(color));
      } else {
        setSecondaryShades([]);
      }
    } catch (err) {
      console.error("Error updating secondary color:", err);
      setError("Failed to update secondary color");
    }
  }, []);

  const handleAddSecondary = useCallback((show) => {
    try {
      setShowSecondary(show);
      if (show) {
        const initialColor = getRandomColor();
        setSecondaryColor(initialColor);
        setSecondaryShades(generateColorShades(initialColor));
      }
    } catch (err) {
      console.error("Error adding secondary color:", err);
      setError("Failed to add secondary color");
    }
  }, []);

  const handleRemoveSecondary = useCallback(() => {
    setShowSecondary(false);
    setSecondaryColor(null);
    setSecondaryShades([]);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "colors" ? (
        <>
          <ColorPicker
            primaryColor={primaryColor}
            primaryShades={primaryShades}
            onPrimaryChange={handlePrimaryChange}
            showSecondary={showSecondary}
            secondaryColor={secondaryColor}
            secondaryShades={secondaryShades}
            onSecondaryChange={handleSecondaryChange}
            onAddSecondary={handleAddSecondary}
            onRemoveSecondary={handleRemoveSecondary}
          />
          <LiveExamples
            colorShades={primaryShades}
            secondaryShades={showSecondary ? secondaryShades : null}
          />
        </>
      ) : (
        <Typography
          settings={typographySettings}
          setSettings={setTypographySettings}
        />
      )}
    </main>
  );
}
